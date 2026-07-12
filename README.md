# Assessment Flashcards

A single-page app for drilling ACT/SAT flashcards across Math, Reading, Writing, English, and Science.

## Overview

The frontend uses plain HTML, CSS, and JavaScript. An optional local Node/Express Assessment Tutor API connects the app to Ollama.

The app supports:

- Flashcard questions, answers, explanations, and diagrams
- Filters for exam, subject, difficulty, card type, and question type
- Randomized SAT coefficients and constants within each problem's intended magnitude
- Session self-grading and missed-question review
- Persistent browser tracking, diagnostic reports, and exports
- A local AI tutor for hints, step-by-step help, and work checking

## Project Structure

- `index.html`: app markup and controls
- `styles.css`: responsive layout and visual design
- `app.js`: filtering, navigation, tracking, randomized variants, and rendering
- `data/`: SAT/ACT and geometry card data
- `geometry-assessment.js`: diagnostic scoring, reporting, and exports
- `server/`: local Assessment Tutor API
- `run-project.sh`: starts the tutor API and static web server together

## Run Locally

From the project root:

```bash
./run-project.sh
```

The flashcards run at `http://localhost:8000`, and the tutor API runs at `http://localhost:8787`.

To use another web port, pass it as the first argument:

```bash
./run-project.sh 8080
```

The launcher installs the tutor server dependencies if needed. Press `Ctrl+C` to stop both servers.

## Assessment Tutor

The tutor server is started by this command, which is now included in `run-project.sh`:

```bash
npm --prefix server start
```

Tutor responses require Ollama and the configured model. In another terminal, run:

```bash
ollama serve
ollama pull llama3.2:3b
```

The Ollama endpoint and model can be changed with `OLLAMA_URL` and `OLLAMA_MODEL`. The tutor API port can be changed with `TUTOR_PORT`.

## Current Limitations

- Progress is stored in the current browser's local storage.
- AI tutor responses require a locally running Ollama model.
- Illustrated source data remains page-based rather than one object per question.
