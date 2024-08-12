// JavaScript for gesture control and button controls of slides
document.querySelectorAll('.project-slider').forEach(slider => {
    let startX;
    const slides = slider.querySelector('.slides');
    const slideCount = slides.children.length;

    // Handle touch gestures
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const difference = startX - endX;

        if (Math.abs(difference) > 30) { // Threshold for swipe
            if (difference > 0) {
                showNextSlide(slider);
            } else {
                showPrevSlide(slider);
            }
        }
    });

    // Handle button clicks
    slider.querySelector('.control-button.next').addEventListener('click', () => {
        showNextSlide(slider);
    });

    slider.querySelector('.control-button.prev').addEventListener('click', () => {
        showPrevSlide(slider);
    });

    function showNextSlide(slider) {
        const slides = slider.querySelector('.slides');
        const firstSlide = slides.querySelector('.slide');
        slides.appendChild(firstSlide); // Move first slide to end
        updateSlidePosition(slides);
    }

    function showPrevSlide(slider) {
        const slides = slider.querySelector('.slides');
        const lastSlide = slides.querySelector('.slide:last-child');
        slides.insertBefore(lastSlide, slides.firstChild); // Move last slide to start
        updateSlidePosition(slides);
    }

    function updateSlidePosition(slides) {
        const slideWidth = slides.querySelector('.slide').offsetWidth;
        slides.style.transform = `translateX(-${slideWidth}px)`;
    }
});
