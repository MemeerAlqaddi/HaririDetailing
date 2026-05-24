const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const bookingPage = document.getElementById("bookingPage");
const closeBooking = document.getElementById("closeBooking");
const openBookingButtons = document.querySelectorAll("[data-open-booking]");
const calendlyEmbed = document.getElementById("calendlyEmbed");
const reveals = document.querySelectorAll(".reveal");
const calendlyUrl = "https://calendly.com/hariri-automotive-detailing";

let calendlyInitialized = false;

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
    initializeCalendly();
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

function initializeCalendly() {
  if (calendlyInitialized || !calendlyEmbed) {
    return;
  }

  if (!window.Calendly) {
    window.setTimeout(initializeCalendly, 100);
    return;
  }

  calendlyEmbed.innerHTML = "";
  window.Calendly.initInlineWidget({
    url: calendlyUrl,
    parentElement: calendlyEmbed
  });
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
