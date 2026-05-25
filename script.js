const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const bookingPage = document.getElementById("bookingPage");
const closeBooking = document.getElementById("closeBooking");
const openBookingButtons = document.querySelectorAll("[data-open-booking]");
const calendlyEmbed = document.getElementById("calendlyEmbed");
const reveals = document.querySelectorAll(".reveal");
const calendlyLandingUrl = "https://calendly.com/hariri-automotive-detailing";

let calendlyInitialized = false;
let activeCalendlyUrl = "";

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

openBookingButtons.forEach(button => {
  button.addEventListener("click", () => {
    bookingPage.classList.add("active");
    document.body.style.overflow = "hidden";
    initializeCalendly(button.dataset.calendlyUrl || calendlyLandingUrl);
  });
});

closeBooking.addEventListener("click", closeBookingPage);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && bookingPage.classList.contains("active")) {
    closeBookingPage();
  }
});

function closeBookingPage() {
  bookingPage.classList.remove("active");
  document.body.style.overflow = "";
}

function initializeCalendly(calendlyUrl) {
  if (!calendlyEmbed || (calendlyInitialized && activeCalendlyUrl === calendlyUrl)) {
    return;
  }

  calendlyEmbed.innerHTML = "";
  const calendlyFrame = document.createElement("iframe");
  const embedUrl = new URL(calendlyUrl);

  embedUrl.searchParams.set("embed_domain", window.location.hostname);
  embedUrl.searchParams.set("embed_type", "Inline");

  calendlyFrame.src = embedUrl.toString();
  calendlyFrame.title = "Schedule a detailing appointment";
  calendlyFrame.setAttribute("frameborder", "0");
  calendlyFrame.setAttribute("scrolling", "yes");
  calendlyFrame.style.width = "100%";
  calendlyFrame.style.height = "720px";
  calendlyEmbed.appendChild(calendlyFrame);
  activeCalendlyUrl = calendlyUrl;
  calendlyInitialized = true;
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach(element => revealObserver.observe(element));
