#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8000}"

cd "$PROJECT_DIR"

echo "Starting Assessment Flashcards at http://localhost:${PORT}"
echo "Press Ctrl+C to stop the server."

python3 -m http.server "$PORT"
