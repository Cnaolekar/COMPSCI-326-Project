document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    const calculateOffset = () => slider.offsetWidth * currentIndex;

    const slideTo = (index) => {
        slider.scrollTo({
            top: 0,
            left: calculateOffset(),
            behavior: 'smooth'
        });
    };

    const slideRight = () => {
        if (currentIndex < testimonials.length - 3) { 
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        slideTo(currentIndex);
    };

    const slideLeft = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = testimonials.length - 3;
        }
        slideTo(currentIndex);
    };

    document.querySelector('.testimonial-arrow-right').addEventListener('click', slideRight);
    document.querySelector('.testimonial-arrow-left').addEventListener('click', slideLeft);
});
