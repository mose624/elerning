const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = Number(process.env.PORT || 8000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "backend-data");
const MAX_BODY_SIZE = 12 * 1024 * 1024;

const ADMIN_EMAIL = "moseisaac9@gmail.com";
const ADMIN_USERNAME = "ISAAC";
const ADMIN_PASSWORD = "mose23";
const ADMIN_SESSION_DURATION = 24 * 60 * 60 * 1000;

// ── PostgreSQL (assessment system) ──────────────────────────────────────────
let pgPool = null;

function getPool() {
  if (pgPool) return pgPool;
  if (!process.env.DATABASE_URL) return null;
  try {
    const { Pool } = require("pg");
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
    return pgPool;
  } catch {
    return null;
  }
}

async function initDb() {
  const pool = getPool();
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS assessments (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      grade TEXT NOT NULL,
      created_by TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D'))
    );
    CREATE TABLE IF NOT EXISTS assessment_responses (
      id SERIAL PRIMARY KEY,
      assessment_id INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
      student_answers JSONB NOT NULL DEFAULT '{}',
      score INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
      completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

const sessions = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

const stores = {
  "/api/projects": "projects.json",
  "/api/tuition": "tuition-registrations.json",
  "/api/quizzes": "quiz-attempts.json",
  "/api/payments": "payments.json",
  "/api/mpesa/stk-push": "mpesa-requests.json"
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonStore(fileName) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return [];
  }
}

async function appendJsonStore(fileName, item) {
  const current = await readJsonStore(fileName);
  const saved = {
    id: item.id || `${Date.now()}`,
    ...item,
    receivedAt: new Date().toISOString()
  };
  current.unshift(saved);
  await fs.writeFile(path.join(DATA_DIR, fileName), JSON.stringify(current, null, 2));
  return saved;
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function homeworkResponse(payload) {
  const grade = payload.grade || "CBC";
  const subject = payload.subject || "the subject";
  const question = payload.question || "the homework question";
  return [
    `For ${grade} ${subject}, start by restating the task in simple words.`,
    `Question: ${question}`,
    "Step 1: Identify the key terms and write what each one means.",
    "Step 2: List the facts, formula, passage details, or examples given in the question.",
    "Step 3: Solve one small part at a time and show your working.",
    "Step 4: Check your final answer against the question before submitting."
  ].join(" ");
}

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getSessionFromCookie(req) {
  const cookie = req.headers.cookie || "";
  const sessionMatch = cookie.match(/admin_session=([^;]+)/);
  return sessionMatch ? sessionMatch[1] : null;
}

function setSessionCookie(res, sessionId) {
  res.setHeader("Set-Cookie", `admin_session=${sessionId}; Path=/; HttpOnly; Max-Age=${ADMIN_SESSION_DURATION / 1000}; SameSite=Strict`);
}

function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", "admin_session=; Path=/; HttpOnly; Max-Age=0");
}

function isAdminAuthenticated(req) {
  const sessionId = getSessionFromCookie(req);
  if (!sessionId) return false;
  const session = sessions.get(sessionId);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}

async function handleApi(req, res, url) {
  if (req.method === "GET" && stores[url.pathname]) {
    sendJson(res, 200, await readJsonStore(stores[url.pathname]));
    return true;
  }

  if (req.method === "POST" && stores[url.pathname]) {
    const payload = JSON.parse((await readBody(req)) || "{}");
    const saved = await appendJsonStore(stores[url.pathname], payload);
    sendJson(res, 201, { ok: true, saved });
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/homework-helper") {
    const payload = JSON.parse((await readBody(req)) || "{}");
    const saved = await appendJsonStore("homework-helper.json", {
      ...payload,
      answer: homeworkResponse(payload)
    });
    sendJson(res, 200, { ok: true, answer: saved.answer, saved });
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/admin/login") {
    const payload = JSON.parse((await readBody(req)) || "{}");
    if (payload.email === ADMIN_EMAIL && payload.username === ADMIN_USERNAME && payload.password === ADMIN_PASSWORD) {
      const sessionId = generateSessionId();
      sessions.set(sessionId, { email: ADMIN_EMAIL, expiresAt: Date.now() + ADMIN_SESSION_DURATION });
      setSessionCookie(res, sessionId);
      sendJson(res, 200, { ok: true, message: "Login successful" });
    } else {
      sendJson(res, 401, { ok: false, error: "Invalid credentials" });
    }
    return true;
  }

  if (req.method === "POST" && url.pathname === "/api/admin/logout") {
    clearSessionCookie(res);
    const sessionId = getSessionFromCookie(req);
    if (sessionId) sessions.delete(sessionId);
    sendJson(res, 200, { ok: true, message: "Logout successful" });
    return true;
  }

  if (req.method === "GET" && url.pathname === "/api/admin/check-session") {
    const isAuth = isAdminAuthenticated(req);
    sendJson(res, 200, { authenticated: isAuth });
    return true;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/resources")) {
    const searchParams = new URLSearchParams(url.search);
    const grade = searchParams.get("grade");
    const subject = searchParams.get("subject");
    const type = searchParams.get("type");

    const resources = await readJsonStore("projects.json");
    let filtered = resources;

    if (grade) filtered = filtered.filter(r => r.grade === grade);
    if (subject) filtered = filtered.filter(r => r.subject === subject);
    if (type) filtered = filtered.filter(r => r.type === type);

    sendJson(res, 200, filtered);
    return true;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/grades")) {
    const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6",
                   "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
    sendJson(res, 200, { grades });
    return true;
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/subjects")) {
    const searchParams = new URLSearchParams(url.search);
    const grade = searchParams.get("grade") || "Grade 1";

    const subjects = {
      "Grade 1": ["Mathematics", "English", "Science", "Social Studies"],
      "Grade 2": ["Mathematics", "English", "Science", "Social Studies"],
      "Grade 3": ["Mathematics", "English", "Science", "Social Studies"],
      "Grade 4": ["Mathematics", "English", "Science", "Social Studies"],
      "Grade 5": ["Mathematics", "English", "Science", "Social Studies"],
      "Grade 6": ["Mathematics", "English", "Science", "Social Studies"],
      "Grade 7": ["Mathematics", "English", "Integrated Science", "Social Studies"],
      "Grade 8": ["Mathematics", "English", "Integrated Science", "Social Studies"],
      "Grade 9": ["Mathematics", "English", "Integrated Science", "Social Studies"],
      "Grade 10": ["Mathematics", "English", "Biology", "Chemistry", "Physics"],
      "Grade 11": ["Mathematics", "English", "Biology", "Chemistry", "Physics"],
      "Grade 12": ["Mathematics", "English", "Biology", "Chemistry", "Physics"]
    };

    sendJson(res, 200, { subjects: subjects[grade] || [] });
    return true;
  }

  // ── Assessment API ─────────────────────────────────────────────────────────

  // POST /api/admin/assessments — create assessment (admin only)
  if (req.method === "POST" && url.pathname === "/api/admin/assessments") {
    if (!isAdminAuthenticated(req)) {
      sendJson(res, 401, { ok: false, error: "Unauthorized" });
      return true;
    }
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const payload = JSON.parse((await readBody(req)) || "{}");
    const { title, subject, grade } = payload;
    if (!title || !subject || !grade) {
      sendJson(res, 400, { ok: false, error: "title, subject, and grade are required" });
      return true;
    }
    const result = await pool.query(
      "INSERT INTO assessments (title, subject, grade, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [title.trim(), subject.trim(), grade.trim(), "admin"]
    );
    sendJson(res, 201, { ok: true, assessment: result.rows[0] });
    return true;
  }

  // POST /api/admin/assessments/:id/questions — add questions (admin only)
  const addQuestionsMatch = req.method === "POST" && url.pathname.match(/^\/api\/admin\/assessments\/(\d+)\/questions$/);
  if (addQuestionsMatch) {
    if (!isAdminAuthenticated(req)) {
      sendJson(res, 401, { ok: false, error: "Unauthorized" });
      return true;
    }
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const assessmentId = parseInt(addQuestionsMatch[1], 10);
    const payload = JSON.parse((await readBody(req)) || "{}");
    // payload.questions: array of { question_text, option_a, option_b, option_c, option_d, correct_answer }
    const questions = Array.isArray(payload.questions) ? payload.questions : [payload];
    if (questions.length === 0) {
      sendJson(res, 400, { ok: false, error: "No questions provided" });
      return true;
    }
    const check = await pool.query("SELECT id FROM assessments WHERE id = $1", [assessmentId]);
    if (check.rows.length === 0) {
      sendJson(res, 404, { ok: false, error: "Assessment not found" });
      return true;
    }
    const inserted = [];
    for (const q of questions) {
      const { question_text, option_a, option_b, option_c, option_d, correct_answer } = q;
      if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) continue;
      const ans = String(correct_answer).toUpperCase();
      if (!["A","B","C","D"].includes(ans)) continue;
      const r = await pool.query(
        "INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [assessmentId, question_text, option_a, option_b, option_c, option_d, ans]
      );
      inserted.push(r.rows[0]);
    }
    sendJson(res, 201, { ok: true, inserted: inserted.length, questions: inserted });
    return true;
  }

  // GET /api/assessments — list all assessments with question count (public)
  if (req.method === "GET" && url.pathname === "/api/assessments") {
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const searchParams = new URLSearchParams(url.search);
    const grade = searchParams.get("grade");
    const subject = searchParams.get("subject");
    let query = `
      SELECT a.*, COUNT(q.id)::int AS question_count
      FROM assessments a
      LEFT JOIN questions q ON q.assessment_id = a.id
    `;
    const params = [];
    const conditions = [];
    if (grade) { params.push(grade); conditions.push("a.grade = $" + params.length); }
    if (subject) { params.push(subject); conditions.push("a.subject = $" + params.length); }
    if (conditions.length) query += " WHERE " + conditions.join(" AND ");
    query += " GROUP BY a.id ORDER BY a.created_at DESC";
    const result = await pool.query(query, params);
    sendJson(res, 200, { ok: true, assessments: result.rows });
    return true;
  }

  // GET /api/assessments/:id — get assessment with questions (correct_answer hidden for students)
  const getAssessmentMatch = req.method === "GET" && url.pathname.match(/^\/api\/assessments\/(\d+)$/);
  if (getAssessmentMatch) {
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const assessmentId = parseInt(getAssessmentMatch[1], 10);
    const aResult = await pool.query("SELECT * FROM assessments WHERE id = $1", [assessmentId]);
    if (aResult.rows.length === 0) {
      sendJson(res, 404, { ok: false, error: "Assessment not found" });
      return true;
    }
    const qResult = await pool.query(
      "SELECT id, question_text, option_a, option_b, option_c, option_d FROM questions WHERE assessment_id = $1 ORDER BY id",
      [assessmentId]
    );
    sendJson(res, 200, { ok: true, assessment: aResult.rows[0], questions: qResult.rows });
    return true;
  }

  // POST /api/assessments/:id/submit — submit answers, auto-grade, return score (public)
  const submitMatch = req.method === "POST" && url.pathname.match(/^\/api\/assessments\/(\d+)\/submit$/);
  if (submitMatch) {
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const assessmentId = parseInt(submitMatch[1], 10);
    const payload = JSON.parse((await readBody(req)) || "{}");
    // payload.answers: { "question_id": "A"|"B"|"C"|"D", ... }
    const studentAnswers = payload.answers || {};
    const qResult = await pool.query(
      "SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer FROM questions WHERE assessment_id = $1 ORDER BY id",
      [assessmentId]
    );
    if (qResult.rows.length === 0) {
      sendJson(res, 404, { ok: false, error: "Assessment has no questions" });
      return true;
    }
    const total = qResult.rows.length;
    let score = 0;
    const breakdown = qResult.rows.map((q) => {
      const given = String(studentAnswers[q.id] || "").toUpperCase();
      const correct = q.correct_answer;
      const isCorrect = given === correct;
      if (isCorrect) score++;
      return {
        question_id: q.id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        your_answer: given || null,
        correct_answer: correct,
        is_correct: isCorrect
      };
    });
    const percentage = total > 0 ? Math.round((score / total) * 10000) / 100 : 0;
    const rResult = await pool.query(
      "INSERT INTO assessment_responses (assessment_id, student_answers, score, total, percentage) VALUES ($1,$2,$3,$4,$5) RETURNING id, completed_at",
      [assessmentId, JSON.stringify(studentAnswers), score, total, percentage]
    );
    sendJson(res, 200, {
      ok: true,
      response_id: rResult.rows[0].id,
      score,
      total,
      percentage,
      completed_at: rResult.rows[0].completed_at,
      breakdown
    });
    return true;
  }

  // GET /api/assessments/:id/results — view aggregate results (public)
  const resultsMatch = req.method === "GET" && url.pathname.match(/^\/api\/assessments\/(\d+)\/results$/);
  if (resultsMatch) {
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const assessmentId = parseInt(resultsMatch[1], 10);
    const aResult = await pool.query("SELECT * FROM assessments WHERE id = $1", [assessmentId]);
    if (aResult.rows.length === 0) {
      sendJson(res, 404, { ok: false, error: "Assessment not found" });
      return true;
    }
    const rResult = await pool.query(
      "SELECT id, score, total, percentage, completed_at FROM assessment_responses WHERE assessment_id = $1 ORDER BY completed_at DESC",
      [assessmentId]
    );
    const responses = rResult.rows;
    const avgPct = responses.length
      ? Math.round(responses.reduce((s, r) => s + Number(r.percentage), 0) / responses.length * 100) / 100
      : 0;
    sendJson(res, 200, {
      ok: true,
      assessment: aResult.rows[0],
      total_attempts: responses.length,
      average_percentage: avgPct,
      responses
    });
    return true;
  }

  // GET /api/admin/assessments/:id/stats — detailed stats (admin only)
  const adminStatsMatch = req.method === "GET" && url.pathname.match(/^\/api\/admin\/assessments\/(\d+)\/stats$/);
  if (adminStatsMatch) {
    if (!isAdminAuthenticated(req)) {
      sendJson(res, 401, { ok: false, error: "Unauthorized" });
      return true;
    }
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const assessmentId = parseInt(adminStatsMatch[1], 10);
    const aResult = await pool.query("SELECT * FROM assessments WHERE id = $1", [assessmentId]);
    if (aResult.rows.length === 0) {
      sendJson(res, 404, { ok: false, error: "Assessment not found" });
      return true;
    }
    const rResult = await pool.query(
      "SELECT id, score, total, percentage, completed_at FROM assessment_responses WHERE assessment_id = $1 ORDER BY completed_at DESC",
      [assessmentId]
    );
    const responses = rResult.rows;
    const qResult = await pool.query(
      "SELECT id, question_text FROM questions WHERE assessment_id = $1 ORDER BY id",
      [assessmentId]
    );
    const avgPct = responses.length
      ? Math.round(responses.reduce((s, r) => s + Number(r.percentage), 0) / responses.length * 100) / 100
      : 0;
    const highest = responses.length ? Math.max(...responses.map(r => Number(r.percentage))) : 0;
    const lowest = responses.length ? Math.min(...responses.map(r => Number(r.percentage))) : 0;
    sendJson(res, 200, {
      ok: true,
      assessment: aResult.rows[0],
      question_count: qResult.rows.length,
      total_attempts: responses.length,
      average_percentage: avgPct,
      highest_percentage: highest,
      lowest_percentage: lowest,
      responses
    });
    return true;
  }

  // GET /api/admin/assessments — list all assessments for admin
  if (req.method === "GET" && url.pathname === "/api/admin/assessments") {
    if (!isAdminAuthenticated(req)) {
      sendJson(res, 401, { ok: false, error: "Unauthorized" });
      return true;
    }
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const result = await pool.query(`
      SELECT a.*, COUNT(DISTINCT q.id)::int AS question_count, COUNT(DISTINCT r.id)::int AS attempt_count
      FROM assessments a
      LEFT JOIN questions q ON q.assessment_id = a.id
      LEFT JOIN assessment_responses r ON r.assessment_id = a.id
      GROUP BY a.id ORDER BY a.created_at DESC
    `);
    sendJson(res, 200, { ok: true, assessments: result.rows });
    return true;
  }

  // DELETE /api/admin/assessments/:id — delete assessment (admin only)
  const deleteAssessmentMatch = req.method === "DELETE" && url.pathname.match(/^\/api\/admin\/assessments\/(\d+)$/);
  if (deleteAssessmentMatch) {
    if (!isAdminAuthenticated(req)) {
      sendJson(res, 401, { ok: false, error: "Unauthorized" });
      return true;
    }
    const pool = getPool();
    if (!pool) { sendJson(res, 503, { ok: false, error: "Database not available" }); return true; }
    const assessmentId = parseInt(deleteAssessmentMatch[1], 10);
    await pool.query("DELETE FROM assessments WHERE id = $1", [assessmentId]);
    sendJson(res, 200, { ok: true, message: "Assessment deleted" });
    return true;
  }

  return false;
}

async function serveStatic(req, res, url) {
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.resolve(ROOT, `.${requestedPath}`);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    const target = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const data = await fs.readFile(target);
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  try {
    if (await handleApi(req, res, url)) return;
    await serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message || "Server error." });
  }
});

initDb().catch((err) => console.error("DB init error:", err.message));

server.listen(PORT, "0.0.0.0", () => {
  console.log(`CBE website backend running at http://0.0.0.0:${PORT}/`);
});
