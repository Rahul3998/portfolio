(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // ====== Year in footer ======
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // ====== Mobile nav toggle ======
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    if (navToggle && nav) {
      navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isExpanded));
        nav.classList.toggle("open");
      });

      // Close menu when clicking a nav link (mobile)
      nav.addEventListener("click", (e) => {
        const target = e.target;
        if (target instanceof HTMLElement && target.matches(".nav-link")) {
          nav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    // ====== Active nav link on scroll ======
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window && sections.length && navLinks.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              if (!id) return;

              navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                if (href === `#${id}`) {
                  link.classList.add("active");
                } else {
                  link.classList.remove("active");
                }
              });
            }
          });
        },
        {
          threshold: 0.45,
        }
      );

      sections.forEach((section) => observer.observe(section));
    }

    // ====== Scroll progress bar ======
    const progressBar = document.querySelector(".scroll-progress-bar");
    if (progressBar) {
      const updateProgress = () => {
        const docEl = document.documentElement;
        const scrollTop = window.scrollY || docEl.scrollTop;
        const docHeight = docEl.scrollHeight - docEl.clientHeight;

        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      };

      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }

    // ====== Contact form (front-end only) ======
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (form && status) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        status.textContent = "Thanks! Your message has been received.";
        status.style.color = "var(--accent)";
        form.reset();

        // Small fade-in effect for feedback
        status.style.opacity = "0";
        requestAnimationFrame(() => {
          status.style.transition = "opacity 0.25s ease";
          status.style.opacity = "1";
        });
      });
    }

    // ====== AOS init ======
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        once: true,
        offset: 80,
      });
    }
  });
})();
