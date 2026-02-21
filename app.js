const cards = [
  // Math
  {
    id: "m-1",
    exam: "Both",
    subject: "Math",
    type: "concept",
    questionType: "Linear Equations",
    difficulty: "easy",
    focus: ["algebra", "isolation", "one-step"],
    front: "Concept: Solving linear equations quickly",
    back: "Undo operations in reverse order. Keep both sides balanced and combine like terms before dividing.",
  },
  {
    id: "m-2",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Linear Equations",
    difficulty: "easy",
    focus: ["algebra", "solve for x"],
    front: "Problem: Solve 5x - 9 = 31.",
    back: "5x = 40, so x = 8.",
  },
  {
    id: "m-3",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Functions",
    difficulty: "medium",
    focus: ["function notation", "substitution"],
    front: "Problem: If g(x) = 2x^2 - 3, find g(4).",
    back: "g(4) = 2(16) - 3 = 32 - 3 = 29.",
  },
  {
    id: "m-4",
    exam: "Both",
    subject: "Math",
    type: "concept",
    questionType: "Systems of Equations",
    difficulty: "medium",
    focus: ["substitution", "elimination", "strategy"],
    front: "Concept: Systems method choice",
    back: "Use substitution when a variable is isolated. Use elimination when coefficients can cancel with simple multiplication.",
  },
  {
    id: "m-5",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Systems of Equations",
    difficulty: "medium",
    focus: ["elimination", "ordered pair"],
    front: "Problem: Solve the system: 2x + y = 7 and x - y = 2.",
    back: "Add equations: 3x = 9, so x = 3. Then y = 1.",
  },
  {
    id: "m-6",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Quadratics",
    difficulty: "medium",
    focus: ["factoring", "zero product"],
    front: "Problem: Solve x^2 + x - 12 = 0.",
    back: "(x + 4)(x - 3) = 0, so x = -4 or x = 3.",
  },
  {
    id: "m-7",
    exam: "SAT",
    subject: "Math",
    type: "concept",
    questionType: "Exponent Rules",
    difficulty: "easy",
    focus: ["exponents", "simplification"],
    front: "Concept: Product rule for exponents",
    back: "For same base, add exponents: a^m * a^n = a^(m+n).",
  },
  {
    id: "m-8",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Percent & Proportion",
    difficulty: "easy",
    focus: ["percents", "real-world"],
    front: "Problem: A jacket costs $80 and is discounted 25%. What is the sale price?",
    back: "Discount is $20. Sale price is $60.",
  },
  {
    id: "m-9",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Geometry - Triangles",
    difficulty: "medium",
    focus: ["pythagorean", "geometry"],
    front: "Problem: A right triangle has legs 9 and 12. Find the hypotenuse.",
    back: "c^2 = 81 + 144 = 225, so c = 15.",
  },
  {
    id: "m-10",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Statistics",
    difficulty: "difficult",
    focus: ["mean", "algebra", "data"],
    front: "Problem: The mean of six numbers is 14. Five numbers sum to 61. What is the sixth number?",
    back: "Total must be 84. Sixth number is 84 - 61 = 23.",
  },
  {
    id: "m-11",
    exam: "Both",
    subject: "Math",
    type: "concept",
    questionType: "Word Problems",
    difficulty: "difficult",
    focus: ["translation", "rates", "setup"],
    front: "Concept: Rate problem setup",
    back: "Translate words to equation using distance = rate * time. Define variables before substituting numbers.",
  },
  {
    id: "m-12",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Probability",
    difficulty: "difficult",
    focus: ["counting", "fractions"],
    front: "Problem: A bag has 4 red, 3 blue, and 3 green marbles. Probability of drawing red then blue without replacement?",
    back: "(4/10) * (3/9) = 12/90 = 2/15.",
  },

  // Reading
  {
    id: "r-1",
    exam: "Both",
    subject: "Reading",
    type: "concept",
    questionType: "Main Idea",
    difficulty: "easy",
    focus: ["passage map", "central claim"],
    front: "Concept: Main idea shortcut",
    back: "Use intro + conclusion + topic sentences to form a one-sentence summary before checking answer choices.",
  },
  {
    id: "r-2",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Detail Retrieval",
    difficulty: "easy",
    focus: ["line reference", "text evidence"],
    front: "Problem: A question cites lines 22-27. First move?",
    back: "Return to lines 22-27 and read a few lines before/after for context before choosing.",
  },
  {
    id: "r-3",
    exam: "SAT",
    subject: "Reading",
    type: "concept",
    questionType: "Evidence Pair",
    difficulty: "medium",
    focus: ["paired questions", "justification"],
    front: "Concept: Evidence pair workflow",
    back: "Pick best claim answer first, then choose evidence lines that directly prove that exact claim.",
  },
  {
    id: "r-4",
    exam: "Both",
    subject: "Reading",
    type: "problem",
    questionType: "Inference",
    difficulty: "medium",
    focus: ["implicit meaning", "support"],
    front: "Problem: The author says the policy 'showed promise but required safeguards.' What inference is best?",
    back: "The author is cautiously supportive, not fully endorsing implementation without limits.",
  },
  {
    id: "r-5",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Vocabulary in Context",
    difficulty: "medium",
    focus: ["word meaning", "context clues"],
    front: "Problem: In context, 'charged' most likely means emotional, electrical, accused, or assigned?",
    back: "Use surrounding lines. If discussing atmosphere/tone, 'emotional' is correct.",
  },
  {
    id: "r-6",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Author's Purpose",
    difficulty: "medium",
    focus: ["rhetorical purpose", "function"],
    front: "Problem: Why include an anecdote in paragraph 2?",
    back: "To humanize the argument and provide a concrete example before broader analysis.",
  },
  {
    id: "r-7",
    exam: "Both",
    subject: "Reading",
    type: "concept",
    questionType: "Tone",
    difficulty: "easy",
    focus: ["attitude", "word choice"],
    front: "Concept: Tone identification",
    back: "Track adjectives/adverbs and contrast words; tone reflects author attitude, not just topic.",
  },
  {
    id: "r-8",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Passage Structure",
    difficulty: "difficult",
    focus: ["organization", "argument progression"],
    front: "Problem: Passage moves from historical background to modern critique. Best structure description?",
    back: "It frames context first, then evaluates current shortcomings using that history.",
  },
  {
    id: "r-9",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Paired Passages",
    difficulty: "difficult",
    focus: ["comparison", "agreement-disagreement"],
    front: "Problem: Passage A supports regulation; Passage B supports incentives. Shared point?",
    back: "Both seek lower emissions; they differ on policy method.",
  },
  {
    id: "r-10",
    exam: "Both",
    subject: "Reading",
    type: "concept",
    questionType: "Elimination Strategy",
    difficulty: "difficult",
    focus: ["answer traps", "precision"],
    front: "Concept: Eliminate reading answer traps",
    back: "Remove choices that are too extreme, partly true, or unsupported by cited lines.",
  },
  {
    id: "r-11",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Command of Evidence",
    difficulty: "difficult",
    focus: ["best evidence", "line support"],
    front: "Problem: Which line best supports the claim that demand was seasonal?",
    back: "Choose the line showing recurring peak periods and low off-season values.",
  },
  {
    id: "r-12",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Sequencing",
    difficulty: "easy",
    focus: ["chronology", "events"],
    front: "Problem: If paragraph 3 describes results, what likely appears earlier?",
    back: "Methods or setup likely appears earlier to establish what produced those results.",
  },

  // Writing / English
  {
    id: "w-1",
    exam: "Both",
    subject: "Writing",
    type: "concept",
    questionType: "Sentence Boundaries",
    difficulty: "easy",
    focus: ["comma splice", "run-on"],
    front: "Concept: Fixing comma splices",
    back: "Join independent clauses with period, semicolon, or comma + coordinating conjunction.",
  },
  {
    id: "w-2",
    exam: "Both",
    subject: "Writing",
    type: "problem",
    questionType: "Sentence Boundaries",
    difficulty: "easy",
    focus: ["punctuation", "clause"],
    front: "Problem: 'The project ended, the team celebrated.' Best correction?",
    back: "Use semicolon or conjunction: 'The project ended, and the team celebrated.'",
  },
  {
    id: "w-3",
    exam: "SAT",
    subject: "Writing",
    type: "concept",
    questionType: "Transitions",
    difficulty: "medium",
    focus: ["logic", "cohesion"],
    front: "Concept: Transition selection",
    back: "Match relation: contrast (however), cause (therefore), addition (furthermore), example (for instance).",
  },
  {
    id: "w-4",
    exam: "ACT",
    subject: "Writing",
    type: "problem",
    questionType: "Verb Tense",
    difficulty: "medium",
    focus: ["consistency", "timeline"],
    front: "Problem: 'Last year, she studies biology and publishes a paper.' Correct tense?",
    back: "Past timeline requires past tense: 'studied' and 'published.'",
  },
  {
    id: "w-5",
    exam: "Both",
    subject: "Writing",
    type: "problem",
    questionType: "Pronoun Agreement",
    difficulty: "medium",
    focus: ["number agreement", "clarity"],
    front: "Problem: 'Each student submitted their draft.' Best formal revision?",
    back: "'Each student submitted his or her draft' or recast plural: 'Students submitted their drafts.'",
  },
  {
    id: "w-6",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Modifier Placement",
    difficulty: "difficult",
    focus: ["dangling modifier", "syntax"],
    front: "Problem: 'Running to class, the backpack slipped.' What is wrong?",
    back: "Dangling modifier. Backpack is not running. Rewrite so runner is the subject.",
  },
  {
    id: "w-7",
    exam: "ACT",
    subject: "Writing",
    type: "concept",
    questionType: "Concision",
    difficulty: "easy",
    focus: ["redundancy", "brevity"],
    front: "Concept: ACT concision rule",
    back: "Prefer the shortest grammatically correct option that keeps original meaning.",
  },
  {
    id: "w-8",
    exam: "Both",
    subject: "Writing",
    type: "problem",
    questionType: "Parallel Structure",
    difficulty: "difficult",
    focus: ["lists", "grammar consistency"],
    front: "Problem: 'She likes hiking, to swim, and biking.' Best fix?",
    back: "Use parallel gerunds: 'She likes hiking, swimming, and biking.'",
  },
  {
    id: "w-9",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Organization",
    difficulty: "difficult",
    focus: ["paragraph order", "coherence"],
    front: "Problem: A sentence defines a term used later. Where should it go?",
    back: "Place it before first use of the term to avoid confusing readers.",
  },
  {
    id: "w-10",
    exam: "ACT",
    subject: "Writing",
    type: "problem",
    questionType: "Word Choice",
    difficulty: "medium",
    focus: ["diction", "precision"],
    front: "Problem: 'The scientist made a big impact in enzymes.' Better word than 'big'?",
    back: "Use precise diction: 'significant impact.'",
  },
  {
    id: "w-11",
    exam: "Both",
    subject: "Writing",
    type: "concept",
    questionType: "Punctuation",
    difficulty: "easy",
    focus: ["nonessential clauses", "commas"],
    front: "Concept: Nonessential clause commas",
    back: "Set off extra information with commas when sentence meaning remains complete without it.",
  },
  {
    id: "w-12",
    exam: "ACT",
    subject: "Writing",
    type: "problem",
    questionType: "Punctuation",
    difficulty: "difficult",
    focus: ["semicolon", "independent clauses"],
    front: "Problem: Choose semicolon use: 'The data were clear; the conclusion remained uncertain.' Why valid?",
    back: "Both sides are independent clauses; semicolon correctly links closely related ideas.",
  },

  // Science (ACT)
  {
    id: "s-1",
    exam: "ACT",
    subject: "Science",
    type: "concept",
    questionType: "Data Representation",
    difficulty: "easy",
    focus: ["graphs", "axes", "units"],
    front: "Concept: First step on ACT science charts",
    back: "Check variables, axis labels, units, and scale before reading values.",
  },
  {
    id: "s-2",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Trend Analysis",
    difficulty: "easy",
    focus: ["trend", "comparison"],
    front: "Problem: As pH rises from 4 to 7, reaction rate drops. What trend is shown?",
    back: "Negative relationship: higher pH corresponds to lower reaction rate.",
  },
  {
    id: "s-3",
    exam: "ACT",
    subject: "Science",
    type: "concept",
    questionType: "Research Summaries",
    difficulty: "medium",
    focus: ["experiment design", "variables"],
    front: "Concept: Variable identification",
    back: "Independent variable is manipulated; dependent variable is measured; constants stay the same.",
  },
  {
    id: "s-4",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Experimental Design",
    difficulty: "medium",
    focus: ["controls", "validity"],
    front: "Problem: Only fertilizer amount changes; seed type and sunlight are fixed. What is controlled?",
    back: "Seed type and sunlight are controlled variables.",
  },
  {
    id: "s-5",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Interpolation",
    difficulty: "medium",
    focus: ["graph reading", "estimation"],
    front: "Problem: Graph values are 20 at 2 min and 28 at 4 min. Estimate value at 3 min.",
    back: "Approximately 24 if the trend is linear.",
  },
  {
    id: "s-6",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Extrapolation",
    difficulty: "difficult",
    focus: ["projecting trend", "limits"],
    front: "Problem: If a trend rises by 5 units every trial, what is expected at trial 8 if trial 5 is 30?",
    back: "Three trials later: 30 + 15 = 45.",
  },
  {
    id: "s-7",
    exam: "ACT",
    subject: "Science",
    type: "concept",
    questionType: "Conflicting Viewpoints",
    difficulty: "difficult",
    focus: ["claims", "disagreement"],
    front: "Concept: Conflicting viewpoints approach",
    back: "Track each scientist's claim, supporting reason, and specific point of disagreement.",
  },
  {
    id: "s-8",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Conflicting Viewpoints",
    difficulty: "difficult",
    focus: ["comparison", "evidence"],
    front: "Problem: Scientist A says heat increases solubility; B says no effect. What question best separates views?",
    back: "Whether measured solubility changes when temperature is increased under same conditions.",
  },
  {
    id: "s-9",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Units & Conversion",
    difficulty: "easy",
    focus: ["units", "measurement"],
    front: "Problem: Convert 0.5 L to mL.",
    back: "0.5 L = 500 mL.",
  },
  {
    id: "s-10",
    exam: "ACT",
    subject: "Science",
    type: "concept",
    questionType: "Table Interpretation",
    difficulty: "medium",
    focus: ["row-column lookup", "conditions"],
    front: "Concept: Table lookup accuracy",
    back: "Confirm both condition row and variable column before selecting value.",
  },
  {
    id: "s-11",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Data Comparison",
    difficulty: "medium",
    focus: ["multi-set comparison", "trend"],
    front: "Problem: Trial 1 peaks at 40 C, Trial 2 peaks at 35 C. Which has higher peak and by how much?",
    back: "Trial 1 has the higher peak by 5 C.",
  },
  {
    id: "s-12",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Method Critique",
    difficulty: "difficult",
    focus: ["experimental flaws", "bias"],
    front: "Problem: Why is testing two variables at once a design weakness?",
    back: "You cannot isolate which variable caused the observed change.",
  },
  {
    id: "m-13",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Inequalities",
    difficulty: "easy",
    focus: ["algebra", "number line"],
    front: "Problem: Solve 3x + 2 < 14.",
    back: "3x < 12, so x < 4.",
  },
  {
    id: "m-14",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Coordinate Geometry",
    difficulty: "medium",
    focus: ["slope", "points"],
    front: "Problem: Find the slope between (2, 5) and (6, 13).",
    back: "Slope = (13 - 5) / (6 - 2) = 8 / 4 = 2.",
  },
  {
    id: "m-15",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Geometry - Circles",
    difficulty: "medium",
    focus: ["circumference", "pi"],
    front: "Problem: A circle has radius 7. What is its circumference in terms of pi?",
    back: "C = 2pr = 14p.",
  },
  {
    id: "m-16",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Radicals",
    difficulty: "medium",
    focus: ["simplifying radicals", "factors"],
    front: "Problem: Simplify square root of 72.",
    back: "square root of 72 = square root of 36 times square root of 2 = 6 square root of 2.",
  },
  {
    id: "m-17",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Ratios",
    difficulty: "easy",
    focus: ["part-to-part", "proportions"],
    front: "Problem: The ratio of boys to girls is 3:5. If there are 25 girls, how many boys are there?",
    back: "Boys = 25 * (3/5) = 15.",
  },
  {
    id: "m-18",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Ratios",
    difficulty: "medium",
    focus: ["part-to-part", "valid integer setup"],
    front: "Problem: The ratio of boys to girls is 3:5. If there are 40 girls, how many boys are there?",
    back: "Boys = 40 * (3/5) = 24.",
  },
  {
    id: "m-19",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Trigonometry",
    difficulty: "difficult",
    focus: ["right triangles", "sine"],
    front: "Problem: In a right triangle, opposite side is 8 and hypotenuse is 10. What is sin(theta)?",
    back: "sin(theta) = opposite/hypotenuse = 8/10 = 4/5.",
  },
  {
    id: "m-20",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Quadratic Vertex",
    difficulty: "difficult",
    focus: ["parabolas", "vertex formula"],
    front: "Problem: For y = x^2 - 6x + 5, what is the x-coordinate of the vertex?",
    back: "x = -b/(2a) = 6/2 = 3.",
  },
  {
    id: "r-13",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Textual Evidence",
    difficulty: "easy",
    focus: ["support", "direct quote"],
    front: "Problem: Which evidence is strongest for the claim that the narrator is uncertain?",
    back: "The line containing hedging language like 'perhaps' or 'it seemed' provides strongest support.",
  },
  {
    id: "r-14",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Function of Detail",
    difficulty: "medium",
    focus: ["detail purpose", "author intent"],
    front: "Problem: Why does the author include statistics in paragraph 4?",
    back: "To quantify the claim and increase credibility with concrete evidence.",
  },
  {
    id: "r-15",
    exam: "Both",
    subject: "Reading",
    type: "problem",
    questionType: "Point of View",
    difficulty: "medium",
    focus: ["narration", "perspective"],
    front: "Problem: The passage uses first-person anecdotes and reflective language. Which point of view is dominant?",
    back: "First-person reflective perspective.",
  },
  {
    id: "r-16",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Data in Passage",
    difficulty: "difficult",
    focus: ["graph integration", "evidence"],
    front: "Problem: A chart shows a decline while the author claims growth. Best interpretation?",
    back: "The claim likely refers to a different interval or subgroup; verify labels, years, and units.",
  },
  {
    id: "r-17",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Author Agreement",
    difficulty: "difficult",
    focus: ["paired passages", "comparison"],
    front: "Problem: Passage A praises local reform, Passage B criticizes implementation. Where might they agree?",
    back: "Both can agree reform goals are important while disagreeing on execution.",
  },
  {
    id: "r-18",
    exam: "Both",
    subject: "Reading",
    type: "problem",
    questionType: "Best Summary",
    difficulty: "easy",
    focus: ["main idea", "scope"],
    front: "Problem: Best summary choice should do what?",
    back: "Capture the full passage scope without narrow details or extreme claims.",
  },
  {
    id: "r-19",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Rhetorical Effect",
    difficulty: "medium",
    focus: ["tone shift", "effect on reader"],
    front: "Problem: The author shifts from formal data to a personal story. What is the likely effect?",
    back: "It makes the argument more relatable while preserving analytical credibility.",
  },
  {
    id: "r-20",
    exam: "ACT",
    subject: "Reading",
    type: "problem",
    questionType: "Context Clues",
    difficulty: "easy",
    focus: ["vocabulary", "local context"],
    front: "Problem: In line 18, 'temper' most nearly means what if the sentence discusses reducing intensity?",
    back: "It means to moderate or soften.",
  },
  {
    id: "w-13",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Subject-Verb Agreement",
    difficulty: "easy",
    focus: ["agreement", "singular-plural"],
    front: "Problem: 'The list of items are on the desk.' Correct verb?",
    back: "Use singular verb: 'The list of items is on the desk.'",
  },
  {
    id: "w-14",
    exam: "ACT",
    subject: "Writing",
    type: "problem",
    questionType: "Apostrophes",
    difficulty: "easy",
    focus: ["possessives", "punctuation"],
    front: "Problem: Choose correct possessive: 'the teachers lounge' for one teacher.",
    back: "Singular possessive is 'the teacher's lounge.'",
  },
  {
    id: "w-15",
    exam: "Both",
    subject: "Writing",
    type: "problem",
    questionType: "Colon Usage",
    difficulty: "medium",
    focus: ["punctuation", "lists"],
    front: "Problem: When is a colon valid before a list?",
    back: "When it follows an independent clause that introduces the list.",
  },
  {
    id: "w-16",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Logical Transitions",
    difficulty: "medium",
    focus: ["cohesion", "contrast"],
    front: "Problem: 'The prototype failed initial tests. ___, engineers redesigned the circuit.' Best transition?",
    back: "'Therefore' or 'As a result' if redesign is consequence of failure.",
  },
  {
    id: "w-17",
    exam: "ACT",
    subject: "Writing",
    type: "problem",
    questionType: "Sentence Placement",
    difficulty: "difficult",
    focus: ["organization", "coherence"],
    front: "Problem: A sentence introduces a study cited in the next line. Best location?",
    back: "Place it immediately before the citation details so references are clear.",
  },
  {
    id: "w-18",
    exam: "Both",
    subject: "Writing",
    type: "problem",
    questionType: "Redundancy",
    difficulty: "easy",
    focus: ["concision", "style"],
    front: "Problem: Revise 'free gift' for concision.",
    back: "Use 'gift'; 'free' is redundant.",
  },
  {
    id: "w-19",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Comparison Structure",
    difficulty: "difficult",
    focus: ["parallel comparison", "logic"],
    front: "Problem: Fix comparison: 'The salary of pilots is higher than teachers.'",
    back: "Compare like terms: 'The salaries of pilots are higher than those of teachers.'",
  },
  {
    id: "w-20",
    exam: "ACT",
    subject: "Writing",
    type: "problem",
    questionType: "Wordiness",
    difficulty: "medium",
    focus: ["revision", "clarity"],
    front: "Problem: Improve 'Due to the fact that it rained, the game was canceled.'",
    back: "Use concise form: 'Because it rained, the game was canceled.'",
  },
  {
    id: "s-13",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Graph Intersections",
    difficulty: "medium",
    focus: ["graphs", "comparison"],
    front: "Problem: Two lines intersect at 12 seconds and 40 units. What does intersection represent?",
    back: "At 12 seconds both datasets have the same value: 40 units.",
  },
  {
    id: "s-14",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Experimental Control",
    difficulty: "difficult",
    focus: ["controls", "valid inference"],
    front: "Problem: Why include a no-treatment control group?",
    back: "To isolate treatment effects by comparing outcomes against baseline conditions.",
  },
  {
    id: "s-15",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Scientific Notation",
    difficulty: "easy",
    focus: ["notation", "powers of ten"],
    front: "Problem: Convert 0.00045 to scientific notation.",
    back: "4.5 x 10^-4.",
  },
  {
    id: "s-16",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Table Trends",
    difficulty: "medium",
    focus: ["tabular data", "pattern detection"],
    front: "Problem: In a table, mass increases while volume stays constant. What happens to density?",
    back: "Density increases because density = mass/volume and denominator is unchanged.",
  },
  {
    id: "s-17",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Conflicting Hypotheses",
    difficulty: "difficult",
    focus: ["hypothesis testing", "disagreement"],
    front: "Problem: Hypothesis 1 predicts increase; Hypothesis 2 predicts no change. Which result supports only Hypothesis 1?",
    back: "A clear measured increase beyond experimental uncertainty supports only Hypothesis 1.",
  },
  {
    id: "s-18",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Proportional Reasoning",
    difficulty: "medium",
    focus: ["ratios", "science math"],
    front: "Problem: If concentration doubles and volume is unchanged, how many times larger is total solute amount?",
    back: "It is 2 times larger.",
  },
  {
    id: "s-19",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Method Improvement",
    difficulty: "difficult",
    focus: ["reliability", "experimental design"],
    front: "Problem: What is one common way to improve reliability in an experiment?",
    back: "Increase number of trials and average results to reduce random error.",
  },
  {
    id: "s-20",
    exam: "ACT",
    subject: "Science",
    type: "problem",
    questionType: "Reading Figures",
    difficulty: "easy",
    focus: ["axes", "units", "lookup"],
    front: "Problem: A y-axis is in grams and x-axis in minutes. What does the point (3, 12) mean?",
    back: "At 3 minutes, the measured mass is 12 grams.",
  },
  {
    id: "m-21",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Logarithms",
    difficulty: "difficult",
    focus: ["logs", "inverse operations"],
    front: "Problem: If log base 2 of x = 5, what is x?",
    back: "x = 2^5 = 32.",
  },
  {
    id: "m-22",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Complex Numbers",
    difficulty: "difficult",
    focus: ["imaginary unit", "algebra"],
    front: "Problem: Simplify (3 + 2i) + (5 - 7i).",
    back: "Combine real and imaginary parts: 8 - 5i.",
  },
  {
    id: "m-23",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Complex Numbers",
    difficulty: "difficult",
    focus: ["i powers", "patterns"],
    front: "Problem: Evaluate i^23.",
    back: "Powers of i repeat every 4. 23 mod 4 = 3, so i^23 = i^3 = -i.",
  },
  {
    id: "m-24",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Matrices",
    difficulty: "difficult",
    focus: ["matrix addition", "entries"],
    front: "Problem: Add matrices [[1, 4], [2, 3]] and [[5, -1], [0, 7]].",
    back: "Add entrywise: [[6, 3], [2, 10]].",
  },
  {
    id: "m-25",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Sequences",
    difficulty: "medium",
    focus: ["arithmetic sequence", "nth term"],
    front: "Problem: Arithmetic sequence starts 7, 11, 15, ... Find term 20.",
    back: "d = 4, so a20 = 7 + 19*4 = 83.",
  },
  {
    id: "m-26",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Conic Sections",
    difficulty: "difficult",
    focus: ["parabola form", "vertex"],
    front: "Problem: For (x - 2)^2 = 12(y + 1), what is the vertex?",
    back: "Vertex form is (x - h)^2 = 4p(y - k), so vertex is (2, -1).",
  },
  {
    id: "m-27",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Trig Identities",
    difficulty: "difficult",
    focus: ["pythagorean identity", "simplification"],
    front: "Problem: If sin(theta) = 3/5 and theta is acute, find cos(theta).",
    back: "cos(theta) = 4/5 from 3-4-5 triangle or sin^2 + cos^2 = 1.",
  },
  {
    id: "m-28",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Polynomial Division",
    difficulty: "difficult",
    focus: ["factor theorem", "remainder"],
    front: "Problem: What is the remainder when x^3 - 2x^2 + 4x - 1 is divided by (x - 2)?",
    back: "Use Remainder Theorem: f(2) = 8 - 8 + 8 - 1 = 7.",
  },
  {
    id: "m-29",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Absolute Value Equations",
    difficulty: "medium",
    focus: ["piecewise thinking", "two cases"],
    front: "Problem: Solve |2x - 1| = 9.",
    back: "Cases: 2x - 1 = 9 -> x = 5, or 2x - 1 = -9 -> x = -4.",
  },
  {
    id: "m-30",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Rational Expressions",
    difficulty: "difficult",
    focus: ["domain restrictions", "simplification"],
    front: "Problem: Simplify (x^2 - 9)/(x - 3) and state restriction.",
    back: "Factor numerator: (x - 3)(x + 3)/(x - 3) = x + 3, with x not equal to 3.",
  },
  {
    id: "m-31",
    exam: "Both",
    subject: "Math",
    type: "concept",
    questionType: "Exponential Growth and Decay",
    difficulty: "easy",
    focus: ["growth factor", "decay factor", "percent change"],
    front: "Concept: Exponential growth vs decay form",
    back: "Use y = a(1 + r)^t for growth and y = a(1 - r)^t for decay, where r is the rate as a decimal.",
  },
  {
    id: "m-32",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "easy",
    focus: ["decay", "substitution"],
    front: "Problem: A value of 500 decreases by 12% each year. Write an expression for value after t years.",
    back: "V(t) = 500(0.88)^t.",
  },
  {
    id: "m-33",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "medium",
    focus: ["growth", "evaluation"],
    front: "Problem: A bacteria culture starts at 200 and grows 15% per hour. How many after 3 hours?",
    back: "N = 200(1.15)^3 = 200(1.520875) = 304.175, about 304.",
  },
  {
    id: "m-34",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "medium",
    focus: ["half-life", "decay"],
    front: "Problem: A substance has half-life 4 hours and starts at 96 mg. How much remains after 8 hours?",
    back: "After 8 hours (two half-lives): 96(1/2)^2 = 24 mg.",
  },
  {
    id: "m-35",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "difficult",
    focus: ["equation setup", "solve for rate"],
    front: "Problem: A town's population was 40,000 and became 46,244 in 3 years with constant annual growth. What is the annual rate?",
    back: "Use 40000(1 + r)^3 = 46244. (1 + r)^3 = 1.1561 so 1 + r = 1.05 and r = 0.05, or 5%.",
  },
  {
    id: "m-36",
    exam: "ACT",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "medium",
    focus: ["multi-step percent change", "compound decay"],
    front: "Problem: A phone battery is at 100% and loses 20% each hour. What percent remains after 2 hours?",
    back: "Remaining = 100(0.8)^2 = 64%.",
  },
  {
    id: "m-37",
    exam: "SAT",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "difficult",
    focus: ["comparing models", "linear vs exponential"],
    front: "Problem: Plan A increases by 50 each year from 400. Plan B grows 10% yearly from 400. Which is larger after 3 years?",
    back: "Plan A: 400 + 3(50) = 550. Plan B: 400(1.1)^3 = 532.4. Plan A is larger after 3 years.",
  },
  {
    id: "m-38",
    exam: "Both",
    subject: "Math",
    type: "problem",
    questionType: "Exponential Growth and Decay",
    difficulty: "difficult",
    focus: ["compound interest", "annual compounding"],
    front: "Problem: $1200 is invested at 6% annual interest compounded yearly. What is the balance after 2 years?",
    back: "A = 1200(1.06)^2 = 1200(1.1236) = $1348.32.",
  },
  {
    id: "r-21",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Central Idea",
    difficulty: "easy",
    focus: ["main claim", "scope"],
    front: "Problem: Which choice best states the central idea of a passage?",
    back: "Choose the option that covers the whole passage, not one detail or one paragraph.",
  },
  {
    id: "r-22",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Text Structure and Purpose",
    difficulty: "medium",
    focus: ["paragraph function", "organization"],
    front: "Problem: A paragraph defines a term before giving examples. What is its primary function?",
    back: "It establishes conceptual groundwork so later examples are interpretable.",
  },
  {
    id: "r-23",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Cross-Text Connections",
    difficulty: "difficult",
    focus: ["dual passages", "agreement"],
    front: "Problem: Text 1 argues regulation is necessary; Text 2 argues incentives are enough. Best comparison?",
    back: "They share goals but differ on policy mechanism and assumptions about behavior.",
  },
  {
    id: "r-24",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Words in Context",
    difficulty: "medium",
    focus: ["precision", "connotation"],
    front: "Problem: In context, 'frugal' most nearly means cheap, careful, wealthy, or strict?",
    back: "Careful with resources; 'cheap' adds negative connotation not required by context.",
  },
  {
    id: "r-25",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Command of Evidence",
    difficulty: "difficult",
    focus: ["claim support", "best line"],
    front: "Problem: A claim says demand was volatile. What evidence is best?",
    back: "The line with large repeated rises and drops over time, not a single point change.",
  },
  {
    id: "r-26",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Quantitative Evidence",
    difficulty: "difficult",
    focus: ["table reading", "data claims"],
    front: "Problem: Table shows Group A improves 12% and Group B 5%. Which claim is supported?",
    back: "Group A improved more than Group B by 7 percentage points.",
  },
  {
    id: "r-27",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Inference",
    difficulty: "medium",
    focus: ["implied meaning", "restraint"],
    front: "Problem: Author calls results 'encouraging but preliminary.' What can be inferred?",
    back: "The author is optimistic but sees need for more evidence before strong conclusions.",
  },
  {
    id: "r-28",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Rhetorical Synthesis",
    difficulty: "difficult",
    focus: ["note selection", "goal alignment"],
    front: "Problem: Notes include date, method, and impact. Goal: emphasize reliability. Which detail matters most?",
    back: "Method detail, because reliability is judged by procedure and replicability.",
  },
  {
    id: "r-29",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Purpose of Reference",
    difficulty: "medium",
    focus: ["citation function", "author strategy"],
    front: "Problem: Why cite a historical example in the opening sentence?",
    back: "To frame the modern argument within a longer context and build credibility.",
  },
  {
    id: "r-30",
    exam: "SAT",
    subject: "Reading",
    type: "problem",
    questionType: "Tone and Style",
    difficulty: "easy",
    focus: ["attitude", "diction"],
    front: "Problem: The passage uses measured language and frequent qualifications. Tone is best described as what?",
    back: "Cautious and analytical.",
  },
  {
    id: "w-21",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Standard English Conventions",
    difficulty: "easy",
    focus: ["subject-verb agreement", "core grammar"],
    front: "Problem: 'A bouquet of roses smell sweet.' Correct verb?",
    back: "Use singular verb with bouquet: 'A bouquet of roses smells sweet.'",
  },
  {
    id: "w-22",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Boundaries",
    difficulty: "medium",
    focus: ["independent clauses", "punctuation"],
    front: "Problem: Best punctuation for: 'The lab closed early ___ the trial was postponed.'",
    back: "Use semicolon or comma + conjunction: 'The lab closed early, so the trial was postponed.'",
  },
  {
    id: "w-23",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Form, Structure, and Sense",
    difficulty: "difficult",
    focus: ["logical flow", "sentence function"],
    front: "Problem: A sentence repeats the prior sentence's idea without adding info. Keep, revise, or delete?",
    back: "Delete or revise; repetition without purpose weakens cohesion.",
  },
  {
    id: "w-24",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Transitions",
    difficulty: "medium",
    focus: ["cause/effect", "cohesion"],
    front: "Problem: 'The sample size was small. ___, the conclusions are tentative.' Best transition?",
    back: "'Therefore' is best because the second sentence is a result of the first.",
  },
  {
    id: "w-25",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Rhetorical Synthesis",
    difficulty: "difficult",
    focus: ["note integration", "audience goal"],
    front: "Problem: Notes list three study benefits. Goal: emphasize affordability. Which point should be selected?",
    back: "Select the note about reduced cost per user, since it directly addresses affordability.",
  },
  {
    id: "w-26",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Precision",
    difficulty: "medium",
    focus: ["word choice", "specificity"],
    front: "Problem: Better replacement for 'things changed quickly' in a scientific summary?",
    back: "Use precise wording: 'conditions shifted rapidly' or specific variable language.",
  },
  {
    id: "w-27",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Pronoun Clarity",
    difficulty: "easy",
    focus: ["ambiguous reference", "clarity"],
    front: "Problem: 'When Sofia met Priya, she smiled.' What's the issue?",
    back: "Ambiguous pronoun reference. Replace 'she' with the intended name.",
  },
  {
    id: "w-28",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Modifier Placement",
    difficulty: "difficult",
    focus: ["misplaced modifier", "meaning precision"],
    front: "Problem: 'Students nearly completed all the questions.' Why problematic?",
    back: "'Nearly' wrongly modifies completed. Intended meaning is students completed nearly all questions.",
  },
  {
    id: "w-29",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Parallelism",
    difficulty: "medium",
    focus: ["list consistency", "grammar"],
    front: "Problem: Choose best revision: 'The intern organized files, to schedule meetings, and wrote summaries.'",
    back: "Use parallel verbs: 'The intern organized files, scheduled meetings, and wrote summaries.'",
  },
  {
    id: "w-30",
    exam: "SAT",
    subject: "Writing",
    type: "problem",
    questionType: "Punctuation - Nonessential Clauses",
    difficulty: "easy",
    focus: ["commas", "appositives"],
    front: "Problem: Do commas belong in 'My brother who lives in Denver is visiting' if I have one brother?",
    back: "Yes. Nonessential clause should be set off: 'My brother, who lives in Denver, is visiting.'",
  },
];

const examFilter = document.getElementById("examFilter");
const typeFilter = document.getElementById("typeFilter");
const subjectFilter = document.getElementById("subjectFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const questionTypeFilter = document.getElementById("questionTypeFilter");
const cardMeta = document.getElementById("cardMeta");
const cardAttributes = document.getElementById("cardAttributes");
const flashcard = document.getElementById("flashcard");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const correctBtn = document.getElementById("correctBtn");
const reviewMissedBtn = document.getElementById("reviewMissedBtn");
const resetTrackingBtn = document.getElementById("resetTrackingBtn");
const sessionStats = document.getElementById("sessionStats");

let filteredCards = [...cards];
let index = 0;
let reviewMissedOnly = false;

let attempts = 0;
let correctAttempts = 0;
let incorrectAttempts = 0;
const seenIds = new Set();
const missedIds = new Set();
const cardResults = new Map();

function formatDifficulty(value) {
  if (value === "easy") return "Easy";
  if (value === "medium") return "Medium";
  return "Difficult";
}

function passesBaseFilters(card) {
  const examPass =
    examFilter.value === "all" ||
    card.exam === examFilter.value ||
    (examFilter.value === "ACT" && card.exam === "Both") ||
    (examFilter.value === "SAT" && card.exam === "Both");

  const typePass = typeFilter.value === "all" || card.type === typeFilter.value;
  const subjectPass = subjectFilter.value === "all" || card.subject === subjectFilter.value;
  const difficultyPass =
    difficultyFilter.value === "all" || card.difficulty === difficultyFilter.value;
  const reviewPass = !reviewMissedOnly || missedIds.has(card.id);

  return examPass && typePass && subjectPass && difficultyPass && reviewPass;
}

function refreshQuestionTypeOptions() {
  const currentValue = questionTypeFilter.value || "all";
  const types = [...new Set(cards.filter(passesBaseFilters).map((card) => card.questionType))].sort();

  questionTypeFilter.innerHTML = '<option value="all">All</option>';

  for (const type of types) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    questionTypeFilter.appendChild(option);
  }

  questionTypeFilter.value = types.includes(currentValue) ? currentValue : "all";
}

function buildFilteredCards() {
  filteredCards = cards.filter((card) => {
    const questionTypePass =
      questionTypeFilter.value === "all" || card.questionType === questionTypeFilter.value;
    return passesBaseFilters(card) && questionTypePass;
  });

  if (index >= filteredCards.length) {
    index = 0;
  }

  renderCard();
}

function updateSessionStats() {
  const accuracy = attempts ? Math.round((correctAttempts / attempts) * 100) : 0;
  sessionStats.textContent =
    `Attempts: ${attempts} | Correct: ${correctAttempts} | Incorrect: ${incorrectAttempts}` +
    ` | Accuracy: ${accuracy}% | Unique Seen: ${seenIds.size} | Missed Queue: ${missedIds.size}`;
}

function renderCard() {
  flashcard.classList.remove("flipped");

  if (!filteredCards.length) {
    if (reviewMissedOnly && missedIds.size === 0) {
      cardMeta.textContent = "Review mode is on. No missed cards left.";
      cardAttributes.textContent = "";
      cardFront.textContent = "Great work. You currently have no missed questions to review.";
      cardBack.textContent = "Turn off review mode or keep studying new cards.";
    } else {
      cardMeta.textContent = "No cards match these filters.";
      cardAttributes.textContent = "";
      cardFront.textContent = "Try changing exam, subject, card type, or difficulty.";
      cardBack.textContent = "You can also disable missed-only review mode.";
    }

    prevBtn.disabled = true;
    nextBtn.disabled = true;
    shuffleBtn.disabled = true;
    incorrectBtn.disabled = true;
    correctBtn.disabled = true;
    return;
  }

  const current = filteredCards[index];
  const result = cardResults.get(current.id) || "unanswered";
  const modeLabel = reviewMissedOnly ? " | Missed Review" : "";

  cardMeta.textContent = `${index + 1} / ${filteredCards.length} | ${current.exam} | ${
    current.subject
  } | ${current.type === "concept" ? "Concept" : "Sample Problem"} | Last: ${result}${modeLabel}`;

  cardAttributes.textContent = `Difficulty: ${formatDifficulty(current.difficulty)} | Question Type: ${
    current.questionType
  } | Focus: ${current.focus.join(", ")}`;

  cardFront.textContent = current.front;
  cardBack.textContent = current.back;

  prevBtn.disabled = false;
  nextBtn.disabled = false;
  shuffleBtn.disabled = false;
  incorrectBtn.disabled = false;
  correctBtn.disabled = false;
}

function applyFilters() {
  index = 0;
  refreshQuestionTypeOptions();
  buildFilteredCards();
}

function nextCard() {
  if (!filteredCards.length) return;
  index = (index + 1) % filteredCards.length;
  renderCard();
}

function prevCard() {
  if (!filteredCards.length) return;
  index = (index - 1 + filteredCards.length) % filteredCards.length;
  renderCard();
}

function shuffleCards() {
  if (!filteredCards.length) return;

  for (let i = filteredCards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
  }

  index = 0;
  renderCard();
}

function markCard(isCorrect) {
  if (!filteredCards.length) return;

  const current = filteredCards[index];

  attempts += 1;
  seenIds.add(current.id);

  if (isCorrect) {
    correctAttempts += 1;
    missedIds.delete(current.id);
    cardResults.set(current.id, "correct");
  } else {
    incorrectAttempts += 1;
    missedIds.add(current.id);
    cardResults.set(current.id, "missed");
  }

  updateSessionStats();

  if (reviewMissedOnly) {
    applyFilters();
    return;
  }

  nextCard();
}

function toggleReviewMissed() {
  reviewMissedOnly = !reviewMissedOnly;
  reviewMissedBtn.textContent = `Review Missed: ${reviewMissedOnly ? "On" : "Off"}`;
  applyFilters();
}

function resetTracking() {
  attempts = 0;
  correctAttempts = 0;
  incorrectAttempts = 0;
  seenIds.clear();
  missedIds.clear();
  cardResults.clear();

  reviewMissedOnly = false;
  reviewMissedBtn.textContent = "Review Missed: Off";

  updateSessionStats();
  applyFilters();
}

examFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);
subjectFilter.addEventListener("change", applyFilters);
difficultyFilter.addEventListener("change", applyFilters);
questionTypeFilter.addEventListener("change", applyFilters);
nextBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", prevCard);
shuffleBtn.addEventListener("click", shuffleCards);
flashcard.addEventListener("click", () => flashcard.classList.toggle("flipped"));
incorrectBtn.addEventListener("click", () => markCard(false));
correctBtn.addEventListener("click", () => markCard(true));
reviewMissedBtn.addEventListener("click", toggleReviewMissed);
resetTrackingBtn.addEventListener("click", resetTracking);

updateSessionStats();
refreshQuestionTypeOptions();
buildFilteredCards();
