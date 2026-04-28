const config = window.LANDING_MEDIA_CONFIG;

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

function applyAboutBrand() {
  const hero = document.getElementById("hero");
  const brandLogo = document.getElementById("brand-logo");
  const brandName = document.getElementById("brand-name");
  const phone = document.getElementById("contact-phone");
  const address = document.getElementById("contact-address");
  const email = document.getElementById("contact-email");

  if (!config) return;

  hero.style.backgroundImage = `url("${config.hero.backgroundImage}")`;
  brandLogo.src = config.brand.logo;
  brandName.textContent = config.brand.companyName;
  phone.textContent = `Hotline: ${config.contact.phone}`;
  address.textContent = `Địa chỉ: ${config.contact.address}`;
  email.textContent = `Email: ${config.contact.email}`;
}

applyAboutBrand();
initStickyHeader();
