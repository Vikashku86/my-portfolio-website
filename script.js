// Mobile menu toggle (better a11y + close on outside/esc)
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

navItems.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && e.target !== menuBtn) closeMenu();
});

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Active link on scroll (works with unique IDs)
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  let current = "home";
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 140;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) current = id;
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ✅ EmailJS init (ensure library exists)
if (window.emailjs) {
  emailjs.init("Iol38wxXuFn6ZQFV9");
}

// Contact form send
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "All fields are required. Please complete the form.";
    formMsg.style.color = "crimson";
    return;
  }

  formMsg.textContent = "Sending...";
  formMsg.style.color = "rgba(232,237,246,0.8)";

  if (!window.emailjs) {
    formMsg.textContent = "Email service not loaded. Please try again.";
    formMsg.style.color = "crimson";
    return;
  }

  emailjs
    .send("service_ns0oa9h", "template_pb1rov8", {
      from_name: name,
      from_email: email,
      message: message,
    })
    .then(() => {
      formMsg.textContent = "Message sent ✅";
      formMsg.style.color = "lightgreen";
      form.reset();
    })
    .catch((error) => {
      console.log("EmailJS Error full:", error);
      formMsg.textContent = `Failed ❌ ${error?.status || ""} ${error?.text || ""}`.trim();
      formMsg.style.color = "crimson";
    });
});
