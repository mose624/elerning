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

server.listen(PORT, "127.0.0.1", () => {
  console.log(`CBE website backend running at http://127.0.0.1:${PORT}/`);
});
