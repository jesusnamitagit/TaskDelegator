// Email templates data
const emailTemplates = [
  {
    id: 1,
    title: "Interview Invitation",
    category: "interview",
    subject: "Interview Invitation - {{position}} Position",
    content: `Dear {{recipientName}},

Thank you for your interest in the {{position}} position at {{companyName}}. We were impressed with your application and would like to invite you for an interview.

Interview Details:
- Date: {{date}}
- Time: [Please specify time]
- Location: [Please specify location/virtual meeting link]
- Duration: Approximately 1 hour

Please confirm your availability by replying to this email. If the proposed time doesn't work for you, please let us know your preferred time slots.

We look forward to meeting you and discussing how your skills and experience align with our team's needs.

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 2,
    title: "Interview Rejection",
    category: "interview",
    subject: "Update on Your Application - {{position}} Position",
    content: `Dear {{recipientName}},

Thank you for taking the time to interview for the {{position}} position at {{companyName}}. We appreciate your interest in joining our team and the effort you put into the interview process.

After careful consideration, we have decided to move forward with another candidate whose experience more closely aligns with our current needs.

This was a difficult decision as we were impressed with your qualifications and professionalism. We encourage you to apply for future opportunities that match your skills and interests.

We wish you all the best in your job search and future endeavors.

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 3,
    title: "Leave Approval",
    category: "leave",
    subject: "Leave Request Approved",
    content: `Dear {{recipientName}},

Your leave request has been approved for the following period:
- Start Date: [Start Date]
- End Date: [End Date]
- Total Days: [Number of days]
- Type: [Leave type]

Please ensure that:
1. All pending work is completed or properly delegated
2. Your out-of-office message is set up
3. Emergency contact information is provided to your supervisor

If you have any questions or need to make changes to your leave dates, please contact HR as soon as possible.

Enjoy your time off!

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 4,
    title: "Leave Rejection",
    category: "leave",
    subject: "Leave Request - Unable to Approve",
    content: `Dear {{recipientName}},

Thank you for submitting your leave request for [dates]. Unfortunately, we are unable to approve your request at this time due to [reason - business needs, staffing requirements, etc.].

We understand this may be disappointing, and we'd like to work with you to find alternative dates that might work better for both you and the team.

Please feel free to submit a new request for different dates, or contact me directly to discuss possible alternatives.

Thank you for your understanding.

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 5,
    title: "Policy Update Notification",
    category: "policy",
    subject: "Important Policy Update - {{companyName}}",
    content: `Dear {{recipientName}},

We are writing to inform you of an important update to our company policies, effective {{date}}.

[Brief description of the policy change]

Key Changes:
- [Change 1]
- [Change 2]
- [Change 3]

The updated policy document is available on our company intranet. Please review the changes carefully and direct any questions to the HR department.

All employees are required to acknowledge receipt of this policy update by [deadline date].

Thank you for your attention to this matter.

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 6,
    title: "Welcome New Employee",
    category: "general",
    subject: "Welcome to {{companyName}}!",
    content: `Dear {{recipientName}},

Welcome to {{companyName}}! We are excited to have you join our team as {{position}}.

Your first day details:
- Start Date: {{date}}
- Start Time: [Time]
- Location: [Address/Remote details]
- Reporting Manager: [Manager name]

Before your first day, please:
1. Complete the attached new hire paperwork
2. Bring required identification documents
3. Review the employee handbook (attached)

If you have any questions before your start date, please don't hesitate to reach out.

We look forward to working with you!

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 7,
    title: "Performance Review Reminder",
    category: "general",
    subject: "Performance Review Scheduled - {{recipientName}}",
    content: `Dear {{recipientName}},

This is a reminder that your annual performance review is scheduled for {{date}}.

Please prepare the following:
- Self-assessment form (due 3 days before review)
- List of accomplishments from the past year
- Goals for the upcoming year
- Any questions or concerns you'd like to discuss

Your review will be conducted by [Manager name] and will take approximately 1 hour.

If you need to reschedule, please contact HR at least 48 hours in advance.

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
  {
    id: 8,
    title: "Training Invitation",
    category: "general",
    subject: "Training Invitation - [Training Title]",
    content: `Dear {{recipientName}},

You are invited to attend the following training session:

Training Details:
- Title: [Training title]
- Date: {{date}}
- Time: [Start time] - [End time]
- Location: [Location/Virtual link]
- Trainer: [Trainer name]

This training is [mandatory/optional] and will cover:
- [Topic 1]
- [Topic 2]
- [Topic 3]

Please confirm your attendance by replying to this email by [RSVP date].

If you have any questions about the training content or logistics, please don't hesitate to ask.

Best regards,
{{hrName}}
HR Department
{{companyName}}`,
  },
];

// DOM Elements
const templateList = document.getElementById("templateList");
const templateSearch = document.getElementById("templateSearch");
const categoryBtns = document.querySelectorAll(".category-btn");
const emailBody = document.getElementById("emailBody");
const emailSubject = document.getElementById("emailSubject");
const recipientName = document.getElementById("recipientName");
const recipientEmail = document.getElementById("recipientEmail");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const previewBtn = document.getElementById("previewBtn");
const copyBtn = document.getElementById("copyBtn");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
const previewModal = document.getElementById("previewModal");
const closePreviewBtn = document.getElementById("closePreviewBtn");
const previewContent = document.getElementById("previewContent");
const variableBtns = document.querySelectorAll(".variable-btn");
const recentTemplates = document.getElementById("recentTemplates");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

// State
let currentCategory = "all";
let filteredTemplates = emailTemplates;
let recentlyUsed = JSON.parse(localStorage.getItem("recentTemplates")) || [];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  renderTemplates();
  renderRecentTemplates();
  setupEventListeners();
  updateCounts();
});

// Event Listeners
function setupEventListeners() {
  // Template search
  templateSearch.addEventListener("input", handleSearch);

  // Category buttons
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () =>
      handleCategoryChange(btn.dataset.category)
    );
  });

  // Email body changes
  emailBody.addEventListener("input", updateCounts);
  emailBody.addEventListener("input", debounce(autoSave, 1000));

  // Variable buttons
  variableBtns.forEach((btn) => {
    btn.addEventListener("click", () => insertVariable(btn.dataset.variable));
  });

  // Action buttons
  previewBtn.addEventListener("click", showPreview);
  copyBtn.addEventListener("click", copyToClipboard);
  sendBtn.addEventListener("click", sendEmail);
  clearBtn.addEventListener("click", clearForm);
  resetBtn.addEventListener("click", resetForm);

  // Modal
  closePreviewBtn.addEventListener("click", hidePreview);
  previewModal.addEventListener("click", (e) => {
    if (e.target === previewModal) hidePreview();
  });

  // Auto-replace variables when recipient name changes
  recipientName.addEventListener("input", updateVariables);
}

// Template Functions
function renderTemplates() {
  templateList.innerHTML = "";

  filteredTemplates.forEach((template) => {
    const templateElement = document.createElement("div");
    templateElement.className =
      "template-item p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors";
    templateElement.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900 text-sm mb-1">${template.title}</h4>
                    <p class="text-xs text-gray-500 capitalize">${template.category}</p>
                </div>
                <div class="flex space-x-1 ml-2">
                    <button class="use-template-btn p-1 text-gray-400 hover:text-primary-600 transition-colors" data-template-id="${template.id}" title="Use Template">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </button>
                    <button class="preview-template-btn p-1 text-gray-400 hover:text-blue-600 transition-colors" data-template-id="${template.id}" title="Preview">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

    // Add event listeners
    const useBtn = templateElement.querySelector(".use-template-btn");
    const previewBtn = templateElement.querySelector(".preview-template-btn");

    useBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      useTemplate(template.id);
    });

    previewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      previewTemplate(template.id);
    });

    templateElement.addEventListener("click", () => useTemplate(template.id));

    templateList.appendChild(templateElement);
  });
}

function renderRecentTemplates() {
  recentTemplates.innerHTML = "";

  if (recentlyUsed.length === 0) {
    recentTemplates.innerHTML = `
            <div class="col-span-2 text-center py-8 text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-sm">No recent templates used</p>
            </div>
        `;
    return;
  }

  recentlyUsed.slice(0, 4).forEach((templateId) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      const recentElement = document.createElement("div");
      recentElement.className =
        "p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors";
      recentElement.innerHTML = `
                <h4 class="font-medium text-gray-900 text-sm mb-1">${template.title}</h4>
                <p class="text-xs text-gray-500 capitalize">${template.category}</p>
            `;
      recentElement.addEventListener("click", () => useTemplate(template.id));
      recentTemplates.appendChild(recentElement);
    }
  });
}

function handleSearch() {
  const searchTerm = templateSearch.value.toLowerCase();
  filteredTemplates = emailTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm) ||
      template.content.toLowerCase().includes(searchTerm)
  );

  if (currentCategory !== "all") {
    filteredTemplates = filteredTemplates.filter(
      (template) => template.category === currentCategory
    );
  }

  renderTemplates();
}

function handleCategoryChange(category) {
  currentCategory = category;

  // Update button styles
  categoryBtns.forEach((btn) => {
    btn.classList.remove(
      "bg-primary-50",
      "text-primary-700",
      "border-primary-200"
    );
    btn.classList.add("hover:bg-gray-50");
  });

  const activeBtn = document.querySelector(`[data-category="${category}"]`);
  activeBtn.classList.add(
    "bg-primary-50",
    "text-primary-700",
    "border-primary-200"
  );
  activeBtn.classList.remove("hover:bg-gray-50");

  // Filter templates
  if (category === "all") {
    filteredTemplates = emailTemplates;
  } else {
    filteredTemplates = emailTemplates.filter(
      (template) => template.category === category
    );
  }

  // Apply search filter if active
  const searchTerm = templateSearch.value.toLowerCase();
  if (searchTerm) {
    filteredTemplates = filteredTemplates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm) ||
        template.content.toLowerCase().includes(searchTerm)
    );
  }

  renderTemplates();
}

function useTemplate(templateId) {
  const template = emailTemplates.find((t) => t.id === templateId);
  if (template) {
    emailSubject.value = template.subject;
    emailBody.value = template.content;
    updateCounts();

    // Add to recent templates
    addToRecent(templateId);

    showToast("Template loaded successfully!");
  }
}

function previewTemplate(templateId) {
  const template = emailTemplates.find((t) => t.id === templateId);
  if (template) {
    const processedContent = processVariables(template.content);
    const processedSubject = processVariables(template.subject);

    previewContent.innerHTML = `
            <div class="mb-4">
                <h4 class="font-semibold text-gray-900 mb-2">Subject:</h4>
                <p class="text-gray-700 bg-gray-50 p-2 rounded">${processedSubject}</p>
            </div>
            <div>
                <h4 class="font-semibold text-gray-900 mb-2">Content:</h4>
                <div class="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded">${processedContent}</div>
            </div>
        `;

    previewModal.classList.remove("hidden");
    previewModal.classList.add("flex");
  }
}

function addToRecent(templateId) {
  recentlyUsed = recentlyUsed.filter((id) => id !== templateId);
  recentlyUsed.unshift(templateId);
  recentlyUsed = recentlyUsed.slice(0, 10); // Keep only last 10

  localStorage.setItem("recentTemplates", JSON.stringify(recentlyUsed));
  renderRecentTemplates();
}

// Email Functions
function insertVariable(variable) {
  const cursorPos = emailBody.selectionStart;
  const textBefore = emailBody.value.substring(0, cursorPos);
  const textAfter = emailBody.value.substring(cursorPos);

  emailBody.value = textBefore + variable + textAfter;
  emailBody.focus();
  emailBody.setSelectionRange(
    cursorPos + variable.length,
    cursorPos + variable.length
  );

  updateCounts();
}

function processVariables(text) {
  const variables = {
    "{{recipientName}}": recipientName.value || "[Recipient Name]",
    "{{companyName}}": "Your Company Name",
    "{{position}}": "[Position Title]",
    "{{date}}": new Date().toLocaleDateString(),
    "{{hrName}}": "HR Representative",
  };

  let processedText = text;
  Object.keys(variables).forEach((variable) => {
    processedText = processedText.replace(
      new RegExp(variable.replace(/[{}]/g, "\\$&"), "g"),
      variables[variable]
    );
  });

  return processedText;
}

function updateVariables() {
  // Auto-update recipient name in email body
  if (recipientName.value) {
    emailBody.value = emailBody.value.replace(
      /\{\{recipientName\}\}/g,
      recipientName.value
    );
  }
}

function updateCounts() {
  const text = emailBody.value;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  wordCount.textContent = words;
  charCount.textContent = chars;
}

function showPreview() {
  const processedContent = processVariables(emailBody.value);
  const processedSubject = processVariables(emailSubject.value);

  previewContent.innerHTML = `
        <div class="mb-4">
            <h4 class="font-semibold text-gray-900 mb-2">To:</h4>
            <p class="text-gray-700">${
              recipientEmail.value || "[Recipient Email]"
            }</p>
        </div>
        <div class="mb-4">
            <h4 class="font-semibold text-gray-900 mb-2">Subject:</h4>
            <p class="text-gray-700 bg-gray-50 p-2 rounded">${
              processedSubject || "[No Subject]"
            }</p>
        </div>
        <div>
            <h4 class="font-semibold text-gray-900 mb-2">Content:</h4>
            <div class="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded">${
              processedContent || "[No Content]"
            }</div>
        </div>
    `;

  previewModal.classList.remove("hidden");
  previewModal.classList.add("flex");
}

function hidePreview() {
  previewModal.classList.add("hidden");
  previewModal.classList.remove("flex");
}

function copyToClipboard() {
  const processedContent = processVariables(emailBody.value);

  navigator.clipboard
    .writeText(processedContent)
    .then(() => {
      showToast("Email content copied to clipboard!");
    })
    .catch(() => {
      showToast("Failed to copy to clipboard", "error");
    });
}

function sendEmail() {
  if (!recipientEmail.value || !emailSubject.value || !emailBody.value) {
    showToast("Please fill in all required fields", "error");
    return;
  }

  // In a real application, this would send the email via an API
  showToast("Email sent successfully!");

  // Clear form after sending
  setTimeout(() => {
    clearForm();
  }, 1000);
}

function clearForm() {
  emailBody.value = "";
  emailSubject.value = "";
  recipientEmail.value = "";
  recipientName.value = "";
  updateCounts();
}

function resetForm() {
  if (
    confirm(
      "Are you sure you want to reset the form? All unsaved changes will be lost."
    )
  ) {
    clearForm();
    showToast("Form reset successfully!");
  }
}

// Utility Functions
function autoSave() {
  const formData = {
    subject: emailSubject.value,
    body: emailBody.value,
    recipientEmail: recipientEmail.value,
    recipientName: recipientName.value,
    timestamp: Date.now(),
  };

  localStorage.setItem("draftEmail", JSON.stringify(formData));
}

function loadDraft() {
  const draft = localStorage.getItem("draftEmail");
  if (draft) {
    const data = JSON.parse(draft);
    emailSubject.value = data.subject || "";
    emailBody.value = data.body || "";
    recipientEmail.value = data.recipientEmail || "";
    recipientName.value = data.recipientName || "";
    updateCounts();
  }
}

function showToast(message, type = "success") {
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

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Load draft on page load
window.addEventListener("load", loadDraft);
