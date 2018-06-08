// JavaScript throttling, we are limiting the amount
// a function is executed over a time period.
// I find a better analogy to be either how the lottery numbers are drawn,
// say one every five seconds or
// a greater one being ordering drinks at a bar.
function throttle(fn, wait) {
    // this is called once
    wait || (wait = 250);
    // must be kept outside to not get overwritten;
    var then; // keeps track of time regardless of functions executing
    var timeOut;
    return function () {
        // this called every time
        // ASK PHD
        var context = this;
        var args = arguments;
        var now = +new Date;

        // if now is less time than pasted time plus the wait
        // set the timeout to run later
        if (now < then + wait) {
            // hold on to it
            console.log('clearTimeout');
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                then = now;
                fn.apply(context, args);
            }, wait);
        }
        // enough time has passed run immediately
        else {
            then = now;
            fn.apply(context, args);
        }
    };
}

function hello() {
    console.log('haiii');
}

window.addEventListener('resize', throttle(hello, 100));
