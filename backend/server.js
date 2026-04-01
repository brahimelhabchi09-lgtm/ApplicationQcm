/**
 * QCM Quiz REST API
 * Express server that serves quiz questions organized by level.
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Quiz Questions Database ────────────────────────────────────────────────
 const questions = [
  // ── Level 1 (Basics) ────────────────────────────────────────────────
  {
    id: 1,
    question: "What is Vue.js?",
    choices: ["A JavaScript Framework", "A CSS Library", "A Database", "A Server Language"],
    correctAnswer: "A JavaScript Framework",
    level: 1,
  },
  {
    id: 2,
    question: "Which directive is used for two-way data binding?",
    choices: ["v-bind", "v-model", "v-on", "v-if"],
    correctAnswer: "v-model",
    level: 1,
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HighText Machine Language", "None", "Hyper Trainer ML"],
    correctAnswer: "HyperText Markup Language",
    level: 1,
  },
  {
    id: 4,
    question: "Which CSS property changes text color?",
    choices: ["font-color", "color", "text-style", "bg-color"],
    correctAnswer: "color",
    level: 1,
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    choices: ["Creative Style Sheets", "Cascading Style Sheets", "Color Sheets", "Computer Style"],
    correctAnswer: "Cascading Style Sheets",
    level: 1,
  },
  {
    id: 6,
    question: "Which directive is used for condition rendering?",
    choices: ["v-for", "v-if", "v-bind", "v-on"],
    correctAnswer: "v-if",
    level: 1,
  },
  {
    id: 7,
    question: "Which directive is used for looping?",
    choices: ["v-loop", "v-for", "v-each", "v-map"],
    correctAnswer: "v-for",
    level: 1,
  },

  // ── Level 2 (Intermediate) ──────────────────────────────────────────
  {
    id: 8,
    question: "What is the Composition API?",
    choices: [
      "A way to write components using setup()",
      "A CSS system",
      "A router",
      "A database layer",
    ],
    correctAnswer: "A way to write components using setup()",
    level: 2,
  },
  {
    id: 9,
    question: "Which function defines a Pinia store?",
    choices: ["createStore", "defineStore", "useStore", "makeStore"],
    correctAnswer: "defineStore",
    level: 2,
  },
  {
    id: 10,
    question: "What is TypeScript?",
    choices: [
      "A superset of JavaScript",
      "A framework",
      "A backend language",
      "A database",
    ],
    correctAnswer: "A superset of JavaScript",
    level: 2,
  },
  {
    id: 11,
    question: "Which HTTP method creates data?",
    choices: ["GET", "POST", "DELETE", "PATCH"],
    correctAnswer: "POST",
    level: 2,
  },
  {
    id: 12,
    question: "What does ref() return?",
    choices: [
      "A DOM element",
      "Reactive object with .value",
      "A function",
      "Nothing",
    ],
    correctAnswer: "Reactive object with .value",
    level: 2,
  },
  {
    id: 13,
    question: "What is a component in Vue?",
    choices: [
      "Reusable UI block",
      "Database model",
      "CSS file",
      "API endpoint",
    ],
    correctAnswer: "Reusable UI block",
    level: 2,
  },
  {
    id: 14,
    question: "What does v-bind do?",
    choices: [
      "Bind attributes dynamically",
      "Loop elements",
      "Handle clicks",
      "Create props",
    ],
    correctAnswer: "Bind attributes dynamically",
    level: 2,
  },

  // ── Level 3 (Advanced Concepts) ─────────────────────────────────────
  {
    id: 15,
    question: "ref vs reactive?",
    choices: [
      "ref for primitives, reactive for objects",
      "Same",
      "Opposite",
      "Only arrays",
    ],
    correctAnswer: "ref for primitives, reactive for objects",
    level: 3,
  },
  {
    id: 16,
    question: "Lifecycle hook for mounted?",
    choices: ["onMounted", "onInit", "onStart", "afterMount"],
    correctAnswer: "onMounted",
    level: 3,
  },
  {
    id: 17,
    question: "Tree Shaking?",
    choices: [
      "Remove unused code",
      "Optimize images",
      "Compress CSS",
      "Routing",
    ],
    correctAnswer: "Remove unused code",
    level: 3,
  },
  {
    id: 18,
    question: "provide/inject?",
    choices: [
      "Dependency sharing",
      "Routing",
      "Styling",
      "Events",
    ],
    correctAnswer: "Dependency sharing",
    level: 3,
  },
  {
    id: 19,
    question: "<RouterView> renders?",
    choices: [
      "Matched component",
      "All routes",
      "Navbar",
      "Root app",
    ],
    correctAnswer: "Matched component",
    level: 3,
  },
  {
    id: 20,
    question: "What is a watcher?",
    choices: [
      "React to data changes",
      "Render UI",
      "Route handler",
      "Event emitter",
    ],
    correctAnswer: "React to data changes",
    level: 3,
  },
  {
    id: 21,
    question: "nextTick()?",
    choices: [
      "Wait DOM update",
      "Reload app",
      "Delay API",
      "Block thread",
    ],
    correctAnswer: "Wait DOM update",
    level: 3,
  },

  // ── Level 4 (Deep Vue) ──────────────────────────────────────────────
  {
    id: 22,
    question: "Computed property?",
    choices: [
      "Cached reactive value",
      "Method",
      "Watcher",
      "Hook",
    ],
    correctAnswer: "Cached reactive value",
    level: 4,
  },
  {
    id: 23,
    question: "watch() purpose?",
    choices: [
      "React to changes",
      "Render UI",
      "Create props",
      "Routing",
    ],
    correctAnswer: "React to changes",
    level: 4,
  },
  {
    id: 24,
    question: "Slot?",
    choices: [
      "Content placeholder",
      "Hook",
      "State",
      "Route",
    ],
    correctAnswer: "Content placeholder",
    level: 4,
  },
  {
    id: 25,
    question: "v-if vs v-show?",
    choices: [
      "Render vs visibility",
      "Same",
      "Opposite",
      "CSS only",
    ],
    correctAnswer: "Render vs visibility",
    level: 4,
  },
  {
    id: 26,
    question: "Key in v-for?",
    choices: [
      "Track identity",
      "Style",
      "Event",
      "API",
    ],
    correctAnswer: "Track identity",
    level: 4,
  },
  {
    id: 27,
    question: "Teleport?",
    choices: [
      "Render outside DOM tree",
      "Routing",
      "Animation",
      "Store",
    ],
    correctAnswer: "Render outside DOM tree",
    level: 4,
  },
  {
    id: 28,
    question: "Fragments?",
    choices: [
      "Multiple root elements",
      "CSS feature",
      "Router",
      "State",
    ],
    correctAnswer: "Multiple root elements",
    level: 4,
  },

  // ── Level 5 (Expert) ────────────────────────────────────────────────
  {
    id: 29,
    question: "defineProps()?",
    choices: [
      "Declare props",
      "State",
      "Watcher",
      "Route",
    ],
    correctAnswer: "Declare props",
    level: 5,
  },
  {
    id: 30,
    question: "defineEmits()?",
    choices: [
      "Declare events",
      "API calls",
      "Hooks",
      "Props",
    ],
    correctAnswer: "Declare events",
    level: 5,
  },
  {
    id: 31,
    question: "Composable?",
    choices: [
      "Reusable logic function",
      "Component",
      "Plugin",
      "Router",
    ],
    correctAnswer: "Reusable logic function",
    level: 5,
  },
  {
    id: 32,
    question: "shallowRef()?",
    choices: [
      "Shallow reactivity",
      "Deep reactivity",
      "Same as ref",
      "Array only",
    ],
    correctAnswer: "Shallow reactivity",
    level: 5,
  },
  {
    id: 33,
    question: "Suspense?",
    choices: [
      "Async fallback handling",
      "Routing",
      "Store",
      "CSS",
    ],
    correctAnswer: "Async fallback handling",
    level: 5,
  },
  {
    id: 34,
    question: "SSR meaning?",
    choices: [
      "Server-side rendering",
      "Static routing",
      "State system",
      "Script rendering",
    ],
    correctAnswer: "Server-side rendering",
    level: 5,
  },
  {
    id: 35,
    question: "Hydration?",
    choices: [
      "Attach JS to SSR HTML",
      "Reload page",
      "CSS load",
      "API fetch",
    ],
    correctAnswer: "Attach JS to SSR HTML",
    level: 5,
  },
];

// ─── Routes ─────────────────────────────────────────────────────────────────

/** GET /api/health — Health check */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "QCM API is running 🚀" });
});

/** GET /api/questions — All questions */
app.get("/api/questions", (_req, res) => {
  res.json(questions);
});

/** GET /api/questions?level=1 — Questions filtered by level */
app.get("/api/questions/level/:level", (req, res) => {
  const level = parseInt(req.params.level, 10);

  if (isNaN(level) || level < 1 || level > 5) {
    return res.status(400).json({ error: "Level must be 1, 2, 3, 4 or 5" });
  }

  const filtered = questions.filter((q) => q.level === level);

  // Shuffle choices for each question to randomize order
  const shuffled = filtered.map((q) => ({
    ...q,
    choices: [...q.choices].sort(() => Math.random() - 0.5),
  }));

  res.json(shuffled);
});

/** GET /api/questions/:id — Single question */
app.get("/api/questions/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const question = questions.find((q) => q.id === id);

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  res.json(question);
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  QCM API running on http://localhost:${PORT}`);
  console.log(`📋  Available endpoints:`);
  console.log(`    GET /api/health`);
  console.log(`    GET /api/questions`);
  console.log(`    GET /api/questions/level/:level  (1 | 2 | 3| 4| 5)`);
  console.log(`    GET /api/questions/:id`);
});
