const WHATSAPP_NUMBER = "94751444907";

const PACKAGES = [
  {
    id: "2d1n-group",
    title: "2 Days / 1 Night — Group",
    duration: "2 Days / 1 Night",
    type: "group",
    typeLabel: "Group",
    filterDuration: "2d1n",
    price: "LKR 3,490",
    oldPrice: "LKR 4,000",
    unit: "per person",
    meals: "3 main meals · 2 tea meals",
    stay: "Accommodation arranged",
    image: "./assets/package-2d1n-group.webp"
  },
  {
    id: "2d1n-couple",
    title: "2 Days / 1 Night — Couple",
    duration: "2 Days / 1 Night",
    type: "couple",
    typeLabel: "Couple",
    filterDuration: "2d1n",
    price: "LKR 8,990",
    oldPrice: "LKR 12,000",
    unit: "per couple",
    meals: "3 main meals · 2 tea meals",
    stay: "Accommodation arranged",
    image: "./assets/package-2d1n-couple.webp"
  },
  {
    id: "2d1n-solo",
    title: "2 Days / 1 Night — Solo",
    duration: "2 Days / 1 Night",
    type: "solo",
    typeLabel: "Solo traveller",
    filterDuration: "2d1n",
    price: "LKR 6,490",
    oldPrice: "LKR 8,500",
    unit: "per person",
    meals: "3 main meals · 2 tea meals",
    stay: "Accommodation arranged",
    image: "./assets/package-2d1n-solo.webp"
  },
  {
    id: "3d2n-group",
    title: "3 Days / 2 Nights — Group",
    duration: "3 Days / 2 Nights",
    type: "group",
    typeLabel: "Group",
    filterDuration: "3d2n",
    price: "LKR 6,500",
    oldPrice: "LKR 7,000",
    unit: "per person",
    meals: "6 main meals · 4 tea meals",
    stay: "Accommodation arranged",
    image: "./assets/package-3d2n-group.webp"
  },
  {
    id: "3d2n-couple",
    title: "3 Days / 2 Nights — Couple",
    duration: "3 Days / 2 Nights",
    type: "couple",
    typeLabel: "Couple",
    filterDuration: "3d2n",
    price: "LKR 17,990",
    oldPrice: "LKR 20,000",
    unit: "per couple",
    meals: "6 main meals · 4 tea meals",
    stay: "Accommodation arranged",
    image: "./assets/package-3d2n-couple.webp"
  },
  {
    id: "3d2n-solo",
    title: "3 Days / 2 Nights — Solo",
    duration: "3 Days / 2 Nights",
    type: "solo",
    typeLabel: "Solo traveller",
    filterDuration: "3d2n",
    price: "LKR 13,490",
    oldPrice: "LKR 15,000",
    unit: "per person",
    meals: "6 main meals · 4 tea meals",
    stay: "Accommodation arranged",
    image: "./assets/package-3d2n-solo.webp"
  }
];

// Replace these placeholders with verified reviews only.
const REVIEWS = [
  {
    text: "Verified customer feedback can be displayed here after approval.",
    source: "Facebook review placeholder"
  },
  {
    text: "Use this card for a genuine guest story, not an invented testimonial.",
    source: "Google review placeholder"
  },
  {
    text: "Photo and video testimonials can be connected after the website is deployed.",
    source: "Guest story placeholder"
  }
];

const PAGE_TITLES = {
  home: "Meemure Yamu with AVANGMA",
  packages: "Packages | Meemure Yamu with AVANGMA",
  experiences: "Experiences | Meemure Yamu with AVANGMA",
  campsites: "Campsites | Meemure Yamu with AVANGMA",
  reviews: "Reviews | Meemure Yamu with AVANGMA",
  about: "About | Meemure Yamu with AVANGMA",
  policy: "Tour Policy | Meemure Yamu with AVANGMA",
  contact: "Contact & Booking | Meemure Yamu with AVANGMA"
};

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function packageCard(pkg) {
  const message = `Hello Meemure Yamu with AVANGMA,\n\nI would like to inquire about the ${pkg.title} package.\n\nPlease confirm availability, inclusions and the required advance payment.`;

  return `
    <article class="package-card reveal" data-type="${pkg.type}" data-duration="${pkg.filterDuration}">
      <div class="package-poster">
        <img src="${pkg.image}" alt="${pkg.title} package poster" loading="lazy">
      </div>
      <div class="package-body">
        <div class="package-tags"><span>${pkg.duration}</span><span>${pkg.typeLabel}</span></div>
        <h3>${pkg.title}</h3>
        <div class="package-price"><strong>${pkg.price}</strong><del>${pkg.oldPrice}</del></div>
        <p>${pkg.unit}</p>
        <p>${pkg.meals}</p>
        <p>${pkg.stay}</p>
        <div class="package-card-actions">
          <a class="button button-dark" href="${whatsappUrl(message)}" target="_blank" rel="noopener">Book package</a>
          <a class="button button-outline-dark" href="#contact" data-route="contact">Details</a>
        </div>
      </div>
    </article>`;
}

function renderPackages() {
  const home = document.getElementById("homePackageGrid");
  const full = document.getElementById("packageGrid");
  if (home) home.innerHTML = PACKAGES.slice(0, 3).map(packageCard).join("");
  if (full) full.innerHTML = PACKAGES.map(packageCard).join("");
}

function renderReviews() {
  const grid = document.getElementById("reviewGrid");
  if (!grid) return;
  grid.innerHTML = REVIEWS.map(review => `
    <article class="review-card reveal">
      <p class="quote">“${review.text}”</p>
      <div class="review-meta">${review.source}</div>
    </article>
  `).join("");
}

function currentRoute() {
  const route = window.location.hash.replace("#", "").trim();
  return PAGE_TITLES[route] ? route : "home";
}

function navigate(route, { scroll = true } = {}) {
  const page = document.getElementById(`page-${route}`) || document.getElementById("page-home");
  document.querySelectorAll(".page").forEach(item => item.classList.remove("active"));
  page.classList.add("active");

  document.querySelectorAll("[data-route]").forEach(link => {
    link.classList.toggle("active", link.dataset.route === route);
  });

  document.title = PAGE_TITLES[route] || PAGE_TITLES.home;
  closeMenu();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(initReveal);
}

function openMenu() {
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  button.classList.add("active");
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-label", "Close navigation");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("menuButton");
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  button.classList.remove("active");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

function initNavigation() {
  document.querySelectorAll("[data-route]").forEach(link => {
    link.addEventListener("click", event => {
      const route = link.dataset.route;
      if (!route) return;
      event.preventDefault();
      if (window.location.hash === `#${route}`) {
        navigate(route);
      } else {
        window.location.hash = route;
      }
    });
  });

  document.getElementById("menuButton").addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.contains("open") ? closeMenu() : openMenu();
  });

  window.addEventListener("hashchange", () => navigate(currentRoute()));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

function initHeader() {
  const header = document.getElementById("siteHeader");
  const update = () => header.classList.toggle("scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

let revealObserver;
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(item => item.classList.add("visible"));
    return;
  }

  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px" });

  document.querySelectorAll(".page.active .reveal:not(.visible)").forEach(item => revealObserver.observe(item));
}

function initFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll("#packageGrid .package-card").forEach(card => {
        const visible = filter === "all" || card.dataset.type === filter || card.dataset.duration === filter;
        card.classList.toggle("hidden", !visible);
      });
    });
  });
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");
  const arrival = document.getElementById("arrivalDate");
  if (!form) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  arrival.min = `${yyyy}-${mm}-${dd}`;

  form.addEventListener("submit", event => {
    event.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    if (!form.checkValidity()) {
      status.textContent = "Please complete the required fields and accept the tour policy.";
      status.classList.add("error");
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const message = [
      "Hello Meemure Yamu with AVANGMA,",
      "",
      "I would like to make a booking inquiry.",
      "",
      `Name: ${data.name}`,
      `WhatsApp number: ${data.phone}`,
      `Email: ${data.email || "Not provided"}`,
      `Package: ${data.package}`,
      `Arrival date: ${data.arrival}`,
      `Adults: ${data.adults}`,
      `Children: ${data.children || "0"}`,
      `Preferred campsite: ${data.campsite}`,
      `Guide required: ${data.guide}`,
      `BBQ arrangement: ${data.bbq}`,
      `Dietary or medical information: ${data.requirements || "None"}`,
      `Additional message: ${data.message || "None"}`,
      "",
      "Please confirm availability and the required advance payment."
    ].join("\n");

    status.textContent = "Opening WhatsApp with your booking summary…";
    window.open(whatsappUrl(message), "_blank", "noopener");
  });
}

function init() {
  renderPackages();
  renderReviews();
  initNavigation();
  initHeader();
  initFilters();
  initBookingForm();
  document.getElementById("year").textContent = new Date().getFullYear();
  navigate(currentRoute(), { scroll: false });
  initReveal();
}

document.addEventListener("DOMContentLoaded", init);
