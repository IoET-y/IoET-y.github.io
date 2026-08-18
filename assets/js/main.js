document.addEventListener("DOMContentLoaded", () => {
  initNavScroll();
  initBibTeX();
  initGalleryTabs();
  initLightbox();
});

function initNavScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(item => {
          if (item.getAttribute("href") === `#${id}`) {
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

  const copyBtns = document.querySelectorAll(".bibtex-copy");
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const codeElement = btn.parentElement.querySelector("code");
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.textContent.trim()).then(() => {
          const original = btn.innerText;
          btn.innerText = "Copied!";
          setTimeout(() => {
            btn.innerText = original;
          }, 1500);
        });
      }
    });
  });
}

function initGalleryTabs() {
  const tabs = document.querySelectorAll(".gallery-tab-btn");
  const panes = document.querySelectorAll(".gallery-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const target = document.getElementById(tab.getAttribute("data-tab"));
      if (target) {
        target.classList.add("active");
      }
    });
  });
}

function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const photos = document.querySelectorAll(".photo-item");

  if (!modal || !modalImg) return;

  photos.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
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
