// ============================================
// HNU Results Portal — script.js
// ============================================

const VALID_USERNAME = "931240309";
const VALID_PASSWORD = "30604160105833";
const STUDENT_NAME = "محمد سيد محمود محمد";

const RESULTS = [
  { code: "COM 212", subject: "Artificial Intelligence", hours: 3, marks: "83 / 100", points: 8.7, grade: "B+", comment: "—" },
  { code: "COM 207", subject: "Data Structures", hours: 3, marks: "73 / 100", points: 7.7, grade: "B", comment: "—" },
  { code: "MTH 204", subject: "Linear Algebra", hours: 3, marks: "81 / 100", points: 8.5, grade: "B+", comment: "—" },
  { code: "COM 209", subject: "Internet Technology", hours: 3, marks: "85 / 100", points: 8.9, grade: "B+", comment: "—" },
  { code: "COM 210", subject: "Advanced Programming", hours: 3, marks: "83 / 100", points: 8.7, grade: "B+", comment: "—" },
  { code: "COM 206", subject: "Systems Analysis and Design", hours: 3, marks: "93 / 100", points: 9.6, grade: "A", comment: "—" }
];

const SESSION_KEY = "hnu_session_active";

// ---- DOM refs ----
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const togglePass = document.getElementById("togglePass");
const resultsBody = document.getElementById("resultsBody");
const noResults = document.getElementById("noResults");
const subjectSearch = document.getElementById("subjectSearch");
const userMenuBtn = document.getElementById("userMenuBtn");
const userMenu = document.getElementById("userMenu");
const logoutBtn = document.getElementById("logoutBtn");
const printBtn = document.getElementById("printBtn");
const pdfBtn = document.getElementById("pdfBtn");
const userFullName = document.getElementById("userFullName");
const chipId = document.getElementById("chipId");

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  userFullName.textContent = STUDENT_NAME;
  chipId.textContent = VALID_USERNAME;
  renderTable(RESULTS);

  if (localStorage.getItem(SESSION_KEY) === "true") {
    showDashboard();
  } else {
    showLogin();
  }
});

// ---- Login ----
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const u = usernameInput.value.trim();
  const p = passwordInput.value.trim();

  if (u === VALID_USERNAME && p === VALID_PASSWORD) {
    loginError.hidden = true;
    localStorage.setItem(SESSION_KEY, "true");
    showDashboard();
  } else {
    loginError.hidden = false;
    passwordInput.value = "";
  }
});

togglePass.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
});

// ---- Logout ----
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  loginForm.reset();
  loginError.hidden = true;
  userMenu.hidden = true;
  showLogin();
});

// ---- User menu toggle ----
userMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  userMenu.hidden = !userMenu.hidden;
});
document.addEventListener("click", (e) => {
  if (!userMenu.hidden && !userMenu.contains(e.target) && e.target !== userMenuBtn) {
    userMenu.hidden = true;
  }
});

// ---- Page switching ----
function showLogin() {
  loginPage.hidden = false;
  dashboardPage.hidden = true;
}
function showDashboard() {
  loginPage.hidden = true;
  dashboardPage.hidden = false;
}

// ---- Render table ----
function renderTable(data) {
  resultsBody.innerHTML = "";

  if (data.length === 0) {
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  data.forEach((row) => {
    const tr = document.createElement("tr");

    const gradeClass = row.grade === "A" ? "grade-A" : "grade-Bplus";

    tr.innerHTML = `
      <td>
        <span class="subject-name">${row.subject}</span>
        <span class="subject-code">${row.code}</span>
      </td>
      <td>${row.hours}</td>
      <td>${row.marks}</td>
      <td>${row.points}</td>
      <td><span class="grade-badge ${gradeClass}">${row.grade}</span></td>
      <td class="comment-cell">${row.comment}</td>
    `;
    resultsBody.appendChild(tr);
  });
}

// ---- Search ----
subjectSearch.addEventListener("input", () => {
  const q = subjectSearch.value.trim().toLowerCase();
  const filtered = RESULTS.filter(
    (r) => r.subject.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)
  );
  renderTable(filtered);
});

// ---- Print ----
printBtn.addEventListener("click", () => {
  window.print();
});

// ---- Download PDF (uses print-to-PDF via browser print dialog) ----
pdfBtn.addEventListener("click", () => {
  window.print();
});
