const sliderContainer = document.querySelector('.slider');
const sliderTrack = document.querySelector('.slider-track');
const slideWidth = sliderTrack.querySelector('.slider__slide').offsetWidth;

function getAllSlides() {
    return sliderTrack.querySelectorAll('.slider__slide');
}

const leftButton = document.querySelector('.slider__button--left');
const rightButton = document.querySelector('.slider__button--right');

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
}

function startAutoSlide() {
    autoSlideInterval = setInterval(moveRight, 7000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(startAutoSlide, 10000);
}

startAutoSlide();

sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);


updateActiveSlide();

