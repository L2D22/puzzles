// DOM MANIPULATIONS

// Events
document.addEventListener('DOMContentLoaded', function() {
  // code
})

[].forEach.call(document.querySelectorAll('a'), function(el) {
  el.addEventListener('click', function() {
  })
})

// Selectors
var divs = document.querySelectorAll('div')
var newDiv = document.createElement('div')

// Attributes
document.querySelector('img').setAttribute('alt', 'My image')

// Classes
newDiv.classList.add('foo')
newDiv.classList.remove('foo')
newDiv.classList.toggle('foo')

// Manipulation
document.body.appendChild(document.createElement('p'))
el.insertAdjacentHTML('afterend', htmlString);
parent.appendChild(el);
el.insertAdjacentHTML('beforebegin', htmlString);
var clonedElement = document.getElementById('about').cloneNode(true)

// Filter
Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);

// Children
el.children

// Contains
el !== child && el.contains(child);

// Style
getComputedStyle(el)[ruleName];

// Text
el.textContent

// hasClass
el.classList.contains(className);

// Empty
var wrap = document.getElementById('wrap')
while(wrap.firstChild) wrap.removeChild(wrap.firstChild)

el.parentNode.removeChild(el);


// Transversing
var parent = document.getElementById('about').parentNode
if(!document.getElementById('wrap').hasChildNodes())
var nextElement = document.getElementById('wrap').nextElementSibling
var prevElement = document.getElementById('wrap').previousElementSibling


// Offset
var rect = el.getBoundingClientRect();

{
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}

// Offset parent
el.offsetParent
el.offsetHeight

// Position
{left: el.offsetLeft, top: el.offsetTop}

// Events
el.removeEventListener(eventName, eventHandler);
el.addEventListener(eventName, eventHandler);

// Array
array.indexOf(item);
array.map(function(value, index){

});

// Date
Date.now();

// AJAX
// GET

var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
// POST
var httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = function (data) {
  // code
}
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
httpRequest.open('POST', url)
httpRequest.send('username=' + encodeURIComponent(username))

// JSONP
function success(data) {
  // code
}
var scr = document.createElement('script')
scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
document.body.appendChild(scr)

// Animations
function fadeIn(el) {
    el.style.opacity = 0;
    // + is unary operator to convert strings
    var last = +new Date();
    console.log('last', last);
    var tick = function() {
        el.style.opacity = +el.style.opacity + (+new Date() - last) / 1000;
        last = +new Date();
        // OR el.style.opacity = +el.style.opacity + (1/100);
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

fadeIn(document.querySelector('.progress-container'));

// Hide
el.style.display = 'none';
// Show
el.style.display = '';
