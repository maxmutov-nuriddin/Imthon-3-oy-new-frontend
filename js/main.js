const scrollToTopBtn = document.getElementById("scroll-to-top-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ======================================

const photo = document.querySelector('.photo');
const wrapper = photo.querySelector('.photo__wrapper');
const slides = photo.querySelectorAll('.photo__slide');
const prevButton = photo.querySelector('.photo__prev');
const nextButton = photo.querySelector('.photo__next');
const slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
let slidesToShow = Math.floor(wrapper.offsetWidth / slideWidth);
let distance = slideWidth * slidesToShow;
let currentSlides = 0;

function moveToSlide(index) {
  if (index < 0 || index > slides.length - slidesToShow) return;
  wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
  currentSlides = index;
}

function handlePrevClick() {
  moveToSlide(currentSlides - 1);
}

function handleNextClick() {
  moveToSlide(currentSlides + 1);
}

prevButton.addEventListener('click', handlePrevClick);
nextButton.addEventListener('click', handleNextClick);

window.addEventListener('resize', () => {
  slidesToShow = Math.floor(wrapper.offsetWidth / slideWidth);
  distance = slideWidth * slidesToShow;
  moveToSlide(currentSlides);
});


// ================


function openTab(evt, tabName) {
  const tabcontent = document.querySelectorAll(".tabcontent");
  tabcontent.forEach((content) => (content.style.display = "none"));

  const tablinks = document.querySelectorAll(".tablinks");
  tablinks.forEach((link) => link.classList.remove("active"));

  const tabToShow = document.getElementById(tabName);
  tabToShow.style.display = "block";
  evt.currentTarget.classList.add("active");
}

document.getElementById("defaultOpen").click();

// ====================================================

const swiperWrapper = document.querySelector(".swiper-wrapper");
const swiperSlides = document.querySelectorAll(".swiper-slide");
const swiperPaginationBullets = document.querySelectorAll(
  ".swiper-pagination-bullet"
);
const swiperPrevButton = document.querySelector(".swiper-button-prev");
const swiperNextButton = document.querySelector(".swiper-button-next");

let currentSlide = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = 0;

function startDragging(e) {
  isDragging = true;
  startPosition = getPositionX(e);
  animationId = requestAnimationFrame(animation);
  swiperWrapper.classList.add("grabbing");
}

function stopDragging() {
  isDragging = false;
  cancelAnimationFrame(animationId);
  const moveBy = currentTranslate - prevTranslate;
  if (moveBy < -100 && currentSlide < swiperSlides.length - 1) {
    currentSlide++;
  }
  if (moveBy > 100 && currentSlide > 0) {
    currentSlide--;
  }
  goToSlide(currentSlide);
  swiperWrapper.classList.remove("grabbing");
}

function animation() {
  if (isDragging) {
    requestAnimationFrame(animation);
  }
  setTranslateX(currentTranslate);
  currentTranslate += getPositionX(event) - startPosition;
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function setTranslateX(translateX) {
  swiperWrapper.style.transform = `translateX(${translateX}px)`;
}

function goToSlide(index) {
  currentSlide = index;
  setTranslateX(-currentSlide * swiperSlides[0].offsetWidth);
  updatePagination();
}

function updatePagination() {
  swiperPaginationBullets.forEach((bullet, i) => {
    bullet.classList.toggle("swiper-pagination-bullet-active", i === currentSlide);
  });
}

swiperWrapper.addEventListener("mousedown", startDragging);
swiperWrapper.addEventListener("mouseup", stopDragging);
swiperWrapper.addEventListener("mouseleave", stopDragging);
swiperWrapper.addEventListener("touchstart", startDragging);
swiperWrapper.addEventListener("touchend", stopDragging);
swiperWrapper.addEventListener("touchcancel", stopDragging);
swiperPrevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});
swiperNextButton.addEventListener("click", () => {
  if (currentSlide < swiperSlides.length - 1) {
    goToSlide(currentSlide + 1);
  }
});
swiperPaginationBullets.forEach((bullet, i) => {
  bullet.addEventListener("click", () => goToSlide(i));
});

goToSlide(0);

// ====================================================


