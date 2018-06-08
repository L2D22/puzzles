// “Hey, I’m not going to execute that function
// until I know there are no more changes to be made”.
// It is almost like we don’t execute our function until everyone
// else is happy and we’re clear to proceed.
// Imagine ordering food at a restaurant.
// You start listing off items to the waiter/waitress
// and at the end they ask “Is that everything?”
// If it is, they leave you to it and go get your food and drinks
// sorted out etc. If it isn’t, you add to the order
// and then they ask you again until they are clear to proceed
function debouce(func, wait) {
    var timeout;

    return function() {
        // always clear timeout
        // This is the basic debounce behaviour where you can call this
        // function several times, but it will only execute once
        // [before or after imposing a delay].
        // Each time the returned function is called, the timer starts over.
        clearTimeout(timeout);

        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        var context = this;
        var args = arguments;

        timeout = setTimeout(()=> {
            timeout = null;
            // Call the original function with apply
            // apply lets you define the 'this' object as well as the arguments
            // (both captured before setTimeout)
            func.apply(context, args);
        }, wait);
    }
}

function hello() {
    console.log('haiii');
}

window.addEventListener('resize', debouce(hello, 1000));
