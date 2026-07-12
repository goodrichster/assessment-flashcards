#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$PROJECT_DIR/server"
WEB_PORT="${1:-8000}"
TUTOR_PORT="${TUTOR_PORT:-8787}"
OLLAMA_HOST_URL="${OLLAMA_HOST_URL:-http://localhost:11434}"
OLLAMA_MODEL="${OLLAMA_MODEL:-llama3.2:3b}"
TUTOR_PID=""
OLLAMA_PID=""

cleanup() {
  if [[ -n "$TUTOR_PID" ]] && kill -0 "$TUTOR_PID" 2>/dev/null; then
    echo
    echo "Stopping Assessment Tutor API..."
    kill "$TUTOR_PID" 2>/dev/null || true
    wait "$TUTOR_PID" 2>/dev/null || true
  fi

  if [[ -n "$OLLAMA_PID" ]] && kill -0 "$OLLAMA_PID" 2>/dev/null; then
    echo "Stopping Ollama started by this launcher..."
    kill "$OLLAMA_PID" 2>/dev/null || true
    wait "$OLLAMA_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

for command_name in python3 node npm; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command not found: $command_name" >&2
    exit 1
  fi
done

if [[ ! -f "$SERVER_DIR/package.json" ]]; then
  echo "Tutor server package not found at $SERVER_DIR/package.json" >&2
  exit 1
fi

if [[ ! -d "$SERVER_DIR/node_modules" ]]; then
  echo "Installing Assessment Tutor dependencies..."
  npm --prefix "$SERVER_DIR" install
fi

if command -v curl >/dev/null 2>&1 && ! curl -fsS "$OLLAMA_HOST_URL/api/tags" >/dev/null 2>&1; then
  if command -v ollama >/dev/null 2>&1; then
    echo "Starting Ollama at $OLLAMA_HOST_URL..."
    ollama serve >/tmp/assessment-flashcards-ollama.log 2>&1 &
    OLLAMA_PID=$!

    ollama_ready=false
    for _ in {1..20}; do
      if curl -fsS "$OLLAMA_HOST_URL/api/tags" >/dev/null 2>&1; then
        ollama_ready=true
        break
      fi
      sleep 0.25
    done

    if [[ "$ollama_ready" != true ]]; then
      echo "Ollama failed to start. See /tmp/assessment-flashcards-ollama.log" >&2
      exit 1
    fi
  else
    echo "Ollama is required for the Assessment Tutor but is not installed." >&2
    echo "Install it from https://ollama.com, then rerun this script." >&2
    exit 1
  fi
fi

if command -v curl >/dev/null 2>&1; then
  installed_models="$(curl -fsS "$OLLAMA_HOST_URL/api/tags" 2>/dev/null || true)"
  if [[ "$installed_models" != *"\"$OLLAMA_MODEL\""* ]]; then
    echo "Warning: Ollama model '$OLLAMA_MODEL' is not installed."
    echo "Run: ollama pull $OLLAMA_MODEL"
    echo "The flashcards will work, but tutor requests will fail until the model is installed."
  fi
fi

echo "Starting Assessment Tutor API at http://localhost:${TUTOR_PORT}"
PORT="$TUTOR_PORT" OLLAMA_MODEL="$OLLAMA_MODEL" npm --prefix "$SERVER_DIR" start &
TUTOR_PID=$!

sleep 0.5
if ! kill -0 "$TUTOR_PID" 2>/dev/null; then
  echo "Assessment Tutor API failed to start." >&2
  wait "$TUTOR_PID" || true
  exit 1
fi

cd "$PROJECT_DIR"

echo "Starting Assessment Flashcards at http://localhost:${WEB_PORT}"
echo "Press Ctrl+C to stop the flashcards, tutor API, and launcher-started Ollama."

python3 -m http.server "$WEB_PORT"
