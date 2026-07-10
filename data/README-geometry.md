# H.S. Geometry Diagnostic — Data & Outputs

## Exam Type
- **H.S. Geometry Assessment**
- Grade Level: High School (Geometry)
- Purpose: Diagnostic + Progress Monitoring
- Scope: First 5 months of a Geometry course

## Files

| File | Description |
|------|-------------|
| `geometry-knowledge-map.json` | Concept dependency map (prerequisite order, key theorems, core skills, example problems). |
| `geometry-cards.js` | 25 diagnostic questions + full flashcard schema. Exposes `geometryCards`, `geometryDiagnosticSet`, `geometryFlashcardDataset`. |
| `geometry-teacher-solution-key.md` | Teacher solution key: question ID, topic, concept, correct answer, difficulty, solution summary. |

## Outputs (from app)

1. **Flashcard dataset** — Use **Export Report (JSON)** after viewing the report; the 25-question set is in `geometryFlashcardDataset` (in code) or export the full deck from the Geometry exam view.
2. **25-question diagnostic set** — Same as above; question IDs HG-01 through HG-25 in `geometryDiagnosticSet` and full objects in `geometryFlashcardDataset`.
3. **Teacher solution key** — `geometry-teacher-solution-key.md` in this folder.
4. **Student diagnostic report** — Click **View Diagnostic Report** in the app (when exam = H.S. Geometry Assessment), then **Export Report (JSON)** or **Export Report (Markdown)**.
5. **Personalized study plan** — Generated in the same report (table + export).

## Topic distribution (25 questions)

| Topic               | Count |
|--------------------|-------|
| Definitions        | 3     |
| Angle Relationships | 5     |
| Parallel Lines     | 4     |
| Triangles          | 4     |
| Congruence         | 4     |
| Similarity         | 3     |
| Coordinate Geometry | 2     |

## Response recording

Responses are stored in `localStorage` under `geometryDiagnosticResponses`. Schema: StudentID, QuestionID, Response, Correct, TimeToAnswer, ConfidenceRating, ConceptTag, Timestamp.

## Adaptive logic

- Correct → next suggested by `followUpIfCorrect` or next in diagnostic order.
- Incorrect → next suggested by `followUpIfIncorrect` or next in order.
- Two misses in a topic → topic flagged as weak in report (Needs Work / Major Gaps).

Mastery bands: **Mastered** (>80%), **Developing** (60–80%), **Needs Work** (40–60%), **Major Gaps** (<40%).
