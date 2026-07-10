/**
 * H.S. Geometry Assessment — Adaptive logic, response recording, report & study plan
 * Requires: geometryCards, geometryDiagnosticSet, geometryFlashcardDataset (from geometry-cards.js)
 */

(function (global) {
  const STORAGE_KEY_RESPONSES = "geometryDiagnosticResponses";
  const STORAGE_KEY_SESSIONS = "geometryProgressSessions";
  const STORAGE_KEY_STUDENT_ID = "geometryStudentId";

  const MASTERY = { STRENGTH: "Mastered", DEVELOPING: "Developing", NEEDS_WORK: "Needs Work", MAJOR_GAP: "Major Gap" };
  const THRESHOLDS = { strength: 0.8, developing: 0.6, needsWork: 0.4 };

  /**
   * Student response record (schema from spec)
   * @typedef {{ studentId: string, questionId: string, response: string, correct: boolean, timeToAnswer: number, confidenceRating?: number, conceptTag: string }} GeometryResponse
   */

  function getStoredResponses() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RESPONSES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function setStoredResponses(arr) {
    try {
      localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(arr));
    } catch (e) {}
  }

  function getStoredSessions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function setStoredSessions(arr) {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(arr));
    } catch (e) {}
  }

  function getOrCreateStudentId() {
    let id = localStorage.getItem(STORAGE_KEY_STUDENT_ID);
    if (!id) {
      id = "stu-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(STORAGE_KEY_STUDENT_ID, id);
    }
    return id;
  }

  /**
   * Record a single response
   * @param {GeometryResponse} record
   */
  function recordResponse(record) {
    const list = getStoredResponses();
    list.push({
      ...record,
      timestamp: record.timestamp || new Date().toISOString(),
    });
    setStoredResponses(list);
  }

  /**
   * Get adaptive next question ID from diagnostic set
   * Rules: correct → followUpIfCorrect or next in sequence; incorrect → followUpIfIncorrect or next
   * @param {string} lastQuestionId
   * @param {boolean} correct
   * @param {string[]} answeredIds
   * @param {Object.<string, object>} idToCard - map id -> card with followUpIfCorrect, followUpIfIncorrect, topic
   */
  function getNextQuestionId(lastQuestionId, correct, answeredIds, idToCard) {
    const diagnosticOrder = typeof geometryDiagnosticSet !== "undefined" ? geometryDiagnosticSet : [];
    const card = idToCard[lastQuestionId];
    let nextId = null;
    if (card) {
      nextId = correct ? (card.followUpIfCorrect || null) : (card.followUpIfIncorrect || null);
    }
    if (!nextId) {
      const idx = diagnosticOrder.indexOf(lastQuestionId);
      nextId = diagnosticOrder[idx + 1] || null;
    }
    if (nextId && answeredIds.includes(nextId)) {
      const nextIdx = diagnosticOrder.indexOf(nextId);
      for (let i = nextIdx + 1; i < diagnosticOrder.length; i++) {
        if (!answeredIds.includes(diagnosticOrder[i])) {
          nextId = diagnosticOrder[i];
          break;
        }
      }
    }
    if (!nextId) {
      for (const id of diagnosticOrder) {
        if (!answeredIds.includes(id)) {
          nextId = id;
          break;
        }
      }
    }
    return nextId;
  }

  /**
   * If student missed two in a topic, flag topic as weak (for report)
   */
  function getTopicMissCounts(responses) {
    const byTopic = {};
    for (const r of responses) {
      const tag = r.conceptTag || r.topic || "Other";
      if (!byTopic[tag]) byTopic[tag] = { correct: 0, total: 0 };
      byTopic[tag].total++;
      if (!r.correct) byTopic[tag].correct--;
      else byTopic[tag].correct++;
    }
    return byTopic;
  }

  /**
   * Topic accuracy from responses (use topic from card if not in response)
   * @param {GeometryResponse[]} responses
   * @param {Object.<string, { topic: string }>} idToCard
   */
  function computeTopicAccuracy(responses, idToCard) {
    const byTopic = {};
    for (const r of responses) {
      const card = (idToCard || {})[r.questionId];
      const topic = r.topic || (card && card.topic) || r.conceptTag || "Other";
      if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 };
      byTopic[topic].total++;
      if (r.correct) byTopic[topic].correct++;
    }
    return Object.entries(byTopic).map(([topic, v]) => ({
      topic,
      correct: v.correct,
      total: v.total,
      pct: v.total ? v.correct / v.total : 0,
    }));
  }

  /**
   * Mastery level from percentage
   */
  function masteryLevel(pct) {
    if (pct >= THRESHOLDS.strength) return MASTERY.STRENGTH;
    if (pct >= THRESHOLDS.developing) return MASTERY.DEVELOPING;
    if (pct >= THRESHOLDS.needsWork) return MASTERY.NEEDS_WORK;
    return MASTERY.MAJOR_GAP;
  }

  /**
   * Diagnostic report: Strengths (>80%), Developing (60–80%), Needs Work (40–60%), Major Gaps (<40%)
   */
  function generateReport(responses, idToCard) {
    const accuracy = computeTopicAccuracy(responses, idToCard);
    const strengths = accuracy.filter((a) => a.pct >= THRESHOLDS.strength).map((a) => ({ ...a, level: MASTERY.STRENGTH }));
    const developing = accuracy.filter((a) => a.pct >= THRESHOLDS.developing && a.pct < THRESHOLDS.strength).map((a) => ({ ...a, level: MASTERY.DEVELOPING }));
    const needsWork = accuracy.filter((a) => a.pct >= THRESHOLDS.needsWork && a.pct < THRESHOLDS.developing).map((a) => ({ ...a, level: MASTERY.NEEDS_WORK }));
    const majorGaps = accuracy.filter((a) => a.pct < THRESHOLDS.needsWork).map((a) => ({ ...a, level: MASTERY.MAJOR_GAP }));
    return { strengths, developing, needsWork, majorGaps, all: accuracy };
  }

  /**
   * Study plan: Week, Topic, Concept, Practice Recommendation, Estimated Time, Priority
   */
  function generateStudyPlan(report) {
    const plan = [];
    let week = 1;
    const add = (topic, concept, practice, time, priority) => {
      plan.push({ week: week, topic, concept, practiceRecommendation: practice, estimatedTime: time, priorityLevel: priority });
    };
    for (const a of report.majorGaps) {
      add(a.topic, a.topic, "Practice 10–15 problems; review key theorems and examples", "45–60 min", "High");
      week++;
    }
    for (const a of report.needsWork) {
      add(a.topic, a.topic, "Practice 8–10 problems; focus on weak subskills", "30–45 min", "High");
      week++;
    }
    for (const a of report.developing) {
      add(a.topic, a.topic, "Practice 5–8 problems to solidify", "20–30 min", "Medium");
      week++;
    }
    for (const a of report.strengths) {
      add(a.topic, a.topic, "Light review; 3–5 problems for maintenance", "15 min", "Low");
      week++;
    }
    return plan;
  }

  /**
   * Progress session record
   */
  function recordSession(sessionDate, conceptPracticed, accuracy, notes, masteryTrend) {
    const list = getStoredSessions();
    list.push({
      sessionDate: sessionDate || new Date().toISOString().slice(0, 10),
      conceptPracticed,
      accuracy,
      notes: notes || "",
      masteryTrend: masteryTrend || "",
    });
    setStoredSessions(list);
  }

  /**
   * Export report as JSON
   */
  function exportReportJson(report, studyPlan) {
    return JSON.stringify({ report, studyPlan, generated: new Date().toISOString() }, null, 2);
  }

  /**
   * Export report as Markdown
   */
  function exportReportMarkdown(report, studyPlan, studentId) {
    let md = "# Student Geometry Diagnostic Report\n\n";
    if (studentId) md += `**Student ID:** ${studentId}\n**Date:** ${new Date().toLocaleDateString()}\n\n`;
    md += "## Strengths (>80%)\n";
    if (report.strengths.length) report.strengths.forEach((a) => { md += `- ${a.topic}: ${(a.pct * 100).toFixed(0)}%\n`; });
    else md += "- None\n";
    md += "\n## Developing (60–80%)\n";
    if (report.developing.length) report.developing.forEach((a) => { md += `- ${a.topic}: ${(a.pct * 100).toFixed(0)}%\n`; });
    else md += "- None\n";
    md += "\n## Needs Work (40–60%)\n";
    if (report.needsWork.length) report.needsWork.forEach((a) => { md += `- ${a.topic}: ${(a.pct * 100).toFixed(0)}%\n`; });
    else md += "- None\n";
    md += "\n## Major Gaps (<40%)\n";
    if (report.majorGaps.length) report.majorGaps.forEach((a) => { md += `- ${a.topic}: ${(a.pct * 100).toFixed(0)}%\n`; });
    else md += "- None\n";
    md += "\n## Recommended Study Plan\n\n| Week | Topic | Concept | Practice | Time | Priority |\n|------|-------|---------|----------|------|----------|\n";
    studyPlan.forEach((r) => { md += `| ${r.week} | ${r.topic} | ${r.concept} | ${r.practiceRecommendation} | ${r.estimatedTime} | ${r.priorityLevel} |\n`; });
    return md;
  }

  /**
   * Export responses as CSV
   */
  function exportResponsesCsv(responses) {
    const headers = "StudentID,QuestionID,Response,Correct,TimeToAnswer,ConfidenceRating,ConceptTag,Timestamp\n";
    const rows = (responses || getStoredResponses()).map((r) =>
      [r.studentId || "", r.questionId || "", (r.response || "").replace(/"/g, '""'), r.correct ? "Yes" : "No", r.timeToAnswer ?? "", r.confidenceRating ?? "", (r.conceptTag || r.topic || "").replace(/"/g, '""'), r.timestamp || ""].join(",")
    );
    return headers + rows.join("\n");
  }

  /**
   * Clear stored diagnostic responses (and optionally sessions) so the student can start fresh.
   * @param {{ clearSessions?: boolean }} options - If clearSessions is true, also clears progress sessions.
   */
  function resetDiagnostic(options) {
    setStoredResponses([]);
    if (options && options.clearSessions) setStoredSessions([]);
  }

  global.GeometryAssessment = {
    recordResponse,
    resetDiagnostic,
    getNextQuestionId,
    computeTopicAccuracy,
    generateReport,
    generateStudyPlan,
    masteryLevel,
    getTopicMissCounts,
    getStoredResponses,
    setStoredResponses,
    getStoredSessions,
    setStoredSessions,
    getOrCreateStudentId,
    recordSession,
    exportReportJson,
    exportReportMarkdown,
    exportResponsesCsv,
    MASTERY,
    THRESHOLDS,
  };
})(typeof window !== "undefined" ? window : globalThis);
