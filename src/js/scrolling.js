function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.scrollLeft || document.documentElement.scrollLeft,
    scrollTop = window.scrollTop || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// example use
for (var i = 0; i < 3; i++) {
    var div = document.createElement('div');
    div.classList.add('scroll-me');
    div.innerHTML = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."';
    document.body.appendChild(div);
    var divOffset = offset(div);
    console.log(divOffset.left, divOffset.top);
}
