/**
* Intersection Observer
* Add class and animate elements, once they enter the viewport
*/
const images = document.querySelectorAll('img');

var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
        }
    });
});

images.forEach(image => {
    observer.observe(image);
});
