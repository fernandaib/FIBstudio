//Narrow Home Page***********************************************************
$(document).ready(function(){
  $('.top').hide();
  $(window).scroll(function(){
      if($(this).scrollTop()>200){
         //perform this if true
          $('.top').fadeIn();
         } else{
         //perform this if not true (or false)
             $('.top').fadeOut();
         }
  });
});

//Set Color barNav and swith bar and X mark in mobile size*******************************************
function myFunction() {
  var navbar = document.getElementById('barNav'); 

  navbar.classList.toggle('show');   
  document.getElementById("xmark").classList.toggle("switchOn");
  document.getElementById("bars").classList.toggle("switchOff");  
  document.getElementById("barMenu").classList.toggle("menuMobileStyle");
}


//Form ***********************************************************
const overlay = document.querySelector('.modalOverlay');
const modalWindow = document.querySelector('.modal');
const btnOpen = document.querySelector('.open');
const btnClose = document.querySelector('.close');

overlay.classList.add('isClosed');

btnOpen.addEventListener('click', e => {
  overlay.classList.add('isOpen');
  overlay.classList.remove('isClosed');
})

btnClose.addEventListener('click', e => {
  closeModal();
})

document.addEventListener('click', e => {
  if(e.target === overlay) {
    closeModal();
  }
})

function closeModal() {
  overlay.classList.add('isClosed');
  overlay.classList.remove('isOpen');
}

//Carousel ***********************************************************
const slideWrapper = document.querySelector('.carouselItems');
const slides = Array.from(slideWrapper.children);
  console.log(slides);
const nextBtn = document.querySelector('.rightBtn');
const prevBtn = document.querySelector('.leftBtn');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);
  console.log(dots);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

// convert above to a named function
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// Reusable functions ---
const moveToSlide = (slideWrapper, currentSlide, targetSlide) => {
  slideWrapper.style.transform =  'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('currentSlide');
  targetDot.classList.add('currentSlide');
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if(targetIndex === 0) {
    prevBtn.classList.add('isHidden');
    nextBtn.classList.remove('isHidden');
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove('isHidden');
    nextBtn.classList.add('isHidden');
  } else {
    prevBtn.classList.remove('isHidden');
    nextBtn.classList.remove('isHidden');
  }
}

// -- end reusbale functions

// next button
nextBtn.addEventListener('click', e => {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(slideWrapper, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

//previous button
prevBtn.addEventListener('click', e => {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(slideWrapper, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

//  dot indicators
dotsNav.addEventListener('click', e => {  
  const targetDot = e.target.closest('button');
  console.log('test1');
  // prevent the code from workign if its not a button
  if(!targetDot) return;
  console.log('test2');
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const currentDot = dotsNav.querySelector('.currentSlide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  console.log(targetIndex);
  const targetSlide = slides[targetIndex];
  console.log(targetSlide);
  moveToSlide(slideWrapper, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);  
})

//FAQ (acordion)***********************************************************
const accordionContainer = document.querySelector('.aContainer');

accordionContainer.addEventListener('click', e => {
  const accordionHeader = e.target.closest('.aHeader');

  if(accordionHeader) {
    const accordion = accordionHeader.parentElement;
    const accordionContent = accordionHeader.nextElementSibling;
    const accordionInner = accordionContent.children[0];
    let height;

    if(accordion.classList.contains('isOpen')) {
      height = 0;
    } else {
      height = accordionInner.getBoundingClientRect().height;
    }

    accordion.classList.toggle('isOpen');
    accordionContent.style.height = height + 'px';

    console.log(accordionInner);
    console.log(accordionHeader);
    console.log(accordionContent);
    console.log(accordionContent.children[0]);
    console.log(accordionContent.style.height);
    console.log(height);
    console.log(accordionInner.getBoundingClientRect());

  }
})

