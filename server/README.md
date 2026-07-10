# Assessment Tutor (Local)

## 1) Install and run Ollama

```bash
ollama serve
ollama pull qwen3:8b
```

## 2) Install server dependencies

```bash
cd server
npm install
```

## 3) Start tutor API

```bash
npm start
```

The frontend calls:

- `POST http://localhost:8787/api/tutor/chat`

Optional environment variables:

- `PORT` (default `8787`)
- `OLLAMA_MODEL` (legacy fallback default `qwen3:8b`)
- `OLLAMA_FAST_MODEL` (default `qwen3:8b`)
- `OLLAMA_DEEP_MODEL` (default `qwen3:8b`)
- `OLLAMA_URL` (default `http://localhost:11434/api/chat`)
