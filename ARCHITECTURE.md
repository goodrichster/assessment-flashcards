# Architecture

## System Type

Single-page static web application.

- Render layer: Vanilla HTML/CSS
- Interaction/state layer: Vanilla JavaScript
- Data source: In-memory array in `app.js`

No server or API integration is currently used.

## High-Level Components

1. **Data Store (`cards`)**
   - Array of card objects in `app.js`
   - Fields: `id`, `exam`, `subject`, `type`, `questionType`, `difficulty`, `focus`, `front`, `back`

2. **UI Controls**
   - Filter dropdowns: exam, type, subject, difficulty, question type
   - Action buttons: prev, next, shuffle
   - Self-report buttons: correct, incorrect
   - Tracking buttons: review missed toggle, reset tracking

3. **Render Surface**
   - Metadata line (`cardMeta`)
   - Attribute line (`cardAttributes`)
   - Front/back card faces (`cardFront`, `cardBack`)

4. **Session Tracking Model**
   - Scalars: `attempts`, `correctAttempts`, `incorrectAttempts`, `index`, `reviewMissedOnly`
   - Sets: `seenIds`, `missedIds`
   - Map: `cardResults` (per-card status)

## Runtime Flow

1. App bootstraps by binding DOM elements and initializing state.
2. `updateSessionStats()`, `refreshQuestionTypeOptions()`, and `buildFilteredCards()` run on load.
3. Filter changes call `applyFilters()`.
4. `applyFilters()` resets index, rebuilds question-type options, rebuilds filtered card list, and triggers render.
5. User actions (next/prev/shuffle/grade) mutate in-memory state and call `renderCard()` or `applyFilters()`.

## Filtering Pipeline

1. `passesBaseFilters(card)` evaluates:
   - exam compatibility (including `Both` for ACT/SAT selections)
   - type
   - subject
   - difficulty
   - missed-only mode
2. `refreshQuestionTypeOptions()` computes available question types from base-filtered cards.
3. `buildFilteredCards()` applies question-type filter on top of base filters.

This keeps question-type options context-aware with current base selections.

## Key Behaviors

- **Card Flip**: toggles `flipped` class on the card button.
- **Shuffle**: in-place Fisher-Yates on `filteredCards`.
- **Self-grading**:
  - correct: increments correct attempts, removes card from missed queue
  - incorrect: increments incorrect attempts, adds card to missed queue
- **Missed Review Mode**: limits visible cards to `missedIds` while still honoring other filters.
- **Reset Tracking**: clears all session counters and queues, disables missed-only mode.

## Error/Empty States

`renderCard()` handles:

- No cards match active filters
- Missed review enabled with no remaining missed cards

In both cases action buttons are disabled until filters produce results.

## Styling and Responsiveness

- Desktop-first layout with a responsive breakpoint at `700px`
- At small widths:
  - filters stack vertically
  - tracking controls stack
  - card min-height increases for readability

## Current Technical Constraints

- Dataset and logic are tightly coupled in one file (`app.js`)
- No persistence layer (refresh resets session)
- No automated tests or linting pipeline
- No build/deploy automation

## Recommended Evolution Path

1. Extract card data into `data/cards.json`.
2. Introduce storage adapter for persistent progress.
3. Split UI/state/data logic into modules.
4. Add unit tests for filtering and tracking behavior.
5. Add CI checks and static deployment workflow.
