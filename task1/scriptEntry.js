// Sample data
let requests = [
  {
    id: 1,
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    reason: "Family vacation",
    type: "vacation",
    status: "approved",
    submittedAt: "2024-01-01",
    days: 5,
  },
  {
    id: 2,
    startDate: "2024-02-14",
    endDate: "2024-02-14",
    reason: "Medical appointment",
    type: "personal",
    status: "pending",
    submittedAt: "2024-01-28",
    days: 1,
  },
  {
    id: 3,
    startDate: "2024-01-22",
    endDate: "2024-01-24",
    reason: "Sick leave",
    type: "sick",
    status: "denied",
    submittedAt: "2024-01-20",
    days: 3,
  },
];

let currentDate = new Date();

// DOM Elements
const toggleFormBtn = document.getElementById("toggleFormBtn");
const requestForm = document.getElementById("requestForm");
const cancelBtn = document.getElementById("cancelBtn");
const requestsList = document.getElementById("requestsList");
const calendarTitle = document.getElementById("calendarTitle");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  renderRequests();
  renderCalendar();

  toggleFormBtn.addEventListener("click", toggleForm);
  cancelBtn.addEventListener("click", hideForm);
  requestForm.addEventListener("submit", handleFormSubmit);
  prevMonthBtn.addEventListener("click", () => navigateMonth(-1));
  nextMonthBtn.addEventListener("click", () => navigateMonth(1));

  // Date validation
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  startDateInput.addEventListener("change", validateDates);
  endDateInput.addEventListener("change", validateDates);
});

// Form Functions
function toggleForm() {
  const isVisible = requestForm.style.display !== "none";
  if (isVisible) {
    hideForm();
  } else {
    showForm();
  }
}

function showForm() {
  requestForm.style.display = "block";
  toggleFormBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Cancel
    `;
}

function hideForm() {
  requestForm.style.display = "none";
  toggleFormBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Request
    `;
  clearForm();
  clearErrors();
}

function clearForm() {
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("reason").value = "";
  document.getElementById("requestType").value = "vacation";
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

function validateDates() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const startDateError = document.getElementById("startDateError");
  const endDateError = document.getElementById("endDateError");

  clearErrors();

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      endDateError.textContent = "End date must be after start date";
      return false;
    }
  }

  return true;
}

function validateForm() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const reason = document.getElementById("reason").value.trim();

  const startDateError = document.getElementById("startDateError");
  const endDateError = document.getElementById("endDateError");
  const reasonError = document.getElementById("reasonError");

  clearErrors();

  let isValid = true;

  if (!startDate) {
    startDateError.textContent = "Start date is required";
    isValid = false;
  }

  if (!endDate) {
    endDateError.textContent = "End date is required";
    isValid = false;
  }

  if (!reason) {
    reasonError.textContent = "Reason is required";
    isValid = false;
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      endDateError.textContent = "End date must be after start date";
      isValid = false;
    }
  }

  return isValid;
}

function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const formData = new FormData(requestForm);
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const reason = formData.get("reason");
  const type = formData.get("requestType");

  const newRequest = {
    id: Date.now(),
    startDate,
    endDate,
    reason,
    type,
    status: "pending",
    submittedAt: new Date().toISOString().split("T")[0],
    days: calculateDays(startDate, endDate),
  };

  requests.unshift(newRequest);
  renderRequests();
  renderCalendar();
  hideForm();

  // Show success message (you can enhance this)
  alert("Request submitted successfully!");
}

// Render Functions
function renderRequests() {
  requestsList.innerHTML = "";

  if (requests.length === 0) {
    requestsList.innerHTML = '<p class="text-gray-500">No requests found.</p>';
    return;
  }

  requests.forEach((request) => {
    const requestElement = document.createElement("div");
    requestElement.className = `request-item ${request.status}`;

    requestElement.innerHTML = `
            <div class="request-header">
                <span class="request-type ${request.type}">${
      request.type
    }</span>
                <span class="request-status ${request.status}">${
      request.status
    }</span>
            </div>
            <div class="request-reason">${request.reason}</div>
            <div class="request-dates">
                ${formatDate(request.startDate)} - ${formatDate(
      request.endDate
    )} (${request.days} days)
            </div>
        `;

    requestsList.appendChild(requestElement);
  });
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Update calendar title
  calendarTitle.textContent = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Clear calendar days
  calendarDays.innerHTML = "";

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Add previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayElement = createDayElement(day, true);
    calendarDays.appendChild(dayElement);
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = createDayElement(day, false);
    calendarDays.appendChild(dayElement);
  }

  // Add next month's leading days to fill the grid
  const totalCells = calendarDays.children.length;
  const remainingCells = 42 - totalCells; // 6 rows × 7 days

  for (let day = 1; day <= remainingCells; day++) {
    const dayElement = createDayElement(day, true);
    calendarDays.appendChild(dayElement);
  }
}

function createDayElement(day, isOtherMonth) {
  const dayElement = document.createElement("div");
  dayElement.className = "calendar-day";
  dayElement.textContent = day;

  if (isOtherMonth) {
    dayElement.classList.add("other-month");
  } else {
    // Check if this day has a request
    const dateString = formatDateForComparison(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const hasRequest = requests.some((request) => {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);
      const currentDay = new Date(dateString);
      return currentDay >= startDate && currentDay <= endDate;
    });

    if (hasRequest) {
      dayElement.classList.add("has-request");
    }

    // Check if today
    const today = new Date();
    if (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      day === today.getDate()
    ) {
      dayElement.classList.add("today");
    }
  }

  return dayElement;
}

function navigateMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  renderCalendar();
}

// Utility Functions
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateForComparison(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}
