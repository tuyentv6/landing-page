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

function getProjectFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const projectParam = params.get("project");
  if (!projectParam || !config?.projects?.length) return null;

  return (
    config.projects.find((item) => item.slug === projectParam) ||
    config.projects[Number(projectParam)] ||
    null
  );
}

function initProjectPage() {
  if (!config) return;

  const project = getProjectFromQuery() || config.projects[0];
  const hero = document.getElementById("hero");
  const brandLogo = document.getElementById("brand-logo");
  const brandName = document.getElementById("brand-name");
  const projectName = document.getElementById("project-name");
  const projectDesc = document.getElementById("project-desc");
  const projectImage = document.getElementById("project-image");
  const projectLongDesc = document.getElementById("project-long-desc");
  const backHome = document.getElementById("back-home");

  hero.style.backgroundImage = `url("${project.image}")`;
  brandLogo.src = config.brand.logo;
  brandName.textContent = config.brand.companyName;
  projectName.textContent = project.name;
  projectDesc.textContent = project.description || "Thông tin chi tiết dự án đang được cập nhật.";
  projectImage.src = project.image;
  projectImage.alt = project.name;
  projectLongDesc.textContent =
    `${project.description || "Dự án đang cập nhật mô tả chi tiết."} ` +
    "Đây là trang chi tiết được mở từ mục Dự án nổi bật để bạn có thể mở rộng thêm nội dung như mục tiêu, timeline, kết quả và media liên quan.";

  backHome.addEventListener("click", () => {
    window.location.href = "./index.html#projects";
  });
}

initProjectPage();
initStickyHeader();
