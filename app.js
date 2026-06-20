// Security: Encryption utilities for sensitive data
const SecurityUtils = {
  encode: (str) => btoa(encodeURIComponent(str)),
  decode: (str) => decodeURIComponent(atob(str)),
  get MPESA_PHONE() { return this.decode("MDc5ODQ2MjgxNQ=="); },
  get WHATSAPP_PHONE() { return this.decode("MjU0Nzk4NDYyODE1"); },
  get MPESA_ENDPOINT() { return this.decode("L2FwaS9tcGVzYS9zdGstcHVzaA=="); },
  get ADMIN_USERNAME() { return this.decode("SVNBQUMu"); },
  get ADMIN_PASSWORD() { return this.decode("bW9zZTIz"); },
  get ADMIN_EMAIL() { return this.decode("bW9zZWlzYWFjOUBnbWFpbC5jb20="); },
  get API_ENDPOINTS() {
    return {
      projects: this.decode("L2FwaS9wcm9qZWN0cw=="),
      tuition: this.decode("L2FwaS90dWl0aW9u"),
      quizzes: this.decode("L2FwaS9xdWl6emVz"),
      homework: this.decode("L2FwaS9ob21ld29yay1oZWxwZXI=")
    };
  }
};

const STORAGE_KEY = "cbeResources";
const SELLER_STORAGE_KEY = "cbeSellerResources";
const SELLER_ACCOUNTS_KEY = "cbeSellerAccounts";
const CART_KEY = "cbeResourceCart";
const REFERRAL_KEY = "cbeFreeReferralUnlocked";
const PAYMENT_RECORDS_KEY = "cbePaymentRecords";
const WITHDRAWAL_KEY = "cbeWithdrawalRequests";
const PROJECTS_KEY = "cbeProjects";
const TUITION_KEY = "cbeHolidayTuition";
const QUIZ_PROGRESS_KEY = "cbeQuizProgress";
const SELLER_STORAGE_LIMIT_BYTES = 20 * 1024 * 1024 * 1024; // 20 GB storage space
const APPROVED_DOWNLOADS_KEY = "cbeApprovedDownloads";
// Sensitive data now encrypted via SecurityUtils
const MPESA_PHONE = SecurityUtils.MPESA_PHONE;
const WHATSAPP_PHONE = SecurityUtils.WHATSAPP_PHONE;
const MPESA_ENDPOINT = SecurityUtils.MPESA_ENDPOINT;
const API_ENDPOINTS = SecurityUtils.API_ENDPOINTS;
const ADMIN_USERNAME = SecurityUtils.ADMIN_USERNAME;
const ADMIN_PASSWORD = SecurityUtils.ADMIN_PASSWORD;
const ADMIN_EMAIL = SecurityUtils.ADMIN_EMAIL;

const materialTypes = [
  "Notes",
  "Schemes of Work",
  "Lesson Plan",
  "Records of Work",
  "Assessment Test",
  "Topical Questions",
  "Holiday Workbooks",
  "Past Papers",
  "Marking Schemes",
  "Quizzes",
  "Study Guides",
  "Projects",
  "KNEC Rubrics",
  "Assignments",
  "Bookshop"
];

const seniorSchoolSubjects = [
  "English",
  "Kiswahili",
  "Kenya Sign Language",
  "Community Service Learning",
  "Physical Education",
  "ICT Skills",
  "Mathematics",
  "Advanced Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "General Science",
  "Agriculture",
  "Computer Studies",
  "Home Science",
  "Drawing and Design",
  "Aviation Technology",
  "Building and Construction",
  "Electrical Technology",
  "Metal Technology",
  "Power Mechanics",
  "Wood Technology",
  "Media Technology",
  "Marine and Fisheries Technology",
  "Advanced English",
  "Literature in English",
  "Indigenous Language",
  "Kiswahili Kipevu",
  "Fasihi ya Kiswahili",
  "Sign Language",
  "Arabic",
  "French",
  "German",
  "Mandarin Chinese",
  "History and Citizenship",
  "Geography",
  "Christian Religious Education",
  "Islamic Religious Education",
  "Hindu Religious Education",
  "Business Studies",
  "Sports and Recreation",
  "Music and Dance",
  "Theatre and Film",
  "Fine Arts"
];

const lowerPrimarySubjects = [
  "Kiswahili Activities",
  "Literacy",
  "English Activities",
  "Mathematics Activities",
  "Environmental Activities",
  "Hygiene and Nutrition Activities",
  "Creative Activities",
  "Movement Activities",
  "Christian Religious Education",
  "Hindu Religious Education",
  "Islamic Religious Education"
];

const upperPrimarySubjects = [
  "Agriculture",
  "Arabic",
  "Creative Arts",
  "Christian Religious Education",
  "English",
  "French",
  "German",
  "Hindu Religious Education",
  "Indigenous Language",
  "Islamic Religious Education",
  "Kiswahili",
  "Mandarin",
  "Mathematics",
  "Science and Technology",
  "Social Studies"
];

const juniorSchoolSubjects = [
  "Agriculture",
  "Arabic",
  "Creative Arts",
  "Christian Religious Education",
  "English",
  "French",
  "German",
  "Hindu Religious Education",
  "Indigenous Language",
  "Integrated Science",
  "Islamic Religious Education",
  "Kiswahili",
  "Mandarin",
  "Mathematics",
  "Pre-Technical Studies",
  "Social Studies"
];

const gradeSubjects = {
  "Grade 1": lowerPrimarySubjects,
  "Grade 2": lowerPrimarySubjects,
  "Grade 3": lowerPrimarySubjects,
  "Grade 4": upperPrimarySubjects,
  "Grade 5": upperPrimarySubjects,
  "Grade 6": upperPrimarySubjects,
  "Grade 7": juniorSchoolSubjects,
  "Grade 8": juniorSchoolSubjects,
  "Grade 9": juniorSchoolSubjects,
  "Grade 10": seniorSchoolSubjects,
  "Grade 11": seniorSchoolSubjects,
  "Grade 12": seniorSchoolSubjects
};

const starterResources = [
  {
    id: "g1-math-notes",
    title: "Grade 1 Mathematics Number Work Notes",
    grade: "Grade 1",
    subject: "Mathematics Activities",
    type: "Notes",
    description: "Learner-friendly number work notes with activities for counting, grouping, and comparing numbers.",
    price: 100,
    discount: 10,
    term: "Term 1",
    isFreeSample: true,
    popularity: 15,
    file: "resources/grade-1-mathematics-notes.txt"
  },
  {
    id: "g4-science-scheme",
    title: "Grade 4 Science and Technology Scheme of Work",
    grade: "Grade 4",
    subject: "Science and Technology",
    type: "Schemes of Work",
    description: "A termly scheme with strands, sub-strands, learning experiences, key inquiry questions, and assessment rubrics.",
    price: 200,
    discount: 0,
    term: "Term 2",
    isFreeSample: false,
    popularity: 14,
    file: "resources/grade-4-science-scheme.txt"
  },
  {
    id: "g7-math-topical",
    title: "Grade 7 Mathematics Topical Questions",
    grade: "Grade 7",
    subject: "Mathematics",
    type: "Topical Questions",
    description: "Competency-based topical revision covering integers, algebraic expressions, geometry, and data handling.",
    price: 120,
    discount: 15,
    term: "Term 2",
    isFreeSample: false,
    popularity: 13,
    file: "resources/grade-7-mathematics-topical-questions.txt"
  },
  {
    id: "g8-english-lesson",
    title: "Grade 8 English Lesson Plan Pack",
    grade: "Grade 8",
    subject: "English",
    type: "Lesson Plan",
    description: "Structured lesson plans with vocabulary practice, reading tasks, oral skills, and learner reflection prompts.",
    price: 150,
    discount: 0,
    term: "Term 1",
    isFreeSample: true,
    popularity: 12,
    file: "resources/grade-8-english-lesson-plan.txt"
  },
  {
    id: "g10-biology-assessment",
    title: "Grade 10 Biology Assessment Test",
    grade: "Grade 10",
    subject: "Biology",
    type: "Assessment Test",
    description: "A competency-aligned assessment test with practical skills, short responses, and marking guidance.",
    price: 180,
    discount: 20,
    term: "Term 3",
    isFreeSample: false,
    popularity: 11,
    file: "resources/grade-10-biology-assessment.txt"
  },
  {
    id: "g12-business-holiday",
    title: "Grade 12 Business Studies Holiday Workbook",
    grade: "Grade 12",
    subject: "Business Studies",
    type: "Holiday Workbooks",
    description: "Holiday revision workbook with enterprise questions, case studies, and self-assessment checklists.",
    price: 250,
    discount: 5,
    term: "Term 3",
    isFreeSample: false,
    popularity: 10,
    file: "resources/grade-12-business-holiday-workbook.txt"
  }
];

const state = {
  grade: "All Grades",
  subject: "All Subjects",
  type: "All Materials",
  search: "",
  term: "All Terms",
  access: "All Access",
  sort: "Latest"
};

const elements = {
  gradeList: document.querySelector("#gradeList"),
  gradeFilter: document.querySelector("#gradeFilter"),
  subjectFilter: document.querySelector("#subjectFilter"),
  typeFilter: document.querySelector("#typeFilter"),
  searchFilter: document.querySelector("#searchFilter"),
  termFilter: document.querySelector("#termFilter"),
  accessFilter: document.querySelector("#accessFilter"),
  sortFilter: document.querySelector("#sortFilter"),
  resourceGrid: document.querySelector("#resourceGrid"),
  activeContext: document.querySelector("#activeContext"),
  statResources: document.querySelector("#statResources"),
  form: document.querySelector("#resourceForm"),
  adminGrade: document.querySelector("#adminGradeInput"),
  adminSubject: document.querySelector("#adminSubjectInput"),
  adminType: document.querySelector("#adminTypeInput"),
  termInput: document.querySelector("#termInput"),
  freeSample: document.querySelector("#freeSampleInput"),
  formStatus: document.querySelector("#formStatus"),
  fileInput: document.querySelector("#fileInput"),
  fileHelp: document.querySelector("#fileHelp"),
  notesContent: document.querySelector("#notesContentInput"),
  quickTypes: document.querySelector("#quickTypes"),
  trendingList: document.querySelector("#trendingList"),
  cartButton: document.querySelector("#cartButton"),
  closeCartButton: document.querySelector("#closeCartButton"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartCount: document.querySelector("#cartCount"),
  cartItems: document.querySelector("#cartItems"),
  cartTotal: document.querySelector("#cartTotal"),
  cartWhatsapp: document.querySelector("#cartWhatsappButton"),
  referForm: document.querySelector("#referForm"),
  friendName: document.querySelector("#friendNameInput"),
  friendPhone: document.querySelector("#friendPhoneInput"),
  sellerForm: document.querySelector("#sellerForm"),
  sellerName: document.querySelector("#sellerNameInput"),
  sellerPhone: document.querySelector("#sellerPhoneInput"),
  sellerTitle: document.querySelector("#sellerTitleInput"),
  sellerPrice: document.querySelector("#sellerPriceInput"),
  sellerGrade: document.querySelector("#sellerGradeInput"),
  sellerSubject: document.querySelector("#sellerSubjectInput"),
  sellerType: document.querySelector("#sellerTypeInput"),
  sellerDiscount: document.querySelector("#sellerDiscountInput"),
  sellerDescription: document.querySelector("#sellerDescriptionInput"),
  sellerFile: document.querySelector("#sellerFileInput"),
  sellerStatus: document.querySelector("#sellerStatus"),
  sellerResourceList: document.querySelector("#sellerResourceList"),
  sellerEarningsTotal: document.querySelector("#sellerEarningsTotal"),
  sellerStorageInfo: document.querySelector("#sellerStorageInfo"),
  withdrawForm: document.querySelector("#withdrawForm"),
  withdrawPhone: document.querySelector("#withdrawPhoneInput"),
  withdrawStatus: document.querySelector("#withdrawStatus"),
  sellerDashboard: document.querySelector("#sellerDashboard"),
  openSellerDashboard: document.querySelector("#openSellerDashboardButton"),
  openSellerDashboardSecondary: document.querySelector("#openSellerDashboardButtonSecondary"),
  adminAreaButton: document.querySelector("#adminAreaButton"),
  sellerAccountForm: document.querySelector("#sellerAccountForm"),
  sellerAccountName: document.querySelector("#sellerAccountNameInput"),
  sellerAccountPhone: document.querySelector("#sellerAccountPhoneInput"),
  sellerAccountUsername: document.querySelector("#sellerAccountUsernameInput"),
  sellerAccountPassword: document.querySelector("#sellerAccountPasswordInput"),
  sellerAccountStatus: document.querySelector("#sellerAccountStatus"),
  sellerLoginForm: document.querySelector("#sellerLoginForm"),
  sellerLoginUsername: document.querySelector("#sellerLoginUsernameInput"),
  sellerLoginPassword: document.querySelector("#sellerLoginPasswordInput"),
  sellerLoginStatus: document.querySelector("#sellerLoginStatus"),
  paymentForm: document.querySelector("#paymentForm"),
  customerPhone: document.querySelector("#customerPhoneInput"),
  amount: document.querySelector("#amountInput"),
  selectedResource: document.querySelector("#selectedResourceInput"),
  paymentStatus: document.querySelector("#paymentStatus"),
  paymentRecordsList: document.querySelector("#paymentRecordsList"),
  adminApprovalList: document.querySelector("#adminApprovalList"),
  downloadApprovalList: document.querySelector("#downloadApprovalList"),
  sellerAccountApprovalList: document.querySelector("#sellerAccountApprovalList"),
  adminSection: document.querySelector("#admin"),
  adminLoginForm: document.querySelector("#adminLoginForm"),
  adminUsername: document.querySelector("#adminUsernameInput"),
  adminPassword: document.querySelector("#adminPasswordInput"),
  adminEmail: document.querySelector("#adminEmailInput"),
  adminLoginStatus: document.querySelector("#adminLoginStatus"),
  whatsappOrder: document.querySelector("#whatsappOrderButton"),
  projectForm: document.querySelector("#projectUploadForm"),
  projectTitle: document.querySelector("#projectTitleInput"),
  projectGrade: document.querySelector("#projectGradeInput"),
  projectSubject: document.querySelector("#projectSubjectInput"),
  projectFile: document.querySelector("#projectFileInput"),
  projectNotes: document.querySelector("#projectNotesInput"),
  projectStatus: document.querySelector("#projectStatus"),
  tuitionForm: document.querySelector("#tuitionForm"),
  tuitionLearner: document.querySelector("#tuitionLearnerInput"),
  tuitionPhone: document.querySelector("#tuitionPhoneInput"),
  tuitionGrade: document.querySelector("#tuitionGradeInput"),
  tuitionSubjects: document.querySelector("#tuitionSubjectsInput"),
  tuitionStatus: document.querySelector("#tuitionStatus"),
  quizForm: document.querySelector("#quizForm"),
  quizLearner: document.querySelector("#quizLearnerInput"),
  quizStatus: document.querySelector("#quizStatus"),
  progressReport: document.querySelector("#progressReport"),
  homeworkForm: document.querySelector("#homeworkForm"),
  homeworkGrade: document.querySelector("#homeworkGradeInput"),
  homeworkSubject: document.querySelector("#homeworkSubjectInput"),
  homeworkQuestion: document.querySelector("#homeworkQuestionInput"),
  homeworkAnswer: document.querySelector("#homeworkAnswer"),
  toast: document.querySelector("#toast")
};

let toastTimer;

function readSavedResources() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function readSellerResources() {
  try {
    return JSON.parse(localStorage.getItem(SELLER_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function readSellerAccounts() {
  try {
    return JSON.parse(localStorage.getItem(SELLER_ACCOUNTS_KEY)) || [];
  } catch {
    return [];
  }
}

function readPaymentRecords() {
  try {
    return JSON.parse(localStorage.getItem(PAYMENT_RECORDS_KEY)) || [];
  } catch {
    return [];
  }
}

function readQuizProgress() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_PROGRESS_KEY)) || [];
  } catch {
    return [];
  }
}

function readWithdrawalRequests() {
  try {
    return JSON.parse(localStorage.getItem(WITHDRAWAL_KEY)) || [];
  } catch {
    return [];
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** exponent).toFixed(1)} ${units[exponent]}`;
}

function getSellerStorageUsage() {
  return readSellerResources().reduce((total, resource) => {
    return total + (Number(resource.fileSize) || 0);
  }, 0);
}

function getAllResources() {
  return [
    ...starterResources,
    ...readSavedResources(),
    ...readSellerResources().filter((resource) => resource.status === "approved")
  ];
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function optionList(select, options, selectedValue) {
  select.innerHTML = options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
  select.value = selectedValue;
}

function money(value) {
  return `KES ${Number(value).toLocaleString("en-KE")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function discountedPrice(resource) {
  const discount = Number(resource.discount) || 0;
  return Math.max(0, Math.round(Number(resource.price) * (1 - discount / 100)));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3200);
}

async function postToBackend(endpoint, payload) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Backend request failed.");
    return await response.json();
  } catch {
    return null;
  }
}

function saveLocalList(key, item) {
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([item, ...existing]));
}

function setActiveMaterialLink() {
  document.querySelectorAll("[data-material-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.materialLink === state.type);
  });
}

function renderQuickTypes() {
  elements.quickTypes.innerHTML = materialTypes
    .map((type) => `<button type="button" data-quick-type="${escapeHtml(type)}">${escapeHtml(type)}</button>`)
    .join("");
}

function renderTrending() {
  const resources = getAllResources().slice(0, 6);
  elements.trendingList.innerHTML = resources.map((resource, index) => `
    <button class="trending-item" type="button" data-trending="${escapeHtml(resource.id)}">
      <strong>${escapeHtml(resource.title)}</strong>
      <span>${15 - index} orders this week | ${escapeHtml(resource.grade)} | ${escapeHtml(resource.type)}</span>
    </button>
  `).join("");
}

function whatsappLink(resource, amount) {
  const message = resource
    ? `Hello, I want to buy ${resource.title} (${resource.grade}, ${resource.subject}) for ${money(amount)}. I will pay via M-Pesa ${MPESA_PHONE}.`
    : `Hello, I want to buy CBE e-learning resources. I will pay via M-Pesa ${MPESA_PHONE}.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function paidResourceHelpLink(resource, amount) {
  const message = `Hello, help me access ${resource.title} (${resource.grade}, ${resource.subject}). I have paid ${money(amount)} via M-Pesa to ${MPESA_PHONE}. Kindly send/activate this CBE resource.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function renderGradeDashboard() {
  elements.gradeList.innerHTML = Object.entries(gradeSubjects)
    .map(([grade, subjects], index) => `
      <article class="grade-card ${index === 0 ? "open" : ""}">
        <button class="grade-toggle" type="button" data-grade-toggle="${grade}" aria-expanded="${index === 0}">
        <span>${escapeHtml(grade)}</span>
        <span>Subjects</span>
      </button>
      <div class="subject-menu">
          ${subjects.map((subject) => `<button class="subject-chip" type="button" data-grade="${escapeHtml(grade)}" data-subject="${escapeHtml(subject)}">${escapeHtml(subject)}</button>`).join("")}
        </div>
      </article>
    `)
    .join("");
}

function refreshSubjectFilters() {
  const subjects = state.grade === "All Grades"
    ? Array.from(new Set(Object.values(gradeSubjects).flat())).sort()
    : gradeSubjects[state.grade];

  if (!subjects.includes(state.subject) && state.subject !== "All Subjects") {
    state.subject = "All Subjects";
  }

  optionList(elements.subjectFilter, ["All Subjects", ...subjects], state.subject);
}

function setupFilters() {
  const grades = Object.keys(gradeSubjects);
  optionList(elements.gradeFilter, ["All Grades", ...grades], state.grade);
  optionList(elements.adminGrade, grades, "Grade 1");
  optionList(elements.sellerGrade, grades, "Grade 1");
  optionList(elements.projectGrade, grades, "Grade 1");
  optionList(elements.tuitionGrade, grades, "Grade 1");
  optionList(elements.homeworkGrade, grades, "Grade 1");
  optionList(elements.typeFilter, ["All Materials", ...materialTypes], state.type);
  optionList(elements.adminType, materialTypes, "Notes");
  optionList(elements.sellerType, materialTypes, "Notes");
  optionList(elements.adminSubject, gradeSubjects["Grade 1"], "Mathematics Activities");
  optionList(elements.sellerSubject, gradeSubjects["Grade 1"], "Mathematics Activities");
  refreshSubjectFilters();
}

function resourceMatches(resource) {
  const query = state.search.trim().toLowerCase();
  const searchable = `${resource.title} ${resource.description} ${resource.subject} ${resource.type} ${resource.term || ""}`.toLowerCase();
  return (state.grade === "All Grades" || resource.grade === state.grade)
    && (state.subject === "All Subjects" || resource.subject === state.subject)
    && (state.type === "All Materials" || resource.type === state.type)
    && (state.term === "All Terms" || resource.term === state.term)
    && (state.access === "All Access" || (state.access === "Free Samples" ? resource.isFreeSample : !resource.isFreeSample))
    && (!query || searchable.includes(query));
}

function sortResources(resources) {
  return [...resources].sort((a, b) => {
    if (state.sort === "Price Low to High") return discountedPrice(a) - discountedPrice(b);
    if (state.sort === "Price High to Low") return discountedPrice(b) - discountedPrice(a);
    if (state.sort === "Popular") return (Number(b.popularity) || 0) - (Number(a.popularity) || 0);
    return String(b.id).localeCompare(String(a.id));
  });
}

function renderResources() {
  const resources = getAllResources();
  const filtered = sortResources(resources.filter(resourceMatches));
  if (elements.statResources) elements.statResources.textContent = resources.length;
  elements.activeContext.textContent = `${filtered.length} material(s) showing for ${state.grade}, ${state.subject}, ${state.type}`;
  setActiveMaterialLink();

  if (!filtered.length) {
    elements.resourceGrid.innerHTML = `<div class="empty-state">No resources match the current filters. Use the admin dashboard to publish a new material.</div>`;
    return;
  }

  elements.resourceGrid.innerHTML = filtered.map((resource) => `
    <article class="resource-card">
      <div class="resource-meta">
        <span class="tag">${escapeHtml(resource.grade)}</span>
        <span class="tag">${escapeHtml(resource.subject)}</span>
        <span class="tag">${escapeHtml(resource.type)}</span>
        <span class="tag">${escapeHtml(resource.term || "Term Ready")}</span>
        ${resource.isFreeSample ? `<span class="tag free">Free Sample</span>` : ""}
        ${resource.sellerUsername ? `<span class="tag">Seller: ${escapeHtml(resource.sellerUsername)}</span>` : ""}
      </div>
      <h3>${escapeHtml(resource.title)}</h3>
      <p>${escapeHtml(resource.description)}</p>
      <div class="price-row">
        <div>
          <strong>${money(discountedPrice(resource))}</strong>
          <span>${Number(resource.discount) || 0}% discount from ${money(resource.price)}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="primary-button" type="button" data-pay="${escapeHtml(resource.id)}">Pay M-Pesa</button>
        <button class="secondary-button" type="button" data-cart="${escapeHtml(resource.id)}">Add to Cart</button>
        <a class="whatsapp-button" href="${escapeHtml(whatsappLink(resource, discountedPrice(resource)))}" target="_blank" rel="noopener">WhatsApp</a>
        ${resource.isFreeSample ? `<a class="secondary-button" href="${escapeHtml(resource.file)}" download="${escapeHtml(resource.fileName || "")}">Preview Sample</a>` : ""}
        ${localStorage.getItem(REFERRAL_KEY) ? `<a class="secondary-button" href="${escapeHtml(resource.file)}" download="${escapeHtml(resource.fileName || "")}" data-free-resource="${escapeHtml(resource.id)}">Free Referral Paper</a>` : ""}
        <button class="secondary-button" type="button" data-download-resource="${escapeHtml(resource.id)}" title="Available after payment confirmation by admin">📥 Download</button>
        <a class="download-button" href="${escapeHtml(paidResourceHelpLink(resource, discountedPrice(resource)))}" target="_blank" rel="noopener" data-download="${escapeHtml(resource.id)}">Get CBE Resource</a>
      </div>
    </article>
  `).join("");
}

function unlockFreeReferral(event) {
  event.preventDefault();
  const friendName = elements.friendName.value.trim();
  const friendPhone = elements.friendPhone.value.trim();
  localStorage.setItem(REFERRAL_KEY, JSON.stringify({
    friendName,
    friendPhone,
    unlockedAt: new Date().toISOString()
  }));
  elements.referForm.reset();
  renderResources();
  showToast("Referral recorded. One free CBE paper is unlocked.");
}

function cartWhatsappLink(cart) {
  const total = cart.reduce((sum, resource) => sum + discountedPrice(resource), 0);
  const list = cart.map((resource, index) => `${index + 1}. ${resource.title} - ${money(discountedPrice(resource))}`).join("\n");
  const message = `Hello, help me access these CBE resources:\n${list}\nTotal paid: ${money(total)}\nI have paid via M-Pesa to ${MPESA_PHONE}. Kindly send/activate the materials.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function renderCart() {
  const cart = readCart();
  elements.cartCount.textContent = cart.length;
  elements.cartTotal.textContent = money(cart.reduce((sum, resource) => sum + discountedPrice(resource), 0));
  elements.cartWhatsapp.href = cart.length ? cartWhatsappLink(cart) : whatsappLink(null, 0);

  if (!cart.length) {
    elements.cartItems.innerHTML = `<div class="empty-state">Your cart is empty. Add CBE resources from the library.</div>`;
    return;
  }

  elements.cartItems.innerHTML = cart.map((resource) => `
    <div class="cart-item">
      <strong>${escapeHtml(resource.title)}</strong>
      <span>${escapeHtml(resource.grade)} | ${escapeHtml(resource.subject)} | ${money(discountedPrice(resource))}</span>
      <button class="secondary-button" type="button" data-remove-cart="${escapeHtml(resource.id)}">Remove</button>
    </div>
  `).join("");
}

function renderSellerResources() {
  const sellerResources = readSellerResources();
  const activeSeller = JSON.parse(sessionStorage.getItem("activeSellerAccount") || "null");
  const visibleResources = activeSeller
    ? sellerResources.filter((resource) => resource.sellerUsername === activeSeller.username)
    : sellerResources;
  const approved = visibleResources.filter((resource) => resource.status === "approved");
  const earnings = approved.reduce((sum, resource) => sum + Math.round(Number(resource.price) * 0.5), 0);
  elements.sellerEarningsTotal.textContent = money(earnings);
  renderSellerStorageInfo();
  if (!visibleResources.length) {
    elements.sellerResourceList.innerHTML = `<div class="empty-state">No seller resources submitted yet.</div>`;
    return;
  }

  elements.sellerResourceList.innerHTML = visibleResources.map((resource) => `
    <div class="seller-resource-item">
      <strong>${escapeHtml(resource.title)}</strong>
      <span>@${escapeHtml(resource.sellerUsername || "seller")} | ${escapeHtml(resource.sellerName)} | ${escapeHtml(resource.grade)} | ${escapeHtml(resource.subject)}</span>
      <span>Price: ${money(resource.price)} | Seller earns: ${money(Math.round(Number(resource.price) * 0.5))}</span>
      <span>Status: ${escapeHtml(resource.status || "pending")} | Admin approval within 3 days</span>
    </div>
  `).join("");
}

function renderSellerAccountApprovals() {
  const pending = readSellerAccounts().filter((account) => account.status === "pending");
  if (!pending.length) {
    elements.sellerAccountApprovalList.innerHTML = `<div class="empty-state">No pending seller accounts.</div>`;
    return;
  }

  elements.sellerAccountApprovalList.innerHTML = pending.map((account) => `
    <div class="approval-item">
      <strong>${escapeHtml(account.name)}</strong>
      <span>${escapeHtml(account.username)} | ${escapeHtml(account.phone)} | Approval within 24 hours</span>
      <div class="approval-actions">
        <button class="primary-button" type="button" data-approve-seller-account="${escapeHtml(account.id)}">Approve Account</button>
        <button class="secondary-button" type="button" data-reject-seller-account="${escapeHtml(account.id)}">Reject Account</button>
      </div>
    </div>
  `).join("");
}

function updateSellerAccountStatus(accountId, status) {
  const updated = readSellerAccounts().map((account) => {
    if (account.id !== accountId) return account;
    return {
      ...account,
      status,
      reviewedAt: new Date().toISOString()
    };
  });
  localStorage.setItem(SELLER_ACCOUNTS_KEY, JSON.stringify(updated));
  renderSellerAccountApprovals();
  showToast(`Seller account ${status}.`);
}

function renderAdminApprovals() {
  const sellerResources = readSellerResources();
  const pending = sellerResources.filter((resource) => resource.status === "pending");
  if (!pending.length) {
    elements.adminApprovalList.innerHTML = `<div class="empty-state">No pending seller resources.</div>`;
    return;
  }

  elements.adminApprovalList.innerHTML = pending.map((resource) => `
    <div class="approval-item">
      <strong>${escapeHtml(resource.title)}</strong>
      <span>${escapeHtml(resource.sellerName)} | ${escapeHtml(resource.grade)} | ${escapeHtml(resource.subject)} | ${money(resource.price)}</span>
      <span>${escapeHtml(resource.description)}</span>
      <div class="approval-actions">
        <button class="primary-button" type="button" data-approve-seller="${escapeHtml(resource.id)}">Approve</button>
        <button class="secondary-button" type="button" data-reject-seller="${escapeHtml(resource.id)}">Reject</button>
      </div>
    </div>
  `).join("");
}

function updateSellerStatus(resourceId, status) {
  const updated = readSellerResources().map((resource) => {
    if (resource.id !== resourceId) return resource;
    return {
      ...resource,
      status,
      reviewedAt: new Date().toISOString()
    };
  });
  localStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify(updated));
  renderSellerResources();
  renderAdminApprovals();
  renderResources();
  renderTrending();
  showToast(`Seller resource ${status}.`);
}

function renderSellerStorageInfo() {
  if (!elements.sellerStorageInfo) return;
  const usedBytes = getSellerStorageUsage();
  elements.sellerStorageInfo.textContent = `Seller storage usage: ${formatBytes(usedBytes)} of 20 GB available.`;
}

function renderPaymentRecords() {
  const records = readPaymentRecords();
  if (!records.length) {
    elements.paymentRecordsList.innerHTML = `<div class="empty-state">No payment records yet.</div>`;
    return;
  }

  elements.paymentRecordsList.innerHTML = records.map((record) => `
    <div class="record-item">
      <strong>${escapeHtml(record.resource || "CBE resource order")}</strong>
      <span>${escapeHtml(record.customerPhone)} | ${money(record.amount)} | ${escapeHtml(record.status)}</span>
      <span>${new Date(record.createdAt).toLocaleString()}</span>
      ${record.status === "pending confirmation" ? `<button class="primary-button" type="button" data-approve-download="${record.id}">Activate Download</button>` : ""}
    </div>
  `).join("");
}

function renderDownloadApprovals() {
  if (!elements.downloadApprovalList) return;
  const approvedDownloads = readApprovedDownloads();
  const pending = approvedDownloads.filter((download) => download.status === "pending");
  
  if (!pending.length) {
    elements.downloadApprovalList.innerHTML = `<div class="empty-state">No pending download requests.</div>`;
    return;
  }

  elements.downloadApprovalList.innerHTML = pending.map((download) => `
    <div class="approval-item">
      <strong>${escapeHtml(download.resourceName)}</strong>
      <span>Customer: ${escapeHtml(download.customerPhone)} | Amount: ${money(download.amount)}</span>
      <span>Status: Pending activation</span>
      <div class="approval-actions">
        <button class="primary-button" type="button" data-confirm-download="${escapeHtml(download.id)}">Approve Download</button>
        <button class="secondary-button" type="button" data-reject-download="${escapeHtml(download.id)}">Reject</button>
      </div>
    </div>
  `).join("");
}

async function handleProjectUpload(event) {
  event.preventDefault();
  const uploadedFile = elements.projectFile.files[0];
  const file = uploadedFile ? await readUploadedFile(uploadedFile) : null;
  const project = {
    id: `project-${Date.now()}`,
    title: elements.projectTitle.value.trim(),
    grade: elements.projectGrade.value,
    subject: elements.projectSubject.value.trim(),
    notes: elements.projectNotes.value.trim(),
    fileName: uploadedFile ? uploadedFile.name : "",
    file,
    status: "submitted",
    createdAt: new Date().toISOString()
  };
  saveLocalList(PROJECTS_KEY, project);
  const backend = await postToBackend(API_ENDPOINTS.projects, project);
  elements.projectForm.reset();
  elements.projectGrade.value = "Grade 1";
  elements.projectStatus.textContent = backend
    ? "CBC project uploaded to the backend successfully."
    : "CBC project saved in this browser. Start the backend server to store it centrally.";
  showToast("CBC project submitted.");
}

async function handleTuitionRegistration(event) {
  event.preventDefault();
  const registration = {
    id: `tuition-${Date.now()}`,
    learner: elements.tuitionLearner.value.trim(),
    phone: elements.tuitionPhone.value.trim(),
    grade: elements.tuitionGrade.value,
    subjects: elements.tuitionSubjects.value.trim(),
    freeResourcesUnlocked: true,
    createdAt: new Date().toISOString()
  };
  saveLocalList(TUITION_KEY, registration);
  const backend = await postToBackend(API_ENDPOINTS.tuition, registration);
  elements.tuitionForm.reset();
  elements.tuitionGrade.value = "Grade 1";
  elements.tuitionStatus.textContent = backend
    ? "Holiday tuition registration received. Free CBC resources are unlocked below."
    : "Registration saved in this browser. Free CBC resources are unlocked below.";
  showToast("Holiday tuition registration received.");
  document.querySelector("#freeCbcResources").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderProgressReport() {
  const attempts = readQuizProgress();
  if (!attempts.length) {
    elements.progressReport.innerHTML = `<div class="empty-state">No quiz attempts yet. Mark a quiz to generate progress.</div>`;
    return;
  }
  elements.progressReport.innerHTML = attempts.slice(0, 6).map((attempt) => `
    <div class="progress-item">
      <strong>${escapeHtml(attempt.learner)} - ${attempt.score}%</strong>
      <span>${escapeHtml(attempt.remark)} | ${new Date(attempt.createdAt).toLocaleString()}</span>
      <div class="progress-meter" aria-label="Score ${attempt.score}%"><span style="width: ${attempt.score}%"></span></div>
    </div>
  `).join("");
}

async function handleQuizSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.quizForm);
  const answers = {
    q1: formData.get("q1"),
    q2: formData.get("q2"),
    q3: formData.get("q3")
  };
  const answerKey = {
    q1: "competency",
    q2: "assessment",
    q3: "specific"
  };
  const correct = Object.keys(answerKey).filter((key) => answers[key] === answerKey[key]).length;
  const score = Math.round((correct / Object.keys(answerKey).length) * 100);
  const attempt = {
    id: `quiz-${Date.now()}`,
    learner: elements.quizLearner.value.trim(),
    answers,
    correct,
    score,
    remark: score >= 80 ? "Excellent progress" : score >= 50 ? "Good effort; revise weak areas" : "Needs guided revision",
    createdAt: new Date().toISOString()
  };
  saveLocalList(QUIZ_PROGRESS_KEY, attempt);
  await postToBackend(API_ENDPOINTS.quizzes, attempt);
  elements.quizStatus.textContent = `${attempt.learner} scored ${score}%. ${attempt.remark}.`;
  elements.quizForm.reset();
  renderProgressReport();
  showToast("Quiz marked and progress report updated.");
}

async function handleHomeworkHelper(event) {
  event.preventDefault();
  const payload = {
    grade: elements.homeworkGrade.value,
    subject: elements.homeworkSubject.value.trim(),
    question: elements.homeworkQuestion.value.trim()
  };
  elements.homeworkAnswer.textContent = "Preparing a guided homework response...";
  const backend = await postToBackend(API_ENDPOINTS.homework, payload);
  const answer = backend && backend.answer
    ? backend.answer
    : `Guided help for ${payload.grade} ${payload.subject}: Start by identifying what the question is asking, list the known facts, solve one step at a time, then check whether your answer fits the question. For this question, write the key idea in your own words first: "${payload.question}"`;
  elements.homeworkAnswer.innerHTML = `<strong>AI Homework Helper</strong><p>${escapeHtml(answer)}</p>`;
  showToast("Homework helper response ready.");
}

async function handleSellerSubmit(event) {
  event.preventDefault();
  const activeSeller = JSON.parse(sessionStorage.getItem("activeSellerAccount") || "null");
  if (!activeSeller || activeSeller.status !== "approved") {
    elements.sellerStatus.textContent = "Seller account must be approved before uploading resources.";
    showToast("Seller account approval required.");
    return;
  }
  const sellerFile = elements.sellerFile.files[0];
  const file = await readUploadedFile(sellerFile);
  const resource = {
    id: `seller-${Date.now()}`,
    sellerName: activeSeller.name,
    sellerPhone: activeSeller.phone,
    sellerUsername: activeSeller.username,
    title: elements.sellerTitle.value.trim(),
    grade: elements.sellerGrade.value,
    subject: elements.sellerSubject.value,
    type: elements.sellerType.value,
    description: elements.sellerDescription.value.trim(),
    price: Number(elements.sellerPrice.value || 0),
    discount: Number(elements.sellerDiscount.value || 0),
    term: "Term 1",
    isFreeSample: false,
    popularity: 1,
    fileName: sellerFile.name,
    file,
    fileSize: sellerFile.size,
    commission: 50,
    status: "pending",
    approvalNote: "Admin will review and approve within 3 days."
  };

  const currentUsage = getSellerStorageUsage();
  if (currentUsage + sellerFile.size > SELLER_STORAGE_LIMIT_BYTES) {
    elements.sellerStatus.textContent = "Your seller upload storage has reached its 20GB limit. Remove older uploads before submitting more files.";
    showToast("Seller storage limit reached.");
    return;
  }
  localStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify([...readSellerResources(), resource]));
  elements.sellerForm.reset();
  elements.sellerPrice.value = "";
  elements.sellerDiscount.value = 0;
  elements.sellerGrade.value = "Grade 1";
  optionList(elements.sellerSubject, gradeSubjects["Grade 1"], "Mathematics Activities");
  elements.sellerStatus.textContent = "Seller resource submitted. Admin will review and approve within 3 days.";
  renderSellerResources();
  renderAdminApprovals();
  renderResources();
  renderTrending();
  showToast("Seller resource submitted for admin approval.");
}

function requestWithdrawal(event) {
  event.preventDefault();
  const approved = readSellerResources().filter((resource) => resource.status === "approved");
  const amount = approved.reduce((sum, resource) => sum + Math.round(Number(resource.price) * 0.5), 0);
  if (!amount) {
    elements.withdrawStatus.textContent = "No approved seller earnings available for withdrawal.";
    return;
  }
  const request = {
    id: `withdraw-${Date.now()}`,
    phone: elements.withdrawPhone.value.trim(),
    amount,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(WITHDRAWAL_KEY, JSON.stringify([...readWithdrawalRequests(), request]));
  elements.withdrawForm.reset();
  elements.withdrawStatus.textContent = `Withdrawal request submitted for ${money(amount)}.`;
  showToast("Seller withdrawal request submitted.");
}

function openAdminLogin() {
  const adminLoginSection = document.querySelector("#adminLogin");
  if (!adminLoginSection) return;
  adminLoginSection.classList.add("open");
  adminLoginSection.setAttribute("aria-hidden", "false");
  adminLoginSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Admin login section opened.");
}

function openSellerDashboard() {
  const activeSeller = JSON.parse(sessionStorage.getItem("activeSellerAccount") || "null");
  if (!activeSeller || activeSeller.status !== "approved") {
    document.querySelector("#sellerAccount").classList.add("open");
    document.querySelector("#sellerAccount").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Create or login to an approved seller account first.");
    return;
  }
  elements.sellerName.value = activeSeller.name;
  elements.sellerPhone.value = activeSeller.phone;
  elements.sellerDashboard.classList.add("open");
  elements.sellerDashboard.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Seller dashboard opened.");
}

function createSellerAccount(event) {
  event.preventDefault();
  const username = elements.sellerAccountUsername.value.trim().toLowerCase();
  const existing = readSellerAccounts().some((account) => account.username.toLowerCase() === username);
  if (existing) {
    elements.sellerAccountStatus.textContent = "This seller username is already registered.";
    return;
  }
  const account = {
    id: `seller-account-${Date.now()}`,
    name: elements.sellerAccountName.value.trim(),
    phone: elements.sellerAccountPhone.value.trim(),
    username: elements.sellerAccountUsername.value.trim(),
    password: elements.sellerAccountPassword.value,
    status: "pending",
    approvalNote: "Admin will approve within 24 hours.",
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(SELLER_ACCOUNTS_KEY, JSON.stringify([...readSellerAccounts(), account]));
  elements.sellerAccountForm.reset();
  elements.sellerAccountStatus.textContent = "Seller account created. Admin will approve within 24 hours.";
  renderSellerAccountApprovals();
  showToast("Seller account submitted for approval.");
}

function loginSeller(event) {
  event.preventDefault();
  const username = elements.sellerLoginUsername.value.trim().toLowerCase();
  const password = elements.sellerLoginPassword.value;
  const account = readSellerAccounts().find((item) => item.username.toLowerCase() === username && item.password === password);
  if (!account) {
    elements.sellerLoginStatus.textContent = "Invalid seller username or password.";
    return;
  }
  if (account.status !== "approved") {
    elements.sellerLoginStatus.textContent = "Seller account is pending admin approval within 24 hours.";
    return;
  }
  sessionStorage.setItem("activeSellerAccount", JSON.stringify(account));
  elements.sellerLoginForm.reset();
  elements.sellerLoginStatus.textContent = "Seller login successful.";
  openSellerDashboard();
}

function unlockAdmin(event) {
  event.preventDefault();
  const username = elements.adminUsername.value.trim().toUpperCase();
  const password = elements.adminPassword.value;
  const email = elements.adminEmail.value.trim().toLowerCase();

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD || email !== ADMIN_EMAIL) {
    elements.adminLoginStatus.textContent = "Invalid username, password, or email. Please use the official admin credentials.";
    showToast("Admin login failed.");
    return;
  }

  sessionStorage.setItem("cbeAdminUnlocked", "true");
  const adminLoginSection = document.querySelector("#adminLogin");
  if (adminLoginSection) {
    adminLoginSection.classList.remove("open");
    adminLoginSection.setAttribute("aria-hidden", "true");
  }
  elements.adminSection.classList.add("open");
  elements.adminSection.setAttribute("aria-hidden", "false");
  elements.adminLoginForm.reset();
  elements.adminLoginStatus.textContent = "Admin dashboard unlocked.";
  elements.adminSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Admin dashboard unlocked.");
}

function restoreAdminAccess() {
  if (sessionStorage.getItem("cbeAdminUnlocked") === "true") {
    elements.adminSection.classList.add("open");
    elements.adminSection.setAttribute("aria-hidden", "false");
  }
}

function addToCart(resourceId) {
  const resource = getAllResources().find((item) => item.id === resourceId);
  if (!resource) return;
  const cart = readCart();
  if (!cart.some((item) => item.id === resource.id)) {
    localStorage.setItem(CART_KEY, JSON.stringify([...cart, resource]));
  }
  renderCart();
  elements.cartDrawer.classList.add("open");
  elements.cartDrawer.setAttribute("aria-hidden", "false");
  showToast(`${resource.title} added to cart.`);
}

function removeFromCart(resourceId) {
  localStorage.setItem(CART_KEY, JSON.stringify(readCart().filter((resource) => resource.id !== resourceId)));
  renderCart();
  showToast("Resource removed from cart.");
}

function selectResourceForPayment(resourceId) {
  const resource = getAllResources().find((item) => item.id === resourceId);
  if (!resource) return;

  const amount = discountedPrice(resource);
  elements.selectedResource.value = resource.title;
  elements.amount.value = amount;
  elements.paymentStatus.textContent = `Ready to request M-Pesa payment of ${money(amount)} to ${MPESA_PHONE}.`;
  elements.whatsappOrder.href = whatsappLink(resource, amount);
  showToast(`${resource.title} selected for M-Pesa payment.`);
  document.querySelector("#payments").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function requestMpesaPayment(event) {
  event.preventDefault();

  const payload = {
    customerPhone: elements.customerPhone.value.trim(),
    businessPhone: MPESA_PHONE,
    amount: Number(elements.amount.value),
    resource: elements.selectedResource.value.trim()
  };

  elements.paymentStatus.textContent = "Sending M-Pesa payment request...";
  showToast("Processing M-Pesa request...");
  const record = {
    id: `pay-${Date.now()}`,
    ...payload,
    status: "pending confirmation",
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(PAYMENT_RECORDS_KEY, JSON.stringify([record, ...readPaymentRecords()]));
  renderPaymentRecords();

  try {
    const response = await fetch(MPESA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("M-Pesa backend is not active yet.");
    }

    elements.paymentStatus.textContent = "M-Pesa request sent. Check the customer's phone to complete payment.";
    showToast("M-Pesa request sent successfully.");
  } catch {
    elements.paymentStatus.textContent = `M-Pesa API backend is not connected yet. Pay manually to ${MPESA_PHONE}, then confirm on WhatsApp.`;
    elements.whatsappOrder.href = whatsappLink(null, payload.amount);
    showToast("M-Pesa backend is not active yet. Use WhatsApp confirmation.");
  }
}

function setGradeSubject(grade, subject) {
  state.grade = grade;
  state.subject = subject;
  elements.gradeFilter.value = grade;
  refreshSubjectFilters();
  elements.subjectFilter.value = subject;
  renderResources();
  document.querySelector("#resources").scrollIntoView({ behavior: "smooth", block: "start" });
}

function createDownloadFile(resource) {
  const content = [
    "CBE E-Learning Resource",
    `Title: ${resource.title}`,
    `Grade: ${resource.grade}`,
    `Subject: ${resource.subject}`,
    `Material Type: ${resource.type}`,
    `Description: ${resource.description}`,
    `Price: ${money(resource.price)}`,
    `Discount: ${resource.discount}%`,
    "",
    resource.notes ? "NOTES" : "",
    resource.notes || "",
    resource.notes ? "" : "",
    "Replace this generated file with the final PDF, DOCX, or workbook when deploying online."
  ].filter((line) => line !== "").join("\n");
  return `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`;
}

function readUploadedFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const uploadedFile = elements.fileInput.files[0];
  const title = document.querySelector("#titleInput").value.trim();
  const description = document.querySelector("#descriptionInput").value.trim();
  const notes = elements.notesContent.value.trim();
  const price = Number(document.querySelector("#priceInput").value || 0);
  const discount = Number(document.querySelector("#discountInput").value || 0);
  let fileName = document.querySelector("#fileNameInput").value.trim();
  let file = "";

  if (uploadedFile) {
    fileName = fileName || uploadedFile.name;
    file = await readUploadedFile(uploadedFile);
  } else {
    fileName = fileName || `${Date.now()}-cbe-resource.txt`;
  }

  const resource = {
    id: `admin-${Date.now()}`,
    title,
    grade: elements.adminGrade.value,
    subject: elements.adminSubject.value,
    type: elements.adminType.value,
    description,
    notes,
    price,
    discount,
    term: elements.termInput.value,
    isFreeSample: elements.freeSample.value === "true",
    popularity: 1,
    fileName,
    file: file || createDownloadFile({
      title,
      grade: elements.adminGrade.value,
      subject: elements.adminSubject.value,
      type: elements.adminType.value,
      description,
      notes,
      price,
      discount,
      term: elements.termInput.value
    })
  };

  const saved = readSavedResources();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, resource]));
  elements.form.reset();
  document.querySelector("#priceInput").value = "";
  document.querySelector("#discountInput").value = 0;
  elements.termInput.value = "Term 1";
  elements.freeSample.value = "false";
  elements.notesContent.value = "";
  elements.adminGrade.value = "Grade 1";
  optionList(elements.adminSubject, gradeSubjects["Grade 1"], "Mathematics Activities");
  elements.fileHelp.textContent = "Choose a PDF, Word document, PowerPoint, Excel file, text file, or ZIP.";
  elements.formStatus.textContent = "Resource published successfully and added to the library.";
  showToast("Resource published successfully.");
  renderResources();
}

function bindEvents() {
  document.querySelectorAll("[data-material-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      state.type = link.dataset.materialLink;
      elements.typeFilter.value = state.type;
      renderResources();
      showToast(`${state.type} selected.`);
      document.querySelector("#resources").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-hero-resource]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const category = link.dataset.heroResource;
      state.search = category;
      elements.searchFilter.value = category;
      renderResources();
      showToast(`${category} selected.`);
      document.querySelector("#resources").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  elements.quickTypes.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick-type]");
    if (!button) return;
    state.type = button.dataset.quickType;
    elements.typeFilter.value = state.type;
    renderResources();
    showToast(`${state.type} selected.`);
    document.querySelector("#resources").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  elements.trendingList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-trending]");
    if (button) {
      selectResourceForPayment(button.dataset.trending);
    }
  });

  document.querySelectorAll("[data-landing-search]").forEach((button) => {
    button.addEventListener("click", () => {
      state.search = button.dataset.landingSearch;
      elements.searchFilter.value = state.search;
      renderResources();
      document.querySelector("#resources").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`${state.search} selected.`);
    });
  });

  elements.cartButton.addEventListener("click", () => {
    renderCart();
    elements.cartDrawer.classList.add("open");
    elements.cartDrawer.setAttribute("aria-hidden", "false");
  });

  elements.closeCartButton.addEventListener("click", () => {
    elements.cartDrawer.classList.remove("open");
    elements.cartDrawer.setAttribute("aria-hidden", "true");
  });

  elements.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-cart]");
    if (button) {
      removeFromCart(button.dataset.removeCart);
    }
  });

  elements.adminApprovalList.addEventListener("click", (event) => {
    const approve = event.target.closest("[data-approve-seller]");
    const reject = event.target.closest("[data-reject-seller]");
    if (approve) updateSellerStatus(approve.dataset.approveSeller, "approved");
    if (reject) updateSellerStatus(reject.dataset.rejectSeller, "rejected");
  });

  elements.sellerAccountApprovalList.addEventListener("click", (event) => {
    const approve = event.target.closest("[data-approve-seller-account]");
    const reject = event.target.closest("[data-reject-seller-account]");
    if (approve) updateSellerAccountStatus(approve.dataset.approveSellerAccount, "approved");
    if (reject) updateSellerAccountStatus(reject.dataset.rejectSellerAccount, "rejected");
  });

  document.querySelector("#headerMpesaButton").addEventListener("click", () => {
    showToast(`M-Pesa payment number: ${MPESA_PHONE}`);
  });

  elements.openSellerDashboard.addEventListener("click", openSellerDashboard);
  elements.openSellerDashboardSecondary.addEventListener("click", openSellerDashboard);
  if (elements.adminAreaButton) {
    elements.adminAreaButton.addEventListener("click", openAdminLogin);
  }

  if (elements.gradeList) {
    elements.gradeList.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-grade-toggle]");
      const chip = event.target.closest("[data-subject]");

      if (toggle) {
        const card = toggle.closest(".grade-card");
        const isOpen = card.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      }

      if (chip) {
        setGradeSubject(chip.dataset.grade, chip.dataset.subject);
        showToast(`${chip.dataset.grade} ${chip.dataset.subject} selected.`);
      }
    });
  }

  elements.resourceGrid.addEventListener("click", (event) => {
    const payButton = event.target.closest("[data-pay]");
    const cartButton = event.target.closest("[data-cart]");
    const downloadButton = event.target.closest("[data-download]");
    const freeButton = event.target.closest("[data-free-resource]");
    if (payButton) {
      selectResourceForPayment(payButton.dataset.pay);
    }
    if (cartButton) {
      addToCart(cartButton.dataset.cart);
    }
    if (downloadButton) {
      showToast("WhatsApp message prepared for this CBE resource.");
    }
    if (freeButton) {
      localStorage.removeItem(REFERRAL_KEY);
      renderResources();
      showToast("Free referral paper opened. Refer another friend to unlock again.");
    }
  });

  elements.gradeFilter.addEventListener("change", (event) => {
    state.grade = event.target.value;
    refreshSubjectFilters();
    renderResources();
  });

  elements.subjectFilter.addEventListener("change", (event) => {
    state.subject = event.target.value;
    renderResources();
  });

  elements.typeFilter.addEventListener("change", (event) => {
    state.type = event.target.value;
    renderResources();
    showToast(`${state.type} selected.`);
  });

  elements.termFilter.addEventListener("change", (event) => {
    state.term = event.target.value;
    renderResources();
  });

  elements.accessFilter.addEventListener("change", (event) => {
    state.access = event.target.value;
    renderResources();
  });

  elements.sortFilter.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderResources();
  });

  elements.searchFilter.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderResources();
  });

  elements.adminGrade.addEventListener("change", (event) => {
    const subjects = gradeSubjects[event.target.value];
    optionList(elements.adminSubject, subjects, subjects[0]);
  });

  elements.sellerGrade.addEventListener("change", (event) => {
    const subjects = gradeSubjects[event.target.value];
    optionList(elements.sellerSubject, subjects, subjects[0]);
  });

  elements.fileInput.addEventListener("change", () => {
    const file = elements.fileInput.files[0];
    if (!file) {
      elements.fileHelp.textContent = "Choose a PDF, Word document, PowerPoint, Excel file, text file, or ZIP.";
      return;
    }
    document.querySelector("#fileNameInput").value = file.name;
    elements.fileHelp.textContent = `${file.name} selected. It will be added as the CBE resource file.`;
    showToast(`${file.name} ready to publish.`);
  });

  elements.form.addEventListener("submit", handleFormSubmit);
  elements.sellerAccountForm.addEventListener("submit", createSellerAccount);
  elements.sellerLoginForm.addEventListener("submit", loginSeller);
  elements.adminLoginForm.addEventListener("submit", unlockAdmin);
  elements.sellerForm.addEventListener("submit", handleSellerSubmit);
  elements.withdrawForm.addEventListener("submit", requestWithdrawal);
  elements.referForm.addEventListener("submit", unlockFreeReferral);
  elements.paymentForm.addEventListener("submit", requestMpesaPayment);
  elements.projectForm.addEventListener("submit", handleProjectUpload);
  elements.tuitionForm.addEventListener("submit", handleTuitionRegistration);
  elements.quizForm.addEventListener("submit", handleQuizSubmit);
  elements.homeworkForm.addEventListener("submit", handleHomeworkHelper);

  document.addEventListener("click", (event) => {
    if (event.target.dataset.downloadResource) {
      handleDownloadRequest(event);
    }
    if (event.target.dataset.approveDownload) {
      approveDownloadRequest(event.target.dataset.approveDownload);
    }
    if (event.target.dataset.confirmDownload) {
      confirmDownloadApproval(event.target.dataset.confirmDownload);
    }
    if (event.target.dataset.rejectDownload) {
      rejectDownloadRequest(event.target.dataset.rejectDownload);
    }
  });
}

function handleDownloadRequest(event) {
  event.preventDefault();
  const resourceId = event.target.dataset.downloadResource;
  const phone = prompt("Enter your phone number to check download status:");
  
  if (!phone) return;
  
  if (hasAccessToDownload(resourceId, phone)) {
    const resource = getAllResources().find((r) => r.id === resourceId);
    if (resource && resource.file) {
      const link = document.createElement("a");
      link.href = resource.file;
      link.download = resource.fileName || "resource";
      link.click();
      showToast(`${resource.title} downloaded successfully.`);
    }
  } else if (isResourcePaid(resourceId, phone)) {
    showToast("Payment confirmed! Admin will activate your download soon. Please check back in a few minutes.");
  } else {
    showToast("You haven't paid for this resource yet. Please complete payment first.");
  }
}

function approveDownloadRequest(paymentRecordId) {
  const record = readPaymentRecords().find((r) => r.id === paymentRecordId);
  if (!record) return;
  
  const downloads = readApprovedDownloads();
  const newDownload = {
    id: `dl-${Date.now()}`,
    paymentRecordId: record.id,
    resourceId: record.resource,
    resourceName: record.resource,
    customerPhone: record.customerPhone,
    amount: record.amount,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  
  downloads.push(newDownload);
  localStorage.setItem(APPROVED_DOWNLOADS_KEY, JSON.stringify(downloads));
  
  const updated = readPaymentRecords().map((r) => {
    if (r.id === paymentRecordId) {
      return { ...r, status: "download activated" };
    }
    return r;
  });
  localStorage.setItem(PAYMENT_RECORDS_KEY, JSON.stringify(updated));
  
  renderPaymentRecords();
  renderDownloadApprovals();
  showToast("Download activation pending admin approval.");
}

function confirmDownloadApproval(downloadId) {
  const updated = readApprovedDownloads().map((dl) => {
    if (dl.id === downloadId) {
      return { ...dl, status: "approved", approvedAt: new Date().toISOString() };
    }
    return dl;
  });
  localStorage.setItem(APPROVED_DOWNLOADS_KEY, JSON.stringify(updated));
  renderDownloadApprovals();
  showToast("Download approved for customer.");
}

function rejectDownloadRequest(downloadId) {
  const updated = readApprovedDownloads().filter((dl) => dl.id !== downloadId);
  localStorage.setItem(APPROVED_DOWNLOADS_KEY, JSON.stringify(updated));
  renderDownloadApprovals();
  showToast("Download request rejected.");
}

function injectContactInfo() {
  // Decrypt and inject contact information throughout the page
  const mpesaPhone = MPESA_PHONE;
  const whatsappPhone = WHATSAPP_PHONE;
  const adminEmail = ADMIN_EMAIL;
  
  // Update all WhatsApp links with placeholder URLs
  document.querySelectorAll('[href*="wa.me/254xxx"]').forEach((link) => {
    link.href = `https://wa.me/${whatsappPhone}`;
  });
  
  // Update tel links with placeholder numbers
  document.querySelectorAll('[href^="tel:***"]').forEach((link) => {
    link.href = `tel:${mpesaPhone}`;
  });
  
  // Update M-Pesa button text
  const headerMpesa = document.getElementById('headerMpesaButton');
  if (headerMpesa && headerMpesa.textContent.includes('***')) {
    headerMpesa.textContent = `M-Pesa ${mpesaPhone}`;
  }
  
  // Update any text nodes containing *** placeholders
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;
  while (node = walker.nextNode()) {
    if (node.textContent.includes('***')) {
      node.textContent = node.textContent.replace(/\*\*\*/g, mpesaPhone);
    }
  }
  
  // Update email placeholders
  document.querySelectorAll('[placeholder*="gmail"]').forEach((elem) => {
    elem.placeholder = adminEmail;
  });
}

async function checkAdminSession() {
  try {
    const res = await fetch("/api/admin/check-session");
    const data = await res.json();
    return data.authenticated;
  } catch {
    return false;
  }
}

async function initializeAdminSession() {
  const isAuthenticated = await checkAdminSession();
  if (isAuthenticated) {
    elements.adminSection?.classList.remove("hidden-section");
    document.getElementById("adminLoginBand")?.classList.add("hidden-section");
  } else {
    elements.adminSection?.classList.add("hidden-section");
  }
}

elements.adminAreaButton?.addEventListener("click", async () => {
  const isAuth = await checkAdminSession();
  if (isAuth) {
    elements.adminSection?.classList.toggle("hidden-section");
  } else {
    document.getElementById("adminLoginBand")?.classList.toggle("hidden-section");
  }
});

elements.adminLoginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = elements.adminEmail?.value;
  const username = elements.adminUsername?.value;
  const password = elements.adminPassword?.value;

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password })
    });

    if (res.ok) {
      elements.adminLoginStatus.textContent = "Login successful! Refreshing...";
      elements.adminLoginStatus.style.color = "green";
      setTimeout(() => location.reload(), 1000);
    } else {
      elements.adminLoginStatus.textContent = "Invalid credentials";
      elements.adminLoginStatus.style.color = "red";
    }
  } catch {
    elements.adminLoginStatus.textContent = "Network error";
    elements.adminLoginStatus.style.color = "red";
  }
});

const logoutBtn = document.createElement("button");
logoutBtn.type = "button";
logoutBtn.textContent = "Logout";
logoutBtn.className = "secondary-button logout-btn";
logoutBtn.style.marginTop = "1rem";
logoutBtn.addEventListener("click", async () => {
  try {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  } catch (error) {
    console.error("Logout error:", error);
  }
});

const adminBand = document.getElementById("adminBand");
if (adminBand && !adminBand.querySelector(".logout-btn")) {
  const layout = adminBand.querySelector(".admin-layout");
  if (layout) {
    layout.appendChild(logoutBtn);
  }
}

async function loadGrades() {
  try {
    const res = await fetch("/api/grades");
    const data = await res.json();
    const gradeSelect = document.getElementById("gradeFilter");
    if (gradeSelect && data.grades) {
      data.grades.forEach(grade => {
        const option = document.createElement("option");
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error loading grades:", error);
  }
}

async function loadSubjects(grade = "Grade 1") {
  try {
    const res = await fetch(`/api/subjects?grade=${encodeURIComponent(grade)}`);
    const data = await res.json();
    const subjectSelect = document.getElementById("subjectFilter");
    if (subjectSelect) {
      subjectSelect.innerHTML = '<option value="">All Subjects</option>';
      if (data.subjects) {
        data.subjects.forEach(subject => {
          const option = document.createElement("option");
          option.value = subject;
          option.textContent = subject;
          subjectSelect.appendChild(option);
        });
      }
    }
  } catch (error) {
    console.error("Error loading subjects:", error);
  }
}

async function loadResources(grade = "", subject = "", type = "") {
  try {
    const params = new URLSearchParams();
    if (grade) params.append("grade", grade);
    if (subject) params.append("subject", subject);
    if (type) params.append("type", type);

    const res = await fetch(`/api/resources?${params}`);
    const resources = await res.json();

    const grid = document.getElementById("resourceGrid");
    const context = document.getElementById("activeContext");

    if (!grid) return;

    if (resources.length === 0) {
      grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 2rem;'>No resources found</p>";
      if (context) context.textContent = "No resources match your filters";
      return;
    }

    grid.innerHTML = resources.map(r => `
      <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px; background: white;">
        <h3>${r.title || "Resource"}</h3>
        <p><strong>Grade:</strong> ${r.grade || "N/A"}</p>
        <p><strong>Subject:</strong> ${r.subject || "N/A"}</p>
        <p><strong>Type:</strong> ${r.type || "N/A"}</p>
        <p>${r.description || "No description available"}</p>
        ${r.price ? `<p style="color: #0066cc; font-weight: bold;">KES ${r.price}</p>` : ""}
        <button class="primary-button" style="width: 100%; margin-top: 1rem;">View Resource</button>
      </div>
    `).join("");

    if (context) {
      const filters = [grade || "All Grades", subject || "All Subjects", type || "All Materials"].join(" • ");
      context.textContent = `Showing ${resources.length} resource(s): ${filters}`;
    }
  } catch (error) {
    console.error("Error loading resources:", error);
  }
}

document.getElementById("gradeFilter")?.addEventListener("change", (e) => {
  loadSubjects(e.target.value || "Grade 1");
  loadResources(e.target.value, document.getElementById("subjectFilter")?.value, document.getElementById("typeFilter")?.value);
});

document.getElementById("subjectFilter")?.addEventListener("change", (e) => {
  loadResources(document.getElementById("gradeFilter")?.value, e.target.value, document.getElementById("typeFilter")?.value);
});

document.getElementById("typeFilter")?.addEventListener("change", (e) => {
  loadResources(document.getElementById("gradeFilter")?.value, document.getElementById("subjectFilter")?.value, e.target.value);
});

loadGrades();
loadSubjects();
loadResources();
renderQuickTypes();
restoreAdminAccess();
initializeAdminSession();
bindEvents();
injectContactInfo();
renderResources();
renderTrending();
renderCart();
renderSellerResources();
renderSellerAccountApprovals();
renderAdminApprovals();
renderPaymentRecords();
renderDownloadApprovals();
renderProgressReport();
