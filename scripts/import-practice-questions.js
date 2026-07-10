#!/usr/bin/env node
/**
 * Import ACT math practice questions as one-card-per-question (pages 15-23).
 * - Parses individual questions from OCR text.
 * - Parses answer key from grading page.
 * - Copies page PNGs and creates diagram crops for diagram-heavy prompts.
 * - Generates concise solution strategy text for card backs.
 *
 * Run from project root: node scripts/import-practice-questions.js
 */

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const IMPORT_JSON = path.join(PROJECT_ROOT, "imports/act_illustrated/illustrated_questions.json");
const IMPORT_IMAGES_DIR = path.join(PROJECT_ROOT, "imports/act_illustrated/images");
const IMAGES_DIR = path.join(PROJECT_ROOT, "images");
const MATH_DIAGRAM_DIR = path.join(IMAGES_DIR, "math-practice");
const OUTPUT_JS = path.join(PROJECT_ROOT, "data/practice-cards.js");

const MATH_PAGE_RANGES = {
  15: [1, 7],
  16: [8, 15],
  17: [16, 22],
  18: [23, 30],
  19: [31, 33],
  20: [34, 39],
  21: [40, 46],
  22: [47, 53],
  23: [54, 60],
};
const EXCLUDED_QUESTION_NUMBERS = new Set([1, 2, 54]);
const NO_DIAGRAM_QUESTION_NUMBERS = new Set([13, 37, 41]);
const MANUAL_DIAGRAM_BY_QUESTION = {
  6: "images/math-practice/manual_q6_diagram.png",
  16: "images/math-practice/manual_q16_diagram.png",
  17: "images/math-practice/manual_q17_diagram.png",
  21: "images/math-practice/manual_q21_diagram.png",
  31: "images/math-practice/manual_q31_diagram.png",
  32: "images/math-practice/manual_q32_diagram.png",
  35: "images/math-practice/manual_q35_diagram.png",
  40: "images/math-practice/manual_q40_diagram.png",
  42: "images/math-practice/manual_q42_diagram.png",
  43: "images/math-practice/manual_q43_diagram.png",
  44: "images/math-practice/manual_q44_diagram.png",
};
const MANUAL_PROMPT_BY_QUESTION = {
  12: "If R = 10b² and b = 5, then R =",
  26: "If f(x) = x³ − 5 and f(k) = 3 then k =",
  39: "The microcurrent through the electrode in a delicate circuit is usually held constant at 3.6 × 10⁻⁸ amps. Because of a defect in another part of the circuit, the current was 1000 times smaller. What was the current, in amps, caused by this defect?",
  41: "In the standard (x, y) coordinate plane, when a ≠ 0 and b ≠ 0, the graph of f(x) = (2x + b)/(x + a) has a vertical asymptote at:",
  47: "If f(x) = 12 − x²/2 and f(2k) = 2k, what is one possible value for k?",
  57: "If 2^(2n) + 2^(2n) + 2^(2n) + 2^(2n) = 4^24, then n =",
};
const MANUAL_FRONT_BY_QUESTION = {
  23:
    "Question 23\n\nIf f(x) = x² + 4 and f(2k) = 36, then which of the following is one possible value of k?\n\nA. √2\nB. 2\nC. 4\nD. 2√2\nE. √14",
  33:
    "Question 33\n\nStudents in an 11th grade history class are randomly divided into three teams of five students for a history trivia contest. Each student takes a trivia test with 100 total points, and their scores are posted below. The team with the highest average score (rounded to the nearest whole number) wins the contest.\n\nWhich of the following is closest to the percent of individual trivia test scores that are at or above 80 points?\n\nA. 10%\nB. 33%\nC. 60%\nD. 67%\nE. 80%",
  38:
    "Question 38\n\nIn the xy-coordinate system, line k passes through points (-5m, 0) and (0, 2m). Which of the following is a possible equation of line k?\n\nA. (see image)\nB. (see image)\nC. (see image)\nD. (see image)\nE. (see image)",
  42:
    "Question 42\n\nIf g(x) = −1/2 f(x), for all values of x, which of the following is a true statement describing the graph of g in comparison with the graph of f, shown below?\n\nA. It is narrower and opens downward.\nB. It is narrower and opens upward.\nC. It is the same width but opens upward.\nD. It is wider and opens downward.\nE. It is wider and opens upward.",
  45:
    "Question 45\n\nIn the complex number system, what does i⁴⁵ equal?\n\nA. −1\nB. 0\nC. 2\nD. i\nE. −i",
  48:
    "Question 48\n\nThe equation y = x² is graphed in the standard (x, y) coordinate plane. In which of the following equations is the graph of the parabola shifted 4 units to the left and 2 units up?\n\nA. y = (x − 4)² + 2\nB. y = (x − 4)² − 2\nC. y = (x − 2)² + 4\nD. y = (x + 4)² + 2\nE. y = (x + 4)² − 2",
  49:
    "Question 49\n\nIf x⁴ = y¹⁶, then y = ?\n\nA. ⁴√x\nB. √x\nC. x²\nD. x⁴\nE. x¹²",
  50:
    "Question 50\n\nA square in the standard (x, y) coordinate plane has vertices at (1,0), (0,2), (2,3), and (3,1). Where do the diagonals of the square intersect?\n\nA. (see image)\nB. (see image)\nC. (see image)\nD. (see image)\nE. (see image)",
  59:
    "Question 59\n\nThe expression log₃(63) + log₃(5) − log₃(35) equals which of the following?\n\nA. 2\nB. 3\nC. 6\nD. log₃(33)\nE. log₃(56)",
  60:
    "Question 60\n\nWhich of the following complex numbers equals (2 − i√3)(√2 + i)?\n\nA. (2√2 + √3) + i(2 − √6)\nB. (2√3 − √2) + i(2 + √6)\nC. (2√2 + √6) + i(2 − √3)\nD. (2 + √2) + i(2√2 − √6)\nE. (2 − √3) + i(2√2 + √3)",
};
const MANUAL_EXPLANATION_BY_QUESTION = {
  59:
    "Use log rules: log₃(a) + log₃(b) = log₃(ab) and log₃(a) − log₃(b) = log₃(a/b). So log₃(63) + log₃(5) − log₃(35) = log₃((63·5)/35) = log₃(9) = 2.",
};

function asInt(value) {
  return Number.parseInt(value, 10);
}

function range(from, to) {
  const values = [];
  for (let n = from; n <= to; n += 1) values.push(n);
  return values;
}

function cleanPageText(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/GO TO NEXT PAGE\s*\d+/gi, "")
    .replace(/act\.magoosh\.com/gi, "")
    .replace(/\n?\s*\d+\s+\d+\s*$/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function findQuestionStart(pageText, questionNumber, fromIndex) {
  const patterns = [
    new RegExp(`(?:^|\\n)\\s*(${questionNumber})\\.\\s`, "g"),
    new RegExp(`(${questionNumber})\\.\\s{2,}`, "g"),
    new RegExp(`(${questionNumber})\\.\\s`, "g"),
  ];

  const starts = [];
  for (const token of patterns) {
    token.lastIndex = fromIndex;
    let match = token.exec(pageText);
    while (match) {
      const start = match.index + match[0].length - match[1].length - 2;
      if (start >= fromIndex) starts.push(start);
      match = token.exec(pageText);
    }
  }

  if (!starts.length) return -1;
  return Math.min(...starts);
}

function splitPromptAndOptions(questionChunk) {
  const text = questionChunk
    .replace(/\s+([A-J]\.)\s/g, "\n$1 ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const optionStart = text.search(/(?:^|\n)([A-J])\.\s+/);
  if (optionStart < 0) {
    return { prompt: text, options: {} };
  }

  const prompt = text.slice(0, optionStart).trim();
  const optionsText = text.slice(optionStart).trim();
  const options = {};

  const optionRegex = /(?:^|\n)([A-J])\.\s*([\s\S]*?)(?=(?:\n[A-J]\.\s)|$)/g;
  let match = optionRegex.exec(optionsText);
  while (match) {
    options[match[1]] = match[2].replace(/\s+/g, " ").trim();
    match = optionRegex.exec(optionsText);
  }

  return { prompt, options };
}

function parseMathQuestions(pageEntry) {
  const pageNum = asInt(pageEntry.page_number);
  const pageRange = MATH_PAGE_RANGES[pageNum];
  if (!pageRange) return [];

  const [qStart, qEnd] = pageRange;
  const expectedNumbers = range(qStart, qEnd);
  const pageText = cleanPageText(pageEntry.page_text || "");
  const results = [];

  let scanIndex = 0;
  const starts = new Map();

  for (const qNum of expectedNumbers) {
    const pos = findQuestionStart(pageText, qNum, scanIndex);
    if (pos < 0) continue;
    starts.set(qNum, pos);
    scanIndex = pos + 1;
  }

  for (let i = 0; i < expectedNumbers.length; i += 1) {
    const qNum = expectedNumbers[i];
    const start = starts.get(qNum);
    if (start === undefined) continue;

    let end = pageText.length;
    for (let j = i + 1; j < expectedNumbers.length; j += 1) {
      const nextStart = starts.get(expectedNumbers[j]);
      if (nextStart !== undefined) {
        end = nextStart;
        break;
      }
    }

    const chunk = pageText.slice(start, end).trim();
    const withoutNumber = chunk.replace(new RegExp(`^${qNum}\\.\\s*`), "").trim();
    const { prompt, options } = splitPromptAndOptions(withoutNumber);

    results.push({
      pageNumber: pageNum,
      questionNumber: qNum,
      prompt: prompt || withoutNumber,
      options,
      chunk: withoutNumber,
      startIndex: start,
      endIndex: end,
      pageTextLength: pageText.length,
    });
  }

  return results;
}

function parseMathAnswerKey(entries) {
  const answerPage = entries.find((entry) => asInt(entry.page_number) === 51);
  if (!answerPage) return new Map();

  const text = answerPage.page_text || "";
  const blocks = text.match(/1\.\s*[A-J][\s\S]*?60\.\s*[A-J]/g);
  if (!blocks || blocks.length < 2) return new Map();

  const mathBlock = blocks[1];
  const map = new Map();
  const itemRegex = /(\d{1,2})\.\s*([A-J])/g;
  let match = itemRegex.exec(mathBlock);
  while (match) {
    map.set(asInt(match[1]), match[2]);
    match = itemRegex.exec(mathBlock);
  }
  return map;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function clearGeneratedDiagramCrops() {
  ensureDir(MATH_DIAGRAM_DIR);
  const names = fs.readdirSync(MATH_DIAGRAM_DIR);
  for (const name of names) {
    if (!/^p\d+_q\d+_diagram\.png$/i.test(name)) continue;
    fs.unlinkSync(path.join(MATH_DIAGRAM_DIR, name));
  }
}

function copyMathPageImages() {
  ensureDir(IMAGES_DIR);
  const copied = [];

  for (const page of Object.keys(MATH_PAGE_RANGES)) {
    const filename = `page_${page}.png`;
    const src = path.join(IMPORT_IMAGES_DIR, filename);
    const dest = path.join(IMAGES_DIR, filename);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      copied.push(filename);
    }
  }

  return copied;
}

function hasDiagramSignal(question) {
  const text = `${question.prompt}\n${question.chunk}`.toLowerCase();
  return (
    /figure below|shown below|graph below|table below|histogram|coordinate plane|diagram|vertices|line k|circle|trapezoid|pyramid|ladder|not drawn to scale/.test(
      text
    ) || /xy-coordinate|x-y coordinate/.test(text)
  );
}

function getImageDimensions(imagePath) {
  const output = cp
    .execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", imagePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
    .toString();

  const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
  const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
  if (!widthMatch || !heightMatch) return null;

  return { width: asInt(widthMatch[1]), height: asInt(heightMatch[1]) };
}

function cropDiagramForQuestion(question, pageImagePath) {
  if (NO_DIAGRAM_QUESTION_NUMBERS.has(question.questionNumber)) return null;
  if (!fs.existsSync(pageImagePath) || !hasDiagramSignal(question)) return null;

  const dimensions = getImageDimensions(pageImagePath);
  if (!dimensions) return null;

  ensureDir(MATH_DIAGRAM_DIR);

  const { width, height } = dimensions;
  const startRatio = Math.max(0, question.startIndex / Math.max(question.pageTextLength, 1));
  const endRatio = Math.min(1, question.endIndex / Math.max(question.pageTextLength, 1));

  const x = Math.floor(width * 0.08);
  const cropWidth = Math.floor(width * 0.84);
  const y = Math.max(0, Math.floor(height * startRatio - height * 0.03));
  const cropHeight = Math.max(
    180,
    Math.min(height - y, Math.floor((endRatio - startRatio) * height + height * 0.18))
  );

  const outName = `p${question.pageNumber}_q${question.questionNumber}_diagram.png`;
  const outPath = path.join(MATH_DIAGRAM_DIR, outName);

  cp.execFileSync(
    "sips",
    [
      "-c",
      String(cropHeight),
      String(cropWidth),
      "--cropOffset",
      String(y),
      String(x),
      pageImagePath,
      "--out",
      outPath,
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  if (!fs.existsSync(outPath)) return null;
  return `images/math-practice/${outName}`;
}

function getManualDiagramPath(questionNumber) {
  const rel = MANUAL_DIAGRAM_BY_QUESTION[questionNumber];
  if (!rel) return null;
  const abs = path.join(PROJECT_ROOT, rel);
  return fs.existsSync(abs) ? rel : null;
}

function inferFocusTags(prompt) {
  const text = prompt.toLowerCase();
  const tags = ["practice test", "math"];

  if (/probab|without replacement/.test(text)) tags.push("probability");
  else if (/slope|line|coordinate/.test(text)) tags.push("coordinate geometry");
  else if (/triangle|circle|trapezoid|pyramid|angle|sin|cos|tan/.test(text)) tags.push("geometry");
  else if (/mean|average|histogram|table/.test(text)) tags.push("statistics");
  else if (/ratio|percent|discount/.test(text)) tags.push("ratio and percent");
  else if (/log|exponent|scientific notation/.test(text)) tags.push("exponents and logs");
  else if (/function|f\(x\)|g\(x\)/.test(text)) tags.push("functions");
  else tags.push("algebra");

  return tags;
}

function strategyForPrompt(prompt) {
  const text = prompt.toLowerCase();
  if (/probab|without replacement/.test(text)) {
    return "Count favorable outcomes over total outcomes, and for multi-step draws multiply conditional probabilities.";
  }
  if (/slope|line|coordinate/.test(text)) {
    return "Translate the geometric description into slope/intercept relationships first, then compute with coordinates.";
  }
  if (/triangle|circle|trapezoid|pyramid|angle|sin|cos|tan/.test(text)) {
    return "Sketch the figure, label known values, and apply the matching geometry or trig formula before simplifying.";
  }
  if (/mean|average|histogram|table/.test(text)) {
    return "Convert the chart/table into numerical totals, then use the definition of mean or weighted average directly.";
  }
  if (/ratio|percent|discount/.test(text)) {
    return "Set up a proportion or percent equation from the wording, then solve for the unknown quantity.";
  }
  if (/log|exponent|scientific notation/.test(text)) {
    return "Rewrite with exponent and log rules first to reduce the expression, then evaluate cleanly.";
  }
  if (/function|f\(x\)|g\(x\)/.test(text)) {
    return "Substitute carefully into the function definition and simplify in the correct operation order.";
  }
  return "Translate the words into an equation, isolate the unknown systematically, and eliminate impossible choices.";
}

function buildCard(question, answerKey, diagramPath) {
  const letter = answerKey.get(question.questionNumber) || null;
  const optionText = letter ? question.options[letter] || null : null;
  const strategy = strategyForPrompt(question.prompt);
  const promptText = MANUAL_PROMPT_BY_QUESTION[question.questionNumber] || question.prompt;
  const manualFront = MANUAL_FRONT_BY_QUESTION[question.questionNumber] || null;
  const manualExplanation = MANUAL_EXPLANATION_BY_QUESTION[question.questionNumber] || null;

  const card = {
    id: `math-p${question.pageNumber}-q${question.questionNumber}`,
    exam: "ACT",
    subject: "Math",
    type: "practice",
    questionType: "Math Practice Questions",
    difficulty: "medium",
    focus: inferFocusTags(question.prompt),
    source: `ACT Practice Test (Magoosh) | Page ${question.pageNumber}, Question ${question.questionNumber}`,
    front: manualFront || `Question ${question.questionNumber}\n\n${promptText}`,
  };

  if (diagramPath) {
    card.frontImage = diagramPath;
    card.frontImageAlt = `Diagram crop for ACT Math page ${question.pageNumber}, question ${question.questionNumber}.`;
    card.frontImageCaption = `Diagram extracted from page ${question.pageNumber}.`;
  }

  if (letter) {
    card.answer = optionText ? `${letter}. ${optionText}` : `${letter}`;
    card.explanation = manualExplanation || `Strategy: ${strategy}`;
    card.back = manualExplanation
      ? `Correct answer: ${letter}${optionText ? ` (${optionText})` : ""}. ${manualExplanation}`
      : `Correct answer: ${letter}${optionText ? ` (${optionText})` : ""}. ${strategy}`;
  } else {
    card.back = `No answer-key match found for question ${question.questionNumber}. ${strategy}`;
  }

  return card;
}

function main() {
  if (!fs.existsSync(IMPORT_JSON)) {
    console.error("Missing:", IMPORT_JSON);
    process.exit(1);
  }

  const raw = fs.readFileSync(IMPORT_JSON, "utf8");
  const entries = JSON.parse(raw);
  const answerKey = parseMathAnswerKey(entries);
  const copiedImages = copyMathPageImages();
  clearGeneratedDiagramCrops();

  const questions = entries
    .filter((entry) => asInt(entry.page_number) >= 15 && asInt(entry.page_number) <= 23)
    .sort((a, b) => asInt(a.page_number) - asInt(b.page_number))
    .flatMap(parseMathQuestions)
    .sort((a, b) => a.questionNumber - b.questionNumber);

  const cards = questions.map((question) => {
    const pageImage = path.join(IMAGES_DIR, `page_${question.pageNumber}.png`);
    const manualDiagramPath = getManualDiagramPath(question.questionNumber);
    const diagramPath = manualDiagramPath || cropDiagramForQuestion(question, pageImage);
    return buildCard(question, answerKey, diagramPath);
  }).filter((card) => {
    const match = card.id.match(/-q(\d+)$/);
    if (!match) return true;
    const qNum = asInt(match[1]);
    return !EXCLUDED_QUESTION_NUMBERS.has(qNum);
  });

  ensureDir(path.dirname(OUTPUT_JS));
  const jsContent =
    "// Auto-generated by scripts/import-practice-questions.js — Math Practice Questions (type: practice)\n" +
    "const practiceCards = " +
    JSON.stringify(cards, null, 2) +
    ";\n";

  fs.writeFileSync(OUTPUT_JS, jsContent, "utf8");

  console.log(`Copied ${copiedImages.length} page image(s) into images/.`);
  console.log(`Parsed ${questions.length} question(s) across pages 15-23.`);
  console.log(`Generated ${cards.length} flashcard(s) at ${path.relative(PROJECT_ROOT, OUTPUT_JS)}.`);
}

main();
