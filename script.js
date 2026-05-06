const config = window.LANDING_MEDIA_CONFIG;

const $ = (id) => document.getElementById(id);

function renderHero() {
  const heroSection = $("hero");
  heroSection.style.backgroundImage = `url("${config.hero.backgroundImage}")`;

  $("brand-logo").src = config.brand.logo;
  $("brand-name").textContent = config.brand.companyName;
  $("hero-eyebrow").textContent = config.brand.slogan;
  $("hero-title").textContent = config.hero.title;
  $("hero-subtitle").textContent = config.hero.subtitle;
  $("cta-primary").textContent = config.hero.ctaPrimary;
  $("cta-secondary").textContent = config.hero.ctaSecondary;
}

function renderServices() {
  const html = config.services
    .map(
      (item) => `
      <article class="service-card">
        <img src="${item.icon}" alt="${item.title}" />
        <h3>${item.title}</h3>
        <small>${item.subtitle}</small>
        <p>${item.description}</p>
      </article>
    `
    )
    .join("");

  $("services-grid").innerHTML = html;
}

function renderProjects() {
  const html = config.projects
    .map(
      (item, index) => `
      <a class="project-card" href="./project.html?project=${encodeURIComponent(item.slug || index)}">
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
      </a>
    `
    )
    .join("");

  $("projects-grid").innerHTML = html;
}

function renderSlides() {
  const html = config.slides
    .map(
      (slide) => `
      <div class="item">
        <img src="${slide.image}" alt="${slide.title}" />
      </div>
    `
    )
    .join("");

  $("track").innerHTML = html;
}

function renderVideos() {
  const html = config.videos
    .map(
      (video) => {
        if (video.type === "embed") {
          return `
            <div class="video-card">
              <iframe
                src="${video.url}"
                title="${video.title}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          `;
        }

        return `
          <div class="video-card">
            <video controls preload="metadata" title="${video.title}">
              <source src="${video.url}" type="video/mp4" />
              Trình duyệt không hỗ trợ phát video.
            </video>
          </div>
        `;
      }
    )
    .join("");

  $("video-grid").innerHTML = html;
}


function renderPartners() {
  const html = config.partners
    .map(
      (logo, index) => `
      <div class="partner">
        <img src="${logo}" alt="Partner ${index + 1}" />
      </div>
    `
    )
    .join("");

  $("partners-grid").innerHTML = html;
}

function renderContact() {
  $("contact-phone").textContent = `Hotline: ${config.contact.phone}`;
  $("contact-address").textContent = `Địa chỉ: ${config.contact.address}`;
  $("contact-email").textContent = `Email: ${config.contact.email}`;

  const modalPhone = $("modal-phone");
  const modalAddress = $("modal-address");
  const modalEmail = $("modal-email");
  if (modalPhone && modalAddress && modalEmail) {
    modalPhone.textContent = `Hotline: ${config.contact.phone}`;
    modalAddress.textContent = `Địa chỉ: ${config.contact.address}`;
    modalEmail.textContent = `Email: ${config.contact.email}`;
  }
}

function initSlider() {
  const track = document.getElementById("track");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  
  const items = document.querySelectorAll(".item");
  const perPage = 4;
  
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / perPage);
  
  let currentPage = 0;
  
  function updateSlider() {
    const sliderWidth = document.querySelector(".slider").offsetWidth;
    track.style.transform = `translateX(-${currentPage * sliderWidth}px)`;
  }
  
  /* NEXT */
  next.addEventListener("click", () => {
    currentPage++;
    if (currentPage >= totalPages) currentPage = 0; // loop
    updateSlider();
  });
  
  /* PREV */
  prev.addEventListener("click", () => {
    currentPage--;
    if (currentPage < 0) currentPage = totalPages - 1; // loop
    updateSlider();
  });
  
  /* Resize fix */
  window.addEventListener("resize", updateSlider);
}


function initActions() {
  const ctaPrimary = $("cta-primary");
  const ctaSecondary = $("cta-secondary");
  const modal = $("contact-modal");
  const modalClose = $("modal-close");
  const modalBackdrop = $("modal-backdrop");

  if (ctaPrimary) {
    ctaPrimary.addEventListener("click", () => {
      window.location.href = "./about.html";
    });
  }

  const hideModal = () => {
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  };

  if (ctaSecondary && modal) {
    ctaSecondary.addEventListener("click", () => {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", hideModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", hideModal);
  }
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const triggerPoint = header.offsetHeight;
  const updateHeaderState = () => {
    if (window.scrollY > triggerPoint) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function initEnjohubParallax() {
  const card = document.querySelector(".enjohub-intro-card");
  const bg = document.querySelector(".enjohub-bg-parallax");
  if (!card || !bg) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let rafId = null;

  const update = () => {
    const rect = card.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = vh / 2;
    const delta = sectionCenter - viewportCenter;
    const offset = -(delta / vh) * 96;
    bg.style.transform = `translate3d(0, ${offset}px, 0)`;
  };

  const onScrollOrResize = () => {
    if (rafId != null) return;
    rafId = window.requestAnimationFrame(() => {
      update();
      rafId = null;
    });
  };

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  update();
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal-item");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22 }
  );

  revealItems.forEach((item) => observer.observe(item));
}


function initApp() {
  if (!config) {
    return;
  }

  renderHero();
  renderServices();
  renderProjects();
  renderSlides();
  renderVideos();
  // renderStats();
  renderPartners();
  renderContact();
  initSlider();
  initActions();
  initStickyHeader();
  initEnjohubParallax();
  initRevealAnimations();
}

initApp();
