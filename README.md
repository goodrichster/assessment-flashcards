# Assessment Flashcards

A lightweight, single-page web app for drilling ACT/SAT flashcards across Math, Reading, Writing, and Science.

## Overview

This project is a static front-end prototype built with plain HTML, CSS, and JavaScript.

- No backend
- No bundler or framework
- No external runtime dependencies

The app supports:

- Flashcard flip interaction
- Navigation (`Previous`, `Next`, `Shuffle`)
- Filtering by exam, subject, difficulty, card type, and question type
- Session self-grading (`I Got It Right`, `I Missed This`)
- Missed-only review mode
- Session tracking stats (attempts, accuracy, unique seen, missed queue)

## Project Structure

- `index.html`: App markup and control layout
- `styles.css`: Visual design, responsive behavior, flip card styling
- `app.js`: Card dataset + all filtering, navigation, tracking, and rendering logic
- `ARCHITECTURE.md`: Detailed architecture and data flow notes

## Run Locally

Because this is a static app, you can open `index.html` directly or run a local server.

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Local HTTP server

From the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Current Limitations

- Session state is in-memory only (resets on refresh)
- Card bank is embedded directly in `app.js`
- No automated tests yet
- No CI/CD configuration yet

## Next Milestones

- Move card content into external JSON
- Add local persistence (e.g., `localStorage`) for progress
- Split logic into modules and add test coverage
- Add deployment workflow (GitHub Pages or similar)
