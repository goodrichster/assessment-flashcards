const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8787;
const FAST_MODEL = process.env.OLLAMA_FAST_MODEL || process.env.OLLAMA_MODEL || "qwen3:8b";
const DEEP_MODEL = process.env.OLLAMA_DEEP_MODEL || "qwen3:8b";
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/chat";

const SYSTEM_PROMPT = `You are Assessment Tutor, a concise math tutor for ACT/SAT-style multiple-choice questions.

Goals:
1) Teach the student how to solve the current question step by step.
2) Explicitly name formulas/concepts before applying them.
3) Keep explanations concise and accurate.
4) Adapt to student intent: hint, full walkthrough, or check-my-work.

Rules:
- Ground all reasoning in the provided question content and choices.
- If question text is ambiguous or image details are missing, state assumptions briefly.
- Never invent unseen diagram details.
- Speak directly to the student using second person ("you", "your").
- Never refer to the student in third person (avoid "the student", "they", "the user").
- Do not reveal internal reasoning, planning, or self-talk.
- Do not include prefatory phrases like "Okay", "let me think", "I recall", or commentary about what you are doing.
- Return only the tutor-facing response content.
- Prefer short numbered steps.
- Show substitutions and arithmetic/algebra simplifications clearly.
- Use consistent symbols from the question.
- End with:
  - Final answer (choice letter/value if available)
  - One common mistake
- If user asks for "hint only," give at most 1-2 hints and no final answer unless requested.
- If user asks to "check my work," evaluate their steps, point out the first mistake, then continue from there.

Output style:
- Friendly, direct, instructional.
- Voice: you are a live tutor speaking to one student.
- Use markdown-friendly plain text with short sections and numbered steps.
- For hint mode, provide only 1-2 actionable hints addressed to "you" and stop.
- For all math notation, use LaTeX consistently:
  - Inline math must use \\( ... \\)
  - Display equations must use \\[ ... \\]
  - Use LaTeX symbols/functions for fractions, exponents, roots, inequalities, trig, logs, and absolute value
- Keep prose concise around equations.
- Use short section labels in plain text:
  Concepts:
  Steps:
  Final Answer:
  Common Mistake:`;

app.use(
  cors({
    origin: "*",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "1mb" }));

function buildUserPrompt(payload) {
  const conversation = Array.isArray(payload.conversation)
    ? payload.conversation.slice(-4).map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n")
    : "";

  return `Mode: ${payload.mode || "walkthrough"}
Card ID: ${payload.cardId || "unknown"}

Question Front:
${payload.question?.front || ""}

Choices:
${payload.question?.choices || ""}

Known Answer (for tutor grounding only):
${payload.question?.answer || ""}

Existing Explanation:
${payload.question?.explanation || ""}

Conversation So Far:
${conversation}

Student Message:
${payload.userMessage || ""}`;
}

function resolveModel(tier) {
  if (tier === "deep") return DEEP_MODEL;
  return FAST_MODEL;
}

function extractOllamaChunks(rawChunk, carry = "") {
  const combined = `${carry}${rawChunk}`;
  const lines = combined.split("\n");
  const rest = lines.pop() || "";
  const texts = [];
  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!line) continue;
    try {
      const json = JSON.parse(line);
      const part =
        json?.message?.content ||
        json?.response ||
        json?.message?.reasoning_content ||
        json?.message?.thinking ||
        "";
      if (part) texts.push(part);
    } catch {
      // Ignore malformed lines from transport noise.
    }
  }
  return { texts, rest };
}

app.post("/api/tutor/chat", async (req, res) => {
  try {
    const userPrompt = buildUserPrompt(req.body || {});
    const model = resolveModel(req.body?.modelTier);
    const basePayload = {
      model,
      options: { temperature: 0.2, num_predict: 220 },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    };

    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...basePayload, stream: true }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(502).json({ error: "Tutor model request failed", detail });
    }
    if (!response.body) {
      return res.status(502).json({ error: "Tutor model request failed", detail: "Missing response body" });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const decoder = new TextDecoder();
    const reader = response.body.getReader();
    let carry = "";
    let wroteAny = false;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const rawChunk = decoder.decode(value, { stream: true });
      const parsed = extractOllamaChunks(rawChunk, carry);
      carry = parsed.rest;
      for (const chunk of parsed.texts) {
        wroteAny = true;
        res.write(chunk);
      }
    }

    if (carry.trim()) {
      try {
        const finalJson = JSON.parse(carry.trim());
        const finalPart =
          finalJson?.message?.content ||
          finalJson?.response ||
          finalJson?.message?.reasoning_content ||
          finalJson?.message?.thinking ||
          "";
        if (finalPart) {
          wroteAny = true;
          res.write(finalPart);
        }
      } catch {
        // Ignore trailing partial buffer.
      }
    }

    if (!wroteAny) {
      const fallbackResponse = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...basePayload, stream: false }),
      });
      if (fallbackResponse.ok) {
        const fallbackJson = await fallbackResponse.json();
        const fallbackText =
          fallbackJson?.message?.content ||
          fallbackJson?.response ||
          fallbackJson?.message?.reasoning_content ||
          fallbackJson?.message?.thinking ||
          "";
        if (fallbackText) res.write(fallbackText);
      }
    }

    return res.end();
  } catch (error) {
    return res.status(500).json({
      error: "Tutor service unavailable",
      detail: String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Assessment Tutor API listening on http://localhost:${PORT}`);
  console.log(`Fast model: ${FAST_MODEL}`);
  console.log(`Deep model: ${DEEP_MODEL}`);
});
