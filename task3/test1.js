// Sample data
let assessments = [
  {
    id: 1,
    title: "Frontend Developer Assessment",
    category: "frontend",
    difficulty: "intermediate",
    questions: 15,
    duration: 60,
    status: "active",
    description:
      "Comprehensive assessment for frontend developers covering HTML, CSS, JavaScript, and React.",
  },
  {
    id: 2,
    title: "Backend Developer Assessment",
    category: "backend",
    difficulty: "advanced",
    questions: 20,
    duration: 90,
    status: "active",
    description:
      "Advanced backend assessment covering Node.js, databases, and system design.",
  },
  {
    id: 3,
    title: "Full Stack Developer Assessment",
    category: "fullstack",
    difficulty: "advanced",
    questions: 25,
    duration: 120,
    status: "draft",
    description:
      "Complete full stack assessment covering both frontend and backend technologies.",
  },
];

let candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    position: "frontend-developer",
    assessment: "Frontend Developer Assessment",
    score: 96,
    status: "completed",
    date: "2024-01-15",
    phone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    position: "fullstack-developer",
    assessment: "Full Stack Developer Assessment",
    score: 94,
    status: "completed",
    date: "2024-01-14",
    phone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    position: "backend-developer",
    assessment: "Backend Developer Assessment",
    score: 92,
    status: "in-progress",
    date: "2024-01-16",
    phone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    position: "frontend-developer",
    assessment: "Frontend Developer Assessment",
    score: null,
    status: "invited",
    date: "2024-01-17",
    phone: "+1 (555) 456-7890",
  },
];

let questions = [
  {
    id: 1,
    type: "multiple-choice",
    category: "javascript",
    difficulty: "intermediate",
    question: "What is the difference between 'let' and 'var' in JavaScript?",
    options: [
      "No difference, they are interchangeable",
      "let has block scope, var has function scope",
      "var has block scope, let has function scope",
      "let is for constants, var is for variables",
    ],
    correctAnswer: 1,
    points: 5,
  },
  {
    id: 2,
    type: "coding",
    category: "algorithms",
    difficulty: "advanced",
    question:
      "Write a function to find the longest palindromic substring in a given string.",
    expectedSolution:
      "function longestPalindrome(s) {\n  // Implementation here\n}",
    points: 15,
  },
  {
    id: 3,
    type: "multiple-choice",
    category: "react",
    difficulty: "beginner",
    question: "What is JSX in React?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A CSS framework",
      "A database query language",
    ],
    correctAnswer: 1,
    points: 3,
  },
];

let recentActivity = [
  {
    type: "candidate_completed",
    message: "Sarah Johnson completed Frontend Developer Assessment",
    time: "2 hours ago",
    icon: "check",
  },
  {
    type: "assessment_created",
    message: "New assessment 'Mobile Developer Test' created",
    time: "4 hours ago",
    icon: "plus",
  },
  {
    type: "candidate_invited",
    message: "Alex Rodriguez invited to take assessment",
    time: "6 hours ago",
    icon: "user",
  },
  {
    type: "question_added",
    message: "5 new JavaScript questions added to question bank",
    time: "1 day ago",
    icon: "question",
  },
];

// DOM Elements
const navTabs = document.querySelectorAll(".nav-tab");
const tabContents = document.querySelectorAll(".tab-content");
const quickActionBtns = document.querySelectorAll(".quick-action-btn");

// Modal elements
const createAssessmentModal = document.getElementById("createAssessmentModal");
const addQuestionModal = document.getElementById("addQuestionModal");
const addCandidateModal = document.getElementById("addCandidateModal");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  renderDashboard();
  renderAssessments();
  renderCandidates();
  renderQuestions();
  renderResults();
});

// Event Listeners
function setupEventListeners() {
  // Navigation tabs
  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Quick action buttons
  quickActionBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleQuickAction(btn.dataset.action));
  });

  // Modal buttons
  document
    .getElementById("createAssessmentBtn")
    .addEventListener("click", () => showModal("createAssessmentModal"));
  document
    .getElementById("addQuestionBtn")
    .addEventListener("click", () => showModal("addQuestionModal"));
  document
    .getElementById("addCandidateBtn")
    .addEventListener("click", () => showModal("addCandidateModal"));

  // Close modal buttons
  document
    .getElementById("closeCreateAssessmentModal")
    .addEventListener("click", () => hideModal("createAssessmentModal"));
  document
    .getElementById("closeAddQuestionModal")
    .addEventListener("click", () => hideModal("addQuestionModal"));
  document
    .getElementById("closeAddCandidateModal")
    .addEventListener("click", () => hideModal("addCandidateModal"));

  // Cancel buttons
  document
    .getElementById("cancelCreateAssessment")
    .addEventListener("click", () => hideModal("createAssessmentModal"));
  document
    .getElementById("cancelAddQuestion")
    .addEventListener("click", () => hideModal("addQuestionModal"));
  document
    .getElementById("cancelAddCandidate")
    .addEventListener("click", () => hideModal("addCandidateModal"));

  // Form submissions
  document
    .getElementById("createAssessmentForm")
    .addEventListener("submit", handleCreateAssessment);
  document
    .getElementById("addQuestionForm")
    .addEventListener("submit", handleAddQuestion);
  document
    .getElementById("addCandidateForm")
    .addEventListener("submit", handleAddCandidate);

  // Question type change
  document
    .getElementById("questionType")
    .addEventListener("change", handleQuestionTypeChange);

  // Search and filter inputs
  setupFilters();

  // Export button
  document.getElementById("exportBtn").addEventListener("click", exportResults);
  document
    .getElementById("generateReportBtn")
    .addEventListener("click", generateReport);
}

function setupFilters() {
  // Assessment filters
  document
    .getElementById("assessmentSearch")
    .addEventListener("input", filterAssessments);
  document
    .getElementById("assessmentStatusFilter")
    .addEventListener("change", filterAssessments);
  document
    .getElementById("assessmentCategoryFilter")
    .addEventListener("change", filterAssessments);
  document
    .getElementById("assessmentDifficultyFilter")
    .addEventListener("change", filterAssessments);

  // Candidate filters
  document
    .getElementById("candidateSearch")
    .addEventListener("input", filterCandidates);
  document
    .getElementById("candidateStatusFilter")
    .addEventListener("change", filterCandidates);
  document
    .getElementById("candidatePositionFilter")
    .addEventListener("change", filterCandidates);
  document
    .getElementById("candidateScoreFilter")
    .addEventListener("change", filterCandidates);

  // Question filters
  document
    .getElementById("questionSearch")
    .addEventListener("input", filterQuestions);
  document
    .getElementById("questionTypeFilter")
    .addEventListener("change", filterQuestions);
  document
    .getElementById("questionCategoryFilter")
    .addEventListener("change", filterQuestions);
  document
    .getElementById("questionDifficultyFilter")
    .addEventListener("change", filterQuestions);
}

// Tab Management
function switchTab(tabName) {
  // Update nav tabs
  navTabs.forEach((tab) => {
    tab.classList.remove("active", "border-primary-500", "text-primary-600");
    tab.classList.add("border-transparent", "text-gray-500");
  });

  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  activeTab.classList.add("active", "border-primary-500", "text-primary-600");
  activeTab.classList.remove("border-transparent", "text-gray-500");

  // Update tab content
  tabContents.forEach((content) => {
    content.classList.add("hidden");
  });

  document.getElementById(`${tabName}-tab`).classList.remove("hidden");
}

// Quick Actions
function handleQuickAction(action) {
  switch (action) {
    case "create-assessment":
      switchTab("assessments");
      setTimeout(() => showModal("createAssessmentModal"), 100);
      break;
    case "add-candidate":
      switchTab("candidates");
      setTimeout(() => showModal("addCandidateModal"), 100);
      break;
    case "manage-questions":
      switchTab("questions");
      break;
    case "view-reports":
      switchTab("results");
      break;
  }
}

// Modal Management
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Populate assessment options for candidate modal
  if (modalId === "addCandidateModal") {
    populateAssessmentOptions();
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
  modal.classList.remove("flex");

  // Reset forms
  const form = modal.querySelector("form");
  if (form) form.reset();

  // Hide question type specific fields
  if (modalId === "addQuestionModal") {
    document.getElementById("multipleChoiceOptions").classList.add("hidden");
  }
}

// Dashboard Functions
function renderDashboard() {
  renderRecentActivity();
  updateDashboardStats();
}

function renderRecentActivity() {
  const container = document.getElementById("recentActivity");
  container.innerHTML = "";

  recentActivity.forEach((activity) => {
    const activityElement = document.createElement("div");
    activityElement.className = "flex items-start space-x-3";

    const iconClass = getActivityIcon(activity.icon);

    activityElement.innerHTML = `
            <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    ${iconClass}
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900">${activity.message}</p>
                <p class="text-xs text-gray-500">${activity.time}</p>
            </div>
        `;

    container.appendChild(activityElement);
  });
}

function getActivityIcon(iconType) {
  const icons = {
    check:
      '<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>',
    plus: '<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>',
    user: '<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>',
    question:
      '<svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
  };
  return icons[iconType] || icons.check;
}

function updateDashboardStats() {
  document.getElementById("activeAssessments").textContent = assessments.filter(
    (a) => a.status === "active"
  ).length;
  document.getElementById("totalCandidates").textContent = candidates.length;
  document.getElementById("pendingReviews").textContent = candidates.filter(
    (c) => c.status === "completed" && !c.reviewed
  ).length;

  const completedCandidates = candidates.filter((c) => c.score !== null);
  const avgScore =
    completedCandidates.length > 0
      ? Math.round(
          completedCandidates.reduce((sum, c) => sum + c.score, 0) /
            completedCandidates.length
        )
      : 0;
  document.getElementById("avgScore").textContent = `${avgScore}%`;
}

// Assessment Functions
function renderAssessments() {
  const tbody = document.getElementById("assessmentsList");
  tbody.innerHTML = "";

  assessments.forEach((assessment) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";

    const statusBadge = getStatusBadge(assessment.status);
    const difficultyBadge = getDifficultyBadge(assessment.difficulty);

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div>
                    <div class="text-sm font-medium text-gray-900">${assessment.title}</div>
                    <div class="text-sm text-gray-500">${assessment.description}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${assessment.category}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${difficultyBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${assessment.questions}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${assessment.duration} min
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteAssessment(${assessment.id})">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

function filterAssessments() {
  const search = document
    .getElementById("assessmentSearch")
    .value.toLowerCase();
  const status = document.getElementById("assessmentStatusFilter").value;
  const category = document.getElementById("assessmentCategoryFilter").value;
  const difficulty = document.getElementById(
    "assessmentDifficultyFilter"
  ).value;

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(search) ||
      assessment.description.toLowerCase().includes(search);
    const matchesStatus = !status || assessment.status === status;
    const matchesCategory = !category || assessment.category === category;
    const matchesDifficulty =
      !difficulty || assessment.difficulty === difficulty;

    return (
      matchesSearch && matchesStatus && matchesCategory && matchesDifficulty
    );
  });

  renderFilteredAssessments(filteredAssessments);
}

function renderFilteredAssessments(filteredAssessments) {
  const tbody = document.getElementById("assessmentsList");
  tbody.innerHTML = "";

  filteredAssessments.forEach((assessment) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";

    const statusBadge = getStatusBadge(assessment.status);
    const difficultyBadge = getDifficultyBadge(assessment.difficulty);

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div>
                    <div class="text-sm font-medium text-gray-900">${assessment.title}</div>
                    <div class="text-sm text-gray-500">${assessment.description}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${assessment.category}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${difficultyBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${assessment.questions}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${assessment.duration} min
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteAssessment(${assessment.id})">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

function handleCreateAssessment(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newAssessment = {
    id: Date.now(),
    title: document.getElementById("assessmentTitle").value,
    category: document.getElementById("assessmentCategory").value,
    difficulty: document.getElementById("assessmentDifficulty").value,
    duration: parseInt(document.getElementById("assessmentDuration").value),
    description: document.getElementById("assessmentDescription").value,
    questions: 0,
    status: "draft",
  };

  assessments.push(newAssessment);
  renderAssessments();
  hideModal("createAssessmentModal");
  showToast("Assessment created successfully!");

  // Add to recent activity
  recentActivity.unshift({
    type: "assessment_created",
    message: `New assessment '${newAssessment.title}' created`,
    time: "Just now",
    icon: "plus",
  });
  renderRecentActivity();
}

function deleteAssessment(id) {
  if (confirm("Are you sure you want to delete this assessment?")) {
    assessments = assessments.filter((a) => a.id !== id);
    renderAssessments();
    showToast("Assessment deleted successfully!");
  }
}

// Candidate Functions
function renderCandidates() {
  const tbody = document.getElementById("candidatesList");
  tbody.innerHTML = "";

  candidates.forEach((candidate) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";

    const statusBadge = getCandidateStatusBadge(candidate.status);
    const scoreDisplay = candidate.score !== null ? `${candidate.score}%` : "-";

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${
                          candidate.name
                        }</div>
                        <div class="text-sm text-gray-500">${
                          candidate.email
                        }</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ${candidate.position.replace("-", " ")}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${candidate.assessment}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${scoreDisplay}</div>
                ${candidate.score !== null ? getScoreBar(candidate.score) : ""}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(candidate.date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">View</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteCandidate(${
                  candidate.id
                })">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

function filterCandidates() {
  const search = document.getElementById("candidateSearch").value.toLowerCase();
  const status = document.getElementById("candidateStatusFilter").value;
  const position = document.getElementById("candidatePositionFilter").value;
  const scoreRange = document.getElementById("candidateScoreFilter").value;

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(search) ||
      candidate.email.toLowerCase().includes(search);
    const matchesStatus = !status || candidate.status === status;
    const matchesPosition = !position || candidate.position === position;
    const matchesScore =
      !scoreRange || checkScoreRange(candidate.score, scoreRange);

    return matchesSearch && matchesStatus && matchesPosition && matchesScore;
  });

  renderFilteredCandidates(filteredCandidates);
}

function renderFilteredCandidates(filteredCandidates) {
  const tbody = document.getElementById("candidatesList");
  tbody.innerHTML = "";

  filteredCandidates.forEach((candidate) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";

    const statusBadge = getCandidateStatusBadge(candidate.status);
    const scoreDisplay = candidate.score !== null ? `${candidate.score}%` : "-";

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${
                          candidate.name
                        }</div>
                        <div class="text-sm text-gray-500">${
                          candidate.email
                        }</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ${candidate.position.replace("-", " ")}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${candidate.assessment}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${scoreDisplay}</div>
                ${candidate.score !== null ? getScoreBar(candidate.score) : ""}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(candidate.date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">View</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteCandidate(${
                  candidate.id
                })">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

function populateAssessmentOptions() {
  const select = document.getElementById("candidateAssessment");
  select.innerHTML = '<option value="">Select Assessment</option>';

  assessments
    .filter((a) => a.status === "active")
    .forEach((assessment) => {
      const option = document.createElement("option");
      option.value = assessment.title;
      option.textContent = assessment.title;
      select.appendChild(option);
    });
}

function handleAddCandidate(e) {
  e.preventDefault();

  const newCandidate = {
    id: Date.now(),
    name: document.getElementById("candidateName").value,
    email: document.getElementById("candidateEmail").value,
    position: document.getElementById("candidatePosition").value,
    assessment: document.getElementById("candidateAssessment").value,
    phone: document.getElementById("candidatePhone").value,
    score: null,
    status: "invited",
    date: new Date().toISOString().split("T")[0],
  };

  candidates.push(newCandidate);
  renderCandidates();
  hideModal("addCandidateModal");
  showToast("Candidate added successfully!");

  // Add to recent activity
  recentActivity.unshift({
    type: "candidate_invited",
    message: `${newCandidate.name} invited to take assessment`,
    time: "Just now",
    icon: "user",
  });
  renderRecentActivity();
  updateDashboardStats();
}

function deleteCandidate(id) {
  if (confirm("Are you sure you want to delete this candidate?")) {
    candidates = candidates.filter((c) => c.id !== id);
    renderCandidates();
    showToast("Candidate deleted successfully!");
    updateDashboardStats();
  }
}

function checkScoreRange(score, range) {
  if (score === null) return range === "0-59";

  const [min, max] = range.split("-").map(Number);
  return score >= min && score <= max;
}

// Question Functions
function renderQuestions() {
  const container = document.getElementById("questionsList");
  container.innerHTML = "";

  questions.forEach((question) => {
    const questionElement = document.createElement("div");
    questionElement.className =
      "bg-white rounded-xl shadow-sm border border-gray-200 p-6";

    const typeBadge = getQuestionTypeBadge(question.type);
    const categoryBadge = getCategoryBadge(question.category);
    const difficultyBadge = getDifficultyBadge(question.difficulty);

    questionElement.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex space-x-2">
                    ${typeBadge}
                    ${categoryBadge}
                    ${difficultyBadge}
                </div>
                <div class="flex space-x-2">
                    <button class="text-primary-600 hover:text-primary-900 text-sm">Edit</button>
                    <button class="text-red-600 hover:text-red-900 text-sm" onclick="deleteQuestion(${
                      question.id
                    })">Delete</button>
                </div>
            </div>
            <div class="mb-4">
                <h4 class="text-lg font-medium text-gray-900 mb-2">Question ${
                  question.id
                }</h4>
                <p class="text-gray-700">${question.question}</p>
            </div>
            ${
              question.type === "multiple-choice"
                ? renderMultipleChoiceOptions(question)
                : ""
            }
            <div class="flex justify-between items-center text-sm text-gray-500">
                <span>Points: ${question.points}</span>
                <span>ID: ${question.id}</span>
            </div>
        `;

    container.appendChild(questionElement);
  });
}

function renderMultipleChoiceOptions(question) {
  return `
        <div class="mb-4">
            <h5 class="text-sm font-medium text-gray-700 mb-2">Options:</h5>
            <div class="space-y-2">
                ${question.options
                  .map(
                    (option, index) => `
                    <div class="flex items-center space-x-2">
                        <div class="w-4 h-4 rounded-full border-2 ${
                          index === question.correctAnswer
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }"></div>
                        <span class="text-sm ${
                          index === question.correctAnswer
                            ? "font-medium text-green-700"
                            : "text-gray-600"
                        }">${option}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;
}

function filterQuestions() {
  const search = document.getElementById("questionSearch").value.toLowerCase();
  const type = document.getElementById("questionTypeFilter").value;
  const category = document.getElementById("questionCategoryFilter").value;
  const difficulty = document.getElementById("questionDifficultyFilter").value;

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(search);
    const matchesType = !type || question.type === type;
    const matchesCategory = !category || question.category === category;
    const matchesDifficulty = !difficulty || question.difficulty === difficulty;

    return matchesSearch && matchesType && matchesCategory && matchesDifficulty;
  });

  renderFilteredQuestions(filteredQuestions);
}

function renderFilteredQuestions(filteredQuestions) {
  const container = document.getElementById("questionsList");
  container.innerHTML = "";

  filteredQuestions.forEach((question) => {
    const questionElement = document.createElement("div");
    questionElement.className =
      "bg-white rounded-xl shadow-sm border border-gray-200 p-6";

    const typeBadge = getQuestionTypeBadge(question.type);
    const categoryBadge = getCategoryBadge(question.category);
    const difficultyBadge = getDifficultyBadge(question.difficulty);

    questionElement.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex space-x-2">
                    ${typeBadge}
                    ${categoryBadge}
                    ${difficultyBadge}
                </div>
                <div class="flex space-x-2">
                    <button class="text-primary-600 hover:text-primary-900 text-sm">Edit</button>
                    <button class="text-red-600 hover:text-red-900 text-sm" onclick="deleteQuestion(${
                      question.id
                    })">Delete</button>
                </div>
            </div>
            <div class="mb-4">
                <h4 class="text-lg font-medium text-gray-900 mb-2">Question ${
                  question.id
                }</h4>
                <p class="text-gray-700">${question.question}</p>
            </div>
            ${
              question.type === "multiple-choice"
                ? renderMultipleChoiceOptions(question)
                : ""
            }
            <div class="flex justify-between items-center text-sm text-gray-500">
                <span>Points: ${question.points}</span>
                <span>ID: ${question.id}</span>
            </div>
        `;

    container.appendChild(questionElement);
  });
}

function handleQuestionTypeChange() {
  const questionType = document.getElementById("questionType").value;
  const multipleChoiceOptions = document.getElementById(
    "multipleChoiceOptions"
  );

  if (questionType === "multiple-choice") {
    multipleChoiceOptions.classList.remove("hidden");
  } else {
    multipleChoiceOptions.classList.add("hidden");
  }
}

function handleAddQuestion(e) {
  e.preventDefault();

  const questionType = document.getElementById("questionType").value;
  const newQuestion = {
    id: Date.now(),
    type: questionType,
    category: document.getElementById("questionCategory").value,
    difficulty: document.getElementById("questionDifficulty").value,
    question: document.getElementById("questionText").value,
    points: questionType === "coding" ? 15 : questionType === "essay" ? 10 : 5,
  };

  if (questionType === "multiple-choice") {
    const options = Array.from(
      document.querySelectorAll('#multipleChoiceOptions input[type="text"]')
    )
      .map((input) => input.value)
      .filter((value) => value.trim() !== "");

    const correctAnswer = parseInt(
      document.querySelector('input[name="correctAnswer"]:checked')?.value || 0
    );

    newQuestion.options = options;
    newQuestion.correctAnswer = correctAnswer;
  }

  questions.push(newQuestion);
  renderQuestions();
  hideModal("addQuestionModal");
  showToast("Question added successfully!");

  // Add to recent activity
  recentActivity.unshift({
    type: "question_added",
    message: `New ${questionType} question added to question bank`,
    time: "Just now",
    icon: "question",
  });
  renderRecentActivity();
}

function deleteQuestion(id) {
  if (confirm("Are you sure you want to delete this question?")) {
    questions = questions.filter((q) => q.id !== id);
    renderQuestions();
    showToast("Question deleted successfully!");
  }
}

// Results Functions
function renderResults() {
  const tbody = document.getElementById("resultsList");
  tbody.innerHTML = "";

  const completedCandidates = candidates.filter(
    (c) => c.status === "completed"
  );

  completedCandidates.forEach((candidate) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";

    const timeTaken = Math.floor(Math.random() * 60) + 30; // Random time between 30-90 minutes

    row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${
                          candidate.name
                        }</div>
                        <div class="text-sm text-gray-500">${
                          candidate.email
                        }</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${candidate.assessment}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">${
                      candidate.score
                    }%</div>
                    <div class="ml-2 w-16">
                        ${getScoreBar(candidate.score)}
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${timeTaken} min
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(candidate.date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">View Details</button>
                <button class="text-success-600 hover:text-success-900">Download Report</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

// Utility Functions
function getStatusBadge(status) {
  const badges = {
    active:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">Active</span>',
    draft:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">Draft</span>',
    completed:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Completed</span>',
  };
  return badges[status] || badges.draft;
}

function getDifficultyBadge(difficulty) {
  const badges = {
    beginner:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Beginner</span>',
    intermediate:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Intermediate</span>',
    advanced:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Advanced</span>',
  };
  return badges[difficulty] || badges.beginner;
}

function getCandidateStatusBadge(status) {
  const badges = {
    invited:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Invited</span>',
    "in-progress":
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">In Progress</span>',
    completed:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">Completed</span>',
    reviewed:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Reviewed</span>',
  };
  return badges[status] || badges.invited;
}

function getQuestionTypeBadge(type) {
  const badges = {
    "multiple-choice":
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Multiple Choice</span>',
    coding:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Coding</span>',
    essay:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Essay</span>',
    "true-false":
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">True/False</span>',
  };
  return badges[type] || badges["multiple-choice"];
}

function getCategoryBadge(category) {
  const badges = {
    javascript:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">JavaScript</span>',
    python:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Python</span>',
    react:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">React</span>',
    nodejs:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Node.js</span>',
    algorithms:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Algorithms</span>',
    databases:
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Databases</span>',
  };
  return badges[category] || badges.javascript;
}

function getScoreBar(score) {
  const color =
    score >= 90
      ? "bg-green-500"
      : score >= 80
      ? "bg-blue-500"
      : score >= 70
      ? "bg-yellow-500"
      : "bg-red-500";
  return `
        <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="${color} h-2 rounded-full" style="width: ${score}%"></div>
        </div>
    `;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;

  if (type === "error") {
    toast.classList.remove("bg-green-500");
    toast.classList.add("bg-red-500");
  } else {
    toast.classList.remove("bg-red-500");
    toast.classList.add("bg-green-500");
  }

  toast.classList.remove("translate-x-full");

  setTimeout(() => {
    toast.classList.add("translate-x-full");
  }, 3000);
}

function exportResults() {
  const completedCandidates = candidates.filter(
    (c) => c.status === "completed"
  );
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Name,Email,Position,Assessment,Score,Date\n" +
    completedCandidates
      .map(
        (c) =>
          `${c.name},${c.email},${c.position},${c.assessment},${c.score}%,${c.date}`
      )
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "assessment_results.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Results exported successfully!");
}

function generateReport() {
  showToast("Report generated successfully!");
  // In a real application, this would generate a comprehensive PDF report
}
