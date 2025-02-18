document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = Array.from(sliderTrack.querySelectorAll('.slider__slide'));
    const slideWidth = slides[0]?.offsetWidth || 0;
  
    const leftButton = document.querySelector('.slider__button--left');
    const rightButton = document.querySelector('.slider__button--right');
  
    let isAnimating = false;
    let autoSlideInterval;
    let resetTimeout;
  
    function moveRight() {
      if (isAnimating) return;
      isAnimating = true;
  
      sliderTrack.style.transition = 'transform 0.5s ease-in-out';
      sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
  
      setTimeout(() => {
        sliderTrack.appendChild(sliderTrack.firstElementChild);
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = 'translateX(0)';
        isAnimating = false;
        updateActiveSlide();
      }, 500);
    }
  
    function moveLeft() {
      if (isAnimating) return;
      isAnimating = true;
  
      sliderTrack.insertBefore(sliderTrack.lastElementChild, sliderTrack.firstElementChild);
      sliderTrack.style.transition = 'none';
      sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
  
      setTimeout(() => {
        sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        sliderTrack.style.transform = 'translateX(0)';
  
        setTimeout(() => {
          isAnimating = false;
          updateActiveSlide();
        }, 500);
      }, 0);
    }
  
    function updateActiveSlide() {
      const slides = sliderTrack.querySelectorAll('.slider__slide');
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
      });
    }
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(moveRight, 3000);
    }
  
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    function resetAutoSlide() {
      stopAutoSlide();
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(startAutoSlide, 10000);
    }
  
    leftButton.addEventListener('click', () => {
      moveLeft();
      resetAutoSlide();
    });
  
    rightButton.addEventListener('click', () => {
      moveRight();
      resetAutoSlide();
    });
  
    sliderTrack.addEventListener('mouseenter', stopAutoSlide);
    sliderTrack.addEventListener('mouseleave', startAutoSlide);
  
    updateActiveSlide();
    startAutoSlide();
  });
  