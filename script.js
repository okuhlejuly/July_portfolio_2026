// ============================================
// DATA — edit these arrays to update your site
// ============================================
const PROJECTS = [
  {
    accent: "#2563eb",
    tags: ["Salesforce CRM", "Security", "Automation"],
    title: "HealthConnect Healthcare CRM",
    description: "Designed a healthcare CRM solution for managing patients, doctors, departments and appointments while ensuring sensitive information is only accessible to the appropriate users.",
    flow: ["Patient", "Doctor", "Department", "Appointment", "Reports"],
    tech: ["Custom Objects", "Relationships", "Profiles & Permissions", "Field-Level Security"],
    techMore: 4,
    link: "#"
  },
  {
    accent: "#10b981",
    tags: ["Salesforce", "Applicant & Trainee Management", "Automation", "Integrations"],
    title: "Life Choices Academy Salesforce Management Platform",
    description: "Designed an end-to-end Salesforce platform for applicant management, bootcamp bookings, attendance tracking, trainee progression and contract generation, with Google tools and REST API integrations.",
    flow: ["Application", "Screening", "Bootcamp Booking", "Attendance", "Trainee", "Contract"],
    tech: ["Custom Objects", "Process Automation", "Google Apps Script", "Salesforce REST API", "Apex Classes", "Document Generation"],
    techMore: 3,
    link: "https://docs.google.com/document/d/1-VeJ5suAe6pDcsUqFheT923fU8KC-aplGWU7bAXpf7k/edit?usp=drivesdk"
  }
];

const BADGES = [
  { name: "Admin Beginner", points: 1200, locked: false },
  { name: "Salesforce Platform Basics", points: 800, locked: false },
  { name: "Data Management", points: 1000, locked: false },
  { name: "Reports & Dashboards", points: 900, locked: false },
  { name: "Flow Builder Basics", points: 1100, locked: false },
  { name: "Security Basics", points: 700, locked: false },
  { name: "App Customization", points: 600, locked: false },
  { name: "Object & Field Admin", points: 500, locked: false },
  { name: "CRM for Lightning Experience", points: 1500, locked: true },
  { name: "Platform App Builder Cert Prep", points: 2000, locked: true }
];

const BADGE_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const CHECK_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
const ARROW_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6l6 6-6 6"/></svg>`;

// ============================================
// RENDER PROJECT CARDS
// ============================================
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="project-card" style="--card-accent:${p.accent}">
      <div class="project-tags">
        ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="flow-chips">
        ${p.flow.map((step, i) => `
          <span class="flow-chip">${step}</span>
          ${i < p.flow.length - 1 ? '<span class="flow-arrow">&rarr;</span>' : ""}
        `).join("")}
      </div>
      <div class="tech-chips">
        ${p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join("")}
        ${p.techMore ? `<span class="tech-more">+${p.techMore} more</span>` : ""}
      </div>
      <a href="${p.link}" class="btn btn-secondary">View Case Study ${ARROW_ICON}</a>
    </article>
  `).join("");
}

// ============================================
// RENDER BADGE GRID
// ============================================
function renderBadges() {
  const grid = document.getElementById("badge-grid");
  if (!grid) return;

  grid.innerHTML = BADGES.map((b) => `
    <div class="badge-card${b.locked ? " is-locked" : ""}">
      <div class="badge-icon">${BADGE_ICON}</div>
      <h4>${b.name}</h4>
      <span class="badge-points">${b.points.toLocaleString()} pts</span>
    </div>
  `).join("");
}

// ============================================
// MOBILE NAV
// ============================================
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeNav();
  });
}

// ============================================
// SCROLL SPY — highlight active nav link
// ============================================
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
// CONTACT FORM VALIDATION
// ============================================
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
    subject: (v) => v.trim().length >= 3 || "Please add a short subject.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters."
  };

  const clearError = (field) => {
    const wrap = field.closest(".form-field");
    wrap.classList.remove("has-error");
    const errorEl = wrap.querySelector(".field-error");
    if (errorEl) errorEl.textContent = "";
  };

  const showError = (field, message) => {
    const wrap = field.closest(".form-field");
    wrap.classList.add("has-error");
    const errorEl = wrap.querySelector(".field-error");
    if (errorEl) errorEl.textContent = message;
  };

  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    if (!field) return;
    field.addEventListener("input", () => clearError(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    Object.entries(validators).forEach(([name, validate]) => {
      const field = form.elements[name];
      if (!field) return;
      const result = validate(field.value);
      if (result !== true) {
        showError(field, result);
        isValid = false;
      } else {
        clearError(field);
      }
    });

    if (!isValid) {
      status.textContent = "Please fix the highlighted fields.";
      status.className = "form-status is-error";
      return;
    }

    // No backend is wired up yet — replace this with a real submit
    // (e.g. fetch() to an API, a form service like Formspree, or mailto:).
    status.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";
    status.className = "form-status is-success";
    form.reset();
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderBadges();
  initNav();
  initScrollSpy();
  initBackToTop();
  initContactForm();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});