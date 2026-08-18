document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initPubFilters();
  initBibTeX();
  initGalleryTabs();
  initLightbox();
  initBackToTop();
});

function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  updateThemeIcon();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon();
    });
  }

  prefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      updateThemeIcon();
    }
  });
}

function updateThemeIcon() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;
  const currentTheme = document.documentElement.getAttribute("data-theme");
  
  if (currentTheme === "dark") {
    themeToggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    themeToggleBtn.setAttribute("title", "Switch to Light Mode");
    themeToggleBtn.setAttribute("aria-label", "Switch to Light Mode");
  } else {
    themeToggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
    themeToggleBtn.setAttribute("aria-label", "Switch to Dark Mode");
  }
}

function initNav() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navItems.forEach(item => {
          if (item.getAttribute("href") === `#${currentId}`) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: "-60px 0px -40% 0px" });

  sections.forEach(section => observer.observe(section));
}

function initPubFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const pubCards = document.querySelectorAll(".pub-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      pubCards.forEach(card => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.3s ease-in-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function initBibTeX() {
  const bibBtns = document.querySelectorAll(".btn-bibtex");
  bibBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      const targetBox = document.getElementById(targetId);
      if (targetBox) {
        targetBox.classList.toggle("show");
      }
    });
  });

  const copyBtns = document.querySelectorAll(".bibtex-copy-btn");
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const codeElement = btn.parentElement.querySelector("code");
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.textContent.trim()).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = "✓ Copied!";
          btn.classList.add("btn-primary");
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove("btn-primary");
          }, 2000);
        }).catch(err => {
          console.error("Failed to copy BibTeX: ", err);
        });
      }
    });
  });
}

function initGalleryTabs() {
  const tabBtns = document.querySelectorAll(".gallery-tab-btn");
  const panes = document.querySelectorAll(".gallery-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(btn.getAttribute("data-tab"));
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const cards = document.querySelectorAll(".gallery-card");

  if (!modal || !modalImg) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (img) {
        modalImg.src = img.src;
        modal.classList.add("show");
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
