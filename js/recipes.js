document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-track');
  const sliderTrack = document.querySelector('.slider-track');

  const slideWidth = sliderTrack.querySelector('.slider__slide')?.offsetWidth || 0;

  if (slideWidth === 0) {
    console.error('Unable to determine slide width. Please check your CSS and HTML structure.');
    return;
  }

  function getAllSlides() {
    return sliderTrack.querySelectorAll('.slider__slide');
  }

  const rightButton = document.querySelector('.slider__button--left');
  const leftButton = document.querySelector('.slider__button--right');

  leftButton.addEventListener('click', () => {
    moveLeft();
    resetAutoSlide();
  });

  rightButton.addEventListener('click', () => {
    moveRight();
    resetAutoSlide();
  });

  let currentSlide = 0;
  let autoSlideInterval;
  let resetTimeout;
  let isAnimating = false;

  function moveRight() {
    if (isAnimating) return;
    isAnimating = true;
    const slides = getAllSlides();
    if (slides.length === 0) {
      isAnimating = false;
      return;
    }
    currentSlide = (currentSlide + 1) % slides.length;
    
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
    
    setTimeout(() => {
      sliderTrack.style.transition = 'none';
      sliderTrack.style.transform = 'translateX(0)';
      sliderTrack.appendChild(slides[0]);
      updateActiveSlide();
      isAnimating = false;
    }, 500);
  }

  function moveLeft() {
    if (isAnimating) return;
    isAnimating = true;
    const slides = getAllSlides();
    if (slides.length === 0) {
      isAnimating = false;
      return;
    }
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    const lastSlide = slides[slides.length - 1];
    sliderTrack.style.transition = 'none';
    sliderTrack.style.transform = `translateX(-${slideWidth}px)`;
    sliderTrack.insertBefore(lastSlide, slides[0]);
    
    setTimeout(() => {
      sliderTrack.style.transition = 'transform 0.5s ease-in-out';
      sliderTrack.style.transform = 'translateX(0)';
      setTimeout(() => {
        updateActiveSlide();
        isAnimating = false;
      }, 500);
    }, 20);
  }

  function updateActiveSlide() {
    const slides = getAllSlides();
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === 0);
    });
    updateDescription();
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

  function updateDescription() {
    console.log('Current slide:', currentSlide + 1);
    // Implement your description update logic here
  }

  // Initial setup
  updateActiveSlide();
  startAutoSlide();

  if (sliderContainer) {
    // Remove the old event listeners
    sliderContainer.removeEventListener('mouseenter', stopAutoSlide);
    sliderContainer.removeEventListener('mouseleave', startAutoSlide);

    // Add new event listeners
    sliderContainer.addEventListener('mouseenter', () => {
      console.log('Mouse entered');
      stopAutoSlide();
    });

    sliderContainer.addEventListener('mouseleave', () => {
      console.log('Mouse left');
      startAutoSlide();
    });

    // Log initial state
    console.log('Slider initialized');
  } else {
    console.error('Slider container not found. Mouse events will not work.');
  }
});

