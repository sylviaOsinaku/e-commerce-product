'use strict';
const mainDesktopImg = document.querySelector('.main_image');
const thumbImages = document.querySelectorAll('.thumb_img');
const thumbSection = document.querySelector('.thumb_section');
const plusImg = document.querySelector('.plus_img');
const minusImg = document.querySelector('.minus_img');
const addToCartNum = document.querySelector('.add_to_cart_num');
const headerNum = document.querySelector('.header_num');
const addToCartbtn = document.querySelector('.add-to-cart-btn');
const cartHeaderIcon = document.querySelector('.header_icon');
const cartContent = document.querySelector('.cart_content');
const cartInnerContent = document.querySelector('.cart_inner_content');
const checkOutBtn = document.querySelector('.check_out_btn');
const message = document.querySelector('.message');
const numOfItem = document.querySelector('.num_of_item');
const total = document.querySelector('.total');
const headerCartImage = document.querySelector('.head_cart_img');

const overlaySlide = document.querySelectorAll('.overlay-slide');
const overlayBtnRight = document.querySelector('.overlay__btn--right');
const overlayBtnLeft = document.querySelector('.overlay__btn--left');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const overlaySlideCloseImg = document.querySelector('.overlay-close-img');

const menuIcon = document.querySelector('.menu_icon');
const middleNavSection = document.querySelector('.middle_nav_div');
const closeIcon = document.querySelector('.close_icon');
const deleteIcon = document.querySelector('.delete_icon');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const slideLength = slides.length;
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

const nav = document.querySelector('.nav');

const getImgNum = function (img) {
  const imgNum = img.dataset.thumb;
  return imgNum;
};
let number = 0;
const increaseNum = () => {
  number++;
  addToCartNum.textContent = number;
};

const decreaseNum = function () {
  if (number > 0) {
    number--;
    addToCartNum.textContent = number;
  }
};

const calcItems = function () {
  const calcTotal = number * 125;
  numOfItem.textContent = number;
  total.textContent = `$${calcTotal}`;
};

// thumbImages.forEach(function (t_img) {
//   t_img.addEventListener('click', function () {
//     const pev = `images/image-product-${getImgNum(t_img)}.jpg`;
//     mainDesktopImg.src = pev;
//   });
// });
thumbSection.addEventListener('click', function (e) {
  const clicked = e.target.closest('.thumb_img');
  const clickedNum = clicked?.dataset.thumb;
  if (!clicked) return;
  if (clicked) {
    thumbImages.forEach(function (img) {
      img.classList.remove('thumb-active');
      const pev = `images/image-product-${clickedNum}.jpg`;
      mainDesktopImg.src = pev;
    });
    document
      .querySelector(`.thumb_img--${clickedNum}`)
      .classList.add('thumb-active');
  }
});

plusImg.addEventListener('click', increaseNum);
minusImg.addEventListener('click', decreaseNum);

const addContent = function () {
  cartInnerContent.classList.remove('hidden');
  message.classList.add('hidden');
};

const removeContent = function () {
  cartInnerContent.classList.add('hidden');
  message.classList.remove('hidden');
};
const removeModal = function () {
  modal.classList.add('hidden');
};
const removeNotification = function () {
  headerNum.classList.add('hidden');
  removeContent();
};
addToCartbtn.addEventListener('click', function () {
  headerNum.textContent = number;
  if (number > 0) {
    headerNum.classList.remove('hidden');
    addContent();
  }
  if (number <= 0) {
    removeNotification();
  }
  headerCartImage.src = mainDesktopImg.src;
  calcItems();
});

cartHeaderIcon.addEventListener('click', function () {
  cartContent.classList.toggle('hidden');
  if (+headerNum.textContent > 0) {
    addContent();
  }
  if (+headerNum.textContent <= 0) {
    removeContent();
  }
});

let currentSlide = 0;
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const goToOverlaySlide = function (slide) {
  overlaySlide.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
goToOverlaySlide(0);

const goToTheRightSlider = function () {
  currentSlide++;
  if (currentSlide === slideLength) {
    currentSlide = 0;
  }
  goToSlide(currentSlide);
};

const goToLeftSlider = function () {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slideLength - 1;
  }
  goToSlide(currentSlide);
};

const goToRightOverlay = function () {
  currentSlide++;
  if (currentSlide === 4) {
    currentSlide = 0;
  }
  goToOverlaySlide(currentSlide);
};
const goToLeftOverlay = function () {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = overlaySlide.length - 1;
  }
  goToOverlaySlide(currentSlide);
};

btnRight.addEventListener('click', goToTheRightSlider);
btnLeft.addEventListener('click', goToLeftSlider);

overlayBtnRight.addEventListener('click', goToRightOverlay);

overlayBtnLeft.addEventListener('click', goToLeftOverlay);

//? The remove overlay function  is going to remove the overlay by adding the hidden class
const removeOverlay = function () {
  overlay.classList.add('hidden');
};
//? The add overlay  function is going  to add the overlay by removing the hidden class
const addOverlay = function () {
  overlay.classList.remove('hidden');
};
const removeMidSec = function () {
  if (middleNavSection.style.display === 'block') {
    middleNavSection.style.display = 'none';
  }
};

overlay.addEventListener('click', function () {
  removeOverlay();
  removeModal();
  removeMidSec();
});

mainDesktopImg.addEventListener('click', function () {
  console.log('hey');
  addOverlay();
  modal.classList.remove('hidden');
});

menuIcon.addEventListener('click', function () {
  middleNavSection.style.display = 'block';
  addOverlay();
});
closeIcon.addEventListener('click', function () {
  removeMidSec();
  removeOverlay();
});
overlaySlideCloseImg.addEventListener('click', function () {
  removeModal();
  removeOverlay();
});
checkOutBtn.addEventListener('click', removeNotification);
deleteIcon.addEventListener('click', removeNotification);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    cartContent.classList.toggle('hidden');
  }
  if (e.key === 'ArrowRight') {
    goToRightOverlay();
  }
  if (e.key === 'ArrowLeft') {
    goToLeftOverlay();
  }
});
