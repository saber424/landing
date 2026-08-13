/* =============================================
   Sara Bernal — Psicóloga Clínica — Comportamiento
   Vanilla JS, sin dependencias externas
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
  initScrollSpy();
  initTimeSlots();
  initContactForm();
  initCookieConsent();
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = new Date().getFullYear();
});

/* ---------- 2. Menú mobile: drawer + overlay ---------- */
function initMobileDrawer() {
  const hamburger = document.getElementById("hamburgerBtn");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (!hamburger || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    overlay.classList.add("is-visible");
    hamburger.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener("click", closeDrawer);

  drawer.querySelectorAll(".drawer-link, .drawer__cta").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

/* ---------- 3. Scroll-spy para el menú superior ---------- */
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link");
  if (!links.length) return;

  // Solo observamos las secciones que tienen link en el menú: si se
  // observaran todas (incluyendo Inicio, Agenda, etc., que no están en
  // el menú), su intersección "limpiaría" el resaltado al no encontrar
  // ningún link coincidente.
  const sections = Array.from(links)
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 4. Formulario de contacto (Web3Forms) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    status.textContent = "Enviando...";
    status.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        status.textContent = "¡Listo! Tu mensaje fue enviado. Te responderé pronto.";
        status.classList.add("form-status--success");
        form.reset();
      } else {
        throw new Error(result.message || "No se pudo enviar el mensaje.");
      }
    } catch (error) {
      status.textContent = "Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbeme directo por correo.";
      status.classList.add("form-status--error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ---------- 5. Consentimiento de cookies (Google Analytics) ---------- */
function initCookieConsent() {
  const STORAGE_KEY = "cookie_consent"; // "accepted" | "rejected"
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAccept");
  const rejectBtn = document.getElementById("cookieReject");
  const openPrefsBtn = document.getElementById("openCookiePrefs");
  if (!banner || !acceptBtn || !rejectBtn) return;

  const loadGoogleAnalytics = () => {
    if (!window.GA_MEASUREMENT_ID || document.getElementById("ga-script")) return;
    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${window.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    gtag("config", window.GA_MEASUREMENT_ID);
  };

  const showBanner = () => banner.removeAttribute("hidden");
  const hideBanner = () => banner.setAttribute("hidden", "");

  const consent = localStorage.getItem(STORAGE_KEY);
  if (consent === "accepted") {
    loadGoogleAnalytics();
  } else if (consent !== "rejected") {
    showBanner();
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    loadGoogleAnalytics();
    hideBanner();
  });

  rejectBtn.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    hideBanner();
  });

  if (openPrefsBtn) {
    openPrefsBtn.addEventListener("click", showBanner);
  }
}

/* ---------- 6. Selección de horario en Agenda (solo UI) ---------- */
function initTimeSlots() {
  const grid = document.getElementById("timeGrid");
  const selectedLabel = document.getElementById("agendaSelected");
  if (!grid || !selectedLabel) return;

  grid.addEventListener("click", (event) => {
    const slot = event.target.closest(".time-slot");
    if (!slot) return;

    grid.querySelectorAll(".time-slot").forEach((btn) => btn.classList.remove("active"));
    slot.classList.add("active");
    selectedLabel.textContent = `Horario seleccionado: ${slot.textContent}. Escríbeme para confirmarlo.`;
  });
}
