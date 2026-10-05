const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") root.dataset.theme = "dark";

themeToggle?.addEventListener("click", () => {
  const dark = root.dataset.theme === "dark";
  if (dark) {
    delete root.dataset.theme;
    localStorage.setItem("portfolio-theme", "light");
  } else {
    root.dataset.theme = "dark";
    localStorage.setItem("portfolio-theme", "dark");
  }
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const form = document.querySelector("#contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#form-status");
  status.textContent = "Demo message submitted successfully. Connect a backend/email service for real messages.";
  form.reset();
});

document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});
