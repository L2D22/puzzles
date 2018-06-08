/**
 * Lazyload images above the fold
 */
export function lazyLoad() {
    // get all elements with lazy class
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    // check if IntersectionObserver exists
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // if img is visible
                if (entry.isIntersecting) {
                    // update img src to dataset.src
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    // stop observing img
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                    // class for fadeIn animation
                    lazyImage.classList.add("lazy-loaded");
                }
            });
        });

        // observe every img with class 'lazy'
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}
