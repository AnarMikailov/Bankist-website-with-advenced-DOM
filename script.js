'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//               25.05.2022

//Learn more button

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');

btnScrollTo.addEventListener('click', function (e) {
  // const s1cords = section1.getBoundingClientRect();
  // console.log(s1cords);
  //console.log(s1cords.top);  //Size from current windows to Learn more button
  //console.log(window.pageYOffset); //Size from top of page to current windows (scorlloing and invisibible area of page)

  // Calculating of transition from one section to another one
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const h1 = document.querySelector('h1');

//                  26.05.2022

//Tabbed companent
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  //Activating buttons
  tabs.forEach(e => e.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  //Activating Content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Passing arguments to eventhandlers.
const handle = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', e => {
//   handle(e, 0.5);
// });

// nav.addEventListener('mouseout', e => {
//   handle(e, 1);
// });
nav.addEventListener('mouseover', handle.bind(0.5));
nav.addEventListener('mouseout', handle.bind(1));

//                27.05.2022

//Sticky navigation
// 1.
// const initialCordinats = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCordinats.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.2,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHegiht = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const allSections = document.querySelectorAll('.section');
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHegiht}px`,
});
headerObserver.observe(header);

//Reveal Scrolling.

const revealSection = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images.

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
  rootMargin: '-200px',
});

imgTarget.forEach(img => {
  imgObserver.observe(img);
});

//                 28.05.2022

// Slider component.
const slider = function () {
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  let curSLide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');
  // slider.style.overflow = 'visible';
  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * i}%)`;
  // });
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>
`
      );
    });
  };
  createDots();
  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }
  goToSlide(0);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };
  activateDot(0);
  const nextSlide = function () {
    if (curSLide === maxSlide - 1) {
      curSLide = 0;
    } else {
      curSLide++;
    }

    goToSlide(curSLide);
    activateDot(curSLide);
  };

  const previousSlide = function () {
    if (curSLide === 0) {
      curSLide = maxSlide - 1;
    } else {
      curSLide--;
    }

    goToSlide(curSLide);
    activateDot(curSLide);
  };
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  // Slides with Arrowkeys

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
  });
};

slider();
//Closing popup.
// window.addEventListener('beforeunload', e => {
//   e.returnValue = '';
// });
////////////////////////////////////////
///////////////////////////////////////
////////////////////////////////////
///////////////////////////////////////////
////////////////////////////////////////
//////////////////////////////////////

////Practice

// Selecting, Creating, and Deleting Elements

// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// ///////////////////////////////////////
// // Styles, Attributes and Classes

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes

// //Setting random integer betweem numbers
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));
