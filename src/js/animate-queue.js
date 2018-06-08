// Animate progress bars sequentially on button click,
// new ones must wait for previous progress bars to finish animating first
(function() {
    var btnEl = document.getElementsByTagName('button')[0];
    var contentEl = document.querySelector('.content');
    var sliderEl = document.querySelector('.progress-container');
    var animationItems = []; // queue for items waiting to animate
    var transition = false; // flag to check if element is transitioning

    // Animate onload
    animate(sliderEl);
    // Animation end reset
    sliderEl.addEventListener('transitionend', animationQueue);

    // On btn click add a new progress bar
    btnEl.addEventListener('click', function() {
        // create new element
        var el = document.createElement('div');
        el.classList.add('progress-container');
        el.innerHTML = "<div class='progress-slider'></div>";

        // append new element to dom
        contentEl.append(el);
        console.log('transition', transition);
        // If thre is no current transition animate it!
        if (!transition) {
            animate(el);
        }
        else {
            // Add element to animation queue
            animationItems.push(el);
        }

        el.addEventListener('transitionend', animationQueue);
    });

    // Add css animation class
    function animate(el) {
        // Set transition flag to true
        transition = true;

        // animate item on a newly added el
        // browser needs time to make element live
        // so we need a timeout of 100 seconds to make it work.
        setTimeout(()=>
            { el.classList.add('animate');}
        ,100);
    }

    function animationQueue() {
        console.log('animationQueue',transition);
        // Set transition queue to false
        transition = false;

        // If items are present in the queue animate the next item
        if(animationItems.length > 0) {
            animate(animationItems.shift());
        }
    }

})();
