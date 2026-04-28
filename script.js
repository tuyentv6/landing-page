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
      <article class="slide">
        <img src="${slide.image}" alt="${slide.title}" />
        <div class="slide-content">
          <h3>${slide.title}</h3>
          <p>${slide.description}</p>
        </div>
      </article>
    `
    )
    .join("");

  $("slides-wrapper").innerHTML = html;
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

function renderStats() {
  const html = config.stats
    .map(
      (stat) => `
      <article class="stat-box">
        <h3>${stat.value}</h3>
        <p>${stat.label}</p>
      </article>
    `
    )
    .join("");

  $("stats-grid").innerHTML = html;
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
  const wrapper = $("slides-wrapper");
  const slides = config.slides.length;
  let index = 0;

  const updateSlide = () => {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
  };

  $("slide-prev").addEventListener("click", () => {
    index = (index - 1 + slides) % slides;
    updateSlide();
  });

  $("slide-next").addEventListener("click", () => {
    index = (index + 1) % slides;
    updateSlide();
  });
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

function initApp() {
  if (!config) {
    return;
  }

  renderHero();
  renderServices();
  renderProjects();
  renderSlides();
  renderVideos();
  renderStats();
  renderPartners();
  renderContact();
  initSlider();
  initActions();
  initStickyHeader();
}

initApp();
