What is event delegation?
---------------------------
JS handles events with event delegation - events bubble up
Capturing and bubbling allow to implement one of most powerful event handling patterns called event delegation.
The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.
In the handler we get event.target, see where the event actually happened and handle it.

<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
// Get the element, add a click listener...
document.getElementById("parent-list").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
	}
});

+ What is this? Javascript context - where is this invoked?
----------------------------------
https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/
Implicit - scoped to block
Explicit - .bind(), .call(), .apply()
new Binding - scoped to function invoked with new keyword
window Binding - Absent of the above this is bound to the global window obj

FUNCTIONS - In functions, this can be thought of as an extra, often implicit, parameter.
---------
Real functions (this is the global object in sloppy mode, undefined in strict mode)
   function sloppyFunc() {
        console.log(this === window); // true
    }
    sloppyFunc();

    function strictFunc() {
        'use strict';
        console.log(this === undefined); // true
    }
    strictFunc();

Constructors (this refers to the newly created instance)
Methods (this refers to the object of the method call)
Top level scope this is the window object

In Node.js, you normally execute code in modules. Therefore, the top-level scope is a special module scope:
    // `global` (not `window`) refers to global object:
    console.log(Math === global.Math); // true

    // `this` doesn’t refer to the global object:
    console.log(this !== global); // true
    // `this` refers to a module’s exports:
    console.log(this === module.exports); // true

eval
> (0,eval)('this === window')
    true

    // Real functions
    function sloppyFunc() {
        console.log(eval('this') === window); // true
    }
    sloppyFunc();

    function strictFunc() {
        'use strict';
        console.log(eval('this') === undefined); // true
    }
    strictFunc();

Conceptually, I think of real functions as not having their own this and think of the aforementioned fixes as keeping up that illusion. ECMAScript 6 supports this approach via arrow functions – functions without their own this. Inside such functions, you can freely use this, because there is no shadowing:

    loop: function () {
        'use strict';
        // The parameter of forEach() is an arrow function
        this.friends.forEach(friend => {
            // `this` is loop’s `this`
            console.log(this.name+' knows '+friend);
        });
    }

    vs
      loop: function () {
        'use strict';
        var that = this;
        this.friends.forEach(function (friend) {
            console.log(that.name+' knows '+friend);
        });
    }

    OR

     loop: function () {
        'use strict';
        this.friends.forEach(function (friend) {
            console.log(this.name+' knows '+friend);
        }.bind(this));
    }

+ Explain how prototypal inheritance works?
When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

While this confusion is often considered to be one of JavaScript's weaknesses, the prototypal inheritance model itself is, in fact, more powerful than the classic model. It is, for example, fairly trivial to build a classic model on top of a prototypal model.

*The lookup time for properties that are high up on the prototype chain can have a negative impact on the performance, and this may be significant in the code where performance is critical. Additionally, trying to access nonexistent properties will always traverse the full prototype chain.

* One misfeature that is often used is to extend Object.prototype or one of the other built-in prototypes.
This technique is called monkey patching and breaks encapsulation. While used by popular frameworks such as Prototype.js, there is still no good reason for cluttering built-in types with additional non-standard functionality.
The only good reason for extending a built-in prototype is to backport the features of newer JavaScript engines, like Array.forEach.

JavaScript does not have "methods" in the form that class-based languages define them. In JavaScript, any function can be added to an object in the form of a property. An inherited function acts just as any other property, including property shadowing as shown above (in this case, a form of method overriding).

You probably already noticed that our function A has a special property called prototype. This special property works with the JavaScript new operator. The reference to the prototype object is copied to the internal [[Prototype]] property of the new instance.

JavaScript is all dynamic, all runtime, and it has no classes at all. It's all just instances (objects). Even the "classes" we simulate are just a function object.


The JavaScript prototype property allows you to add new properties to object constructors:
function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
Person.prototype.nationality = "English";

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
}
Person.prototype.name = function() {
    return this.firstName + " " + this.lastName;
};

Different types of prototypal inheritance

var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (inherited)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty);

'use strict';

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);

What do you think of AMD vs CommonJS?
-------------------------------------
As JavaScript development gets more and more common, namespaces and depedencies get much more difficult to handle. Different solutions were developed to deal with this problem in the form of module systems. Naming things is important, everything needs a different name. Namespacing is a technique employed to avoid collisions with other objects or variables in the global namespace. Design patterns and architectures to solve it:

+ began with revealing module pattern
var myRevealingModule = (function () {
    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction() {
        console.log( "Name:" + privateVar );
    }

    function publicSetName( strName ) {
        privateVar = strName;
    }

    function publicGetName() {
        privateFunction();
    }

    // Reveal public pointers to
    // private functions and properties
    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };
})();

myRevealingModule.setName( "Paul Kinlan" );

+ Common JS
Simple: a developer can grasp the concept without looking at the docs.
Dependency management is integrated: modules require other modules and get loaded in the needed order.
require can be called anywhere: modules can be loaded programmatically.
Circular dependencies are supported.
Not Asynchronous

+ AMD - Require JS
Asynchronous loading (better startup times).
Circular dependencies are supported.
Compatibility for require and exports.
Dependency management fully integrated.
Modules can be split in multiple files if necessary.

+ ES2015 Modules
Asynchronous or synchronos supported
Circular dependencies supported.
*** Must use transpilers Babel
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

IIFE
----
The most widely accepted way to tell the parser to expect a function expression is just to wrap it in parens, because in JavaScript, parens can’t contain statements. At this point, when the parser encounters the function keyword, it knows to parse it as a function expression and not a function declaration.

  *Either of the following two patterns can be used to immediately invoke a function expression, utilizing the function's execution context to create "privacy."
  (function(){ /* code */ }()); // Crockford recommends this one
  (function(){ /* code */ })(); // But this one works just as well

null, undefined or undeclared
-----------------------------
undeclared: A variable is undeclared when it does not use the var keyword. It gets created on the global object (that is, the window), thus it operates in a different space as the declared variables.

undefined: A variable has not been defined at all. If you call a variable or function without having actually created it yet the parser will give you a not defined error.

null: A variable with a null value. Often need to guard against null values.

Closures
--------
“A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created.”

All functions have access to the global scope.  
In fact, in JavaScript, all functions have access to the scope "above" them.
JavaScript supports nested functions. Nested functions have access to the scope "above" them.
This is called a JavaScript closure. It makes it possible for a function to have "private" variables.

In other words, the function defined in the closure 'remembers' the environment in which it was created.

A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain. The closure has three scope chains: it has access to its own scope (variables defined between its curly brackets), it has access to the outer function's variables, and it has access to the global variables.

Native vs. Host Objects
-----------------------
object in an ECMAScript implementation whose semantics are fully defined by this specification rather than by the host environment.

Native objects: Object (constructor), Date, Math, parseInt, eval, string methods like indexOfand replace, array methods, ...

Host objects: window, document, location, history, XMLHttpRequest, setTimeout, getElementsByTagName, querySelectorAll
object supplied by the host environment to complete the execution environment of ECMAScript. NOTE Any object that is not native is a host object.

Why would you use an anonymous function?
----------------------------------------
1. If no name is needed because thefunction is only ever called in one place, then why add a name to the namespace?
2. Callbacks are declared inline and can access variables in the parent scope.
3. Code is small and self contained & there is nothing else to clash with.

Difference between function Person(){} /  var person = function() / var person = new Person()
------------------------------------------------------------------------------------------
3 different ways to declare functions in JS

1. Function declaration - function person() {} / defines function variable without variable assignment *cannot be nested within non-function blocks / moved to the top of th code and created before the rest of the function is run.
2. Function expressions - var person = function() {} / function is assigned to a variable name and function name is optional.
3. Function constructor - var myPerson = new Person(); / creating an instance of a Class


What is the difference between forEach and .map()?
--------------------------------------------------
foreach: This iterates over a list and applies some operation with side effects to each list member (example: saving every list item to the database)
items = [1,2,3,4]
items.forEach(function(item, i){
  return items[i] = item * 2;
});

map: This iterates over a list, transforms each member of that list, and returns another list of the same size with the transformed members (example: transforming list of strings to uppercase)

How do you organize your code?
------------------------------
If there is already a project setup, I would follow the current patterns and standards in use.

When left to my own devices:
ES2015 Modules - export / import
SCSS / Sass - @import global styles, themes, component styles
React JSX or Angular / Handlebars / Jade
Webpack
Git

In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we’re able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope.
Encapsulation / components / simplicity

Moving away from monolith app to microservice architecture

What's the difference between .call and .apply?
-----------------------------------------------
.call() - calls a functions with a given 'this' and arugments provided individually.
.apply() - calls a functions with a give value and arguments provided as an array or array-like object.

Explain Function.prototype.bind
-------------------------------
Solution to the problem of how to keep the context of this.

The first time you hit upon the problem, you might be inclined to set this to a variable that you can reference when you change context. Many people opt for self, _this or sometimes context as a variable name. They’re all usable and nothing is wrong with doing that, but there is a better, dedicated way.

Well, .bind() simply creates a new function that, when called, has its this keyword set to the provided value. So, we pass our desired context, this (which is myObj), into the .bind() function. Then, when the callback function is executed, this references myObj.

Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}


What's the difference between feature detection, feature inference, and using the UA string?
--------------------------------------------------------------------------------------------
Feature detection: check for feature existence
if (window.XMLHttpRequest) {
    new XMLHttpRequest();
}
OR
if (navigator.geolocation) {
 // detect users location here B-) and do something awesome
}
OR
if (Promise) {
  let a = Promise.resolve('hello');
}

Feature inference: Infer if a feature is implemented by checking other properties. When you have determined a feature exists and assumed the next web technology feature you are implementing unto your app exists as well. Its usually bad practice to assume, so its better to explicitly specify features you want to detect and plan a fallback action.

if (document.getElementsByTagName) {
    element = document.getElementById(id);
}

UA string: user agent, browser sniffing, should really use feature detection
if (navigator.userAgent.indexOf("MSIE 7") > -1){
    //do something
}

Explain Ajax in as much detail as possible.
-------------------------------------------
AJAX - asynchronous JavaScript and XML, send and receive info withough reloading the page.  JavaScript and the XMLHttpRequest object provide the method for exchanging data asynchronously between the browser and the server.  This enables the web application to continue running and dynamically display. It allows the user to interact with the information presented on the page, avoiding full page reloads.

1. A user interaction in the browser triggers the event, such as a button click
2. The AJAX call fires. This creates and AJAX request, browsers use the XMLHttpRequest object. When the server responds to the browser’s request, the same XMLHttpRequest object will process the result.
3. The server-side script receives the input from JavaScript, and processes the data.
4. After the data is processed, the script sends the data back to the original client-side page that made the request via XML
5. Once the data is received, a second JavaScript callback function, is called this function captures the data, and updates the web page accordingly. or ERROR handling

parseJson()
or
Fetch
response.json()

Explain how JSONP works
-----------------------
JSONP or "JSON with padding" is a communication technique used in JavaScript programs running in web browsers to request data from a server in a different domain, something prohibited by typical web browsers because of the same-origin policy. JSONP takes advantage of the fact that browsers do not enforce the same-origin policy on <script> tags. JSONP does not use the XMLHttpRequest object. JSONP uses the <script> tag instead
<script type="application/javascript"
        src="http://server2.example.com/Users/1234?jsonp=parseResponse">
</script>
parseResponse({"Name": "Foo", "Id": 1234, "Rank": 7});

Have you ever used JavaScript templating?
-----------------------------------------
Jade/Handelbars/JSX/AngularJS/Template literals
const template = `<div>My name is: ${name}</div>`;
However, do beware of a potential XSS in the above approach as the contents are not escaped for you, unlike in templating libraries.

Explain "hoisting"
------------------
Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function). When using var, variables can be used before they are declared.
Define variables at the top of the function. Hoisting only works for declarations, not initializations.

console.log(y); // y is undefined
var y = 13;

// Observe how the declaration var y is hoisted, but y = 13 is not, as only the declarations are hoisted!
var y;
console.log(y);
y = 13;

1. Use JavaScript strict mode, using the "use strict" directive at top; JavaScript strict mode does not allow undeclared variables.
2. Use newer methods of defining. Hoisting does not occur with let or const, using them will increase the chances of your code being bug free (a lot).
3. Declare all the variables at top!!

Describe event bubbling
-----------------------
Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.

Event bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.

1. Capture: When you clicked, browser knows a click event occurred. It starts from the window (lowest level/root of your website), then goes to document, then html root tag, then body, then table... its trying to reach the the as lowest level of element as possible. This is called capture phase (phase -1).

2. Target: When browser reach the lowest level of element. In this case, you have clicked on a table cell (table data) hence target would be "td" tag. Then browser checks whether you have any click handler attached to this element. If there is any, browser executes that click hander. This is called target phase (phase -2).

3. Bubbling: After firing click hander attached to "td", browser walks toward root. One level upward and check whether there is any click handler attached with table row ("tr" element). If there is any it will execute that. Then it goes to tbody, table, body, html, document, window. In this stage its moving upward and this is called event bubbling or bubbling phase (phase-3). Please note that, you clicked on cell but all the event handler with parent elements will be fired. This is actually very powerful (check event delegation)

What's the difference between an "attribute" and a "property"?
--------------------------------------------------------------
Attributes are defined by HTML. Properties are defined by DOM. Some HTML attributes have 1:1 mapping onto properties. id is one example of such. Some do not (e.g. the value attribute specifies the initial value of an input, but the value property specifies the current value).

Extending built in Javascript objects
-------------------------------------
pros: It looks better and is more intuitive, syntax sugar. It is a type/instance specific function, so it should be specifically bound to that type/instance.
cons: Code can interfere. If lib A adds a function, it could overwrite lib B's. This can break code very easily.

It's better to define your own custom behaviour and class instead of changing a native one, so that nothing breaks. Chance of collisions and performance overhead

Element.prototype.hide = function() {
    this.style.display = 'none';
};

var element = document.createElement('p');

element.style.display; // ''
element.hide();
element.style.display; // 'none'

Difference between document load event and document DOMContentLoaded event?
---------------------------------------------------------------------------
document ready: when a HTML document is loaded and rendered
document load: when a HTML document and assets in the document are all loaded and rendered

What is the difference between == and === ?
-------------------------------------------
The identity (===) operator behaves identically to the equality (==) operator except no type conversion is done, and the types must be the same to be considered equal.

JavaScript has two sets of equality operators: === and !==, and their evil twins == and !=. The good ones work the way you would expect. If the two operands are of the same type and have the same value, then === produces true and !== produces false. The evil twins do the right thing when the operands are of the same type, but if they are of different types, they attempt to coerce the values. the rules by which they do that are complicated and unmemorable. These are some of the interesting cases:

'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true

Explain the same-origin policy with regards to JavaScript.
----------------------------------------------------------
The same-origin policy restricts how a document or script loaded from one origin can interact with a resource from another origin. Same-origin Policy is used as a means to prevent some of the Cross-site Request Forgery attacks.
There can be failures even in the same site if there is a different protocol (https), different port, or different host
ex: http://store.company.com/dir/page.html
http://store.company.com/d - success


Use CORS to allow cross-origin access.
Access-Control-Allow-Origin: http://foo.example
.htaccess file
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER
Access-Control-Max-Age: 1728000

Make this work
--------------
duplicate([1,2,3,4,5]);

let duplicate = (arr) => arr.concat(arr);

spread operator
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2];

Why is it called a Ternary expression, what does the word "Ternary" indicate?
-----------------------------------------------------------------------------
'Ternary' means operands with three(n-ary) param. This is a one-line shorthand for an if-then statement. It is called a ternary operator or a conditional operator.
Returns one of two expressions depending on a condition.
test ? expression1 : expression2

There also unary and binary operans
++1 / 2+2

Use strict
----------
Strict mode makes several changes to normal JavaScript semantics. First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode. Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.
Strict mode is a way to opt in to a restricted variant of JavaScript. Strict mode isn’t just a subset: it intentionally has different semantics from normal code.

Advantages:
- Cannot assign a value to an undefined global variable
- Fire TypeError for not-allowed assignments
- this in a normal function refers to undefined, instead of global

"use strict"; // whole thing

OR
// Non-strict code...

(function(){
  "use strict";

  // Define your library strictly...
})();

// Non-strict code..

Fizz Buzz
=========

for(var i=0; i <= 100; i++) {
    if (i%3 === 0 && i%5 === 0 ) {
       console.log('fizzbuzz');
    }

    else if (i%3 === 0) {
        console.log('fizz');
    }

    else if (i%5 === 0 ) {
       console.log('buzz');
    }

    else
        console.log(i);
}

for(i=0;i<100;)console.log((i%3?'':'Fizz')+(i%5?'':'Buzz')||i)

Why is it a good idea to leave the global scope of a website as-is and never touch it?
-----------------------------------------------
---------------------------------------
- It’s harder to read the code and reason about it when variables seem to appear out of thin air (but really from the global scope).
- Anyone can update a global variable from any point in the program at any time (and from any thread if there’s more than one going).
- General code smell - if you're too lazy to put the variable only where it needs to be then what other corners are you cutting?
- It’s probable that you'll encounter global variable name clashes. Since there’s only one namespace you're more likely to double up on a variable name.

- Non-locality -- Source code is easiest to understand when the scope of its individual elements are limited. Global variables can be read or modified by any part of the program, making it difficult to remember or reason about every possible use.
No Access Control or Constraint Checking -- A global variable can be get or set by any part of the program, and any rules regarding its use can be easily broken or forgotten. (In other words, get/set accessors are generally preferable over direct data access, and this is even more so for global data.) By extension, the lack of access control greatly hinders achieving security in situations where you may wish to run untrusted code (such as working with 3rd party plugins).
- Implicit coupling -- A program with many global variables often has tight couplings between some of those variables, and couplings between variables and functions. Grouping coupled items into cohesive units usually leads to better programs.
Concurrency issues -- if globals can be accessed by multiple threads of execution, synchronization is necessary (and too-often neglected). When dynamically linking modules with globals, the composed system might not be thread-safe even if the two independent modules tested in dozens of different contexts were safe.
- Namespace pollution -- Global names are available everywhere. You may unknowingly end up using a global when you think you are using a local (by misspelling or forgetting to declare the local) or vice versa. Also, if you ever have to link together modules that have the same global variable names, if you are lucky, you will get linking errors. If you are unlucky, the linker will simply treat all uses of the same name as the same object.
- Memory allocation issues -- Some environments have memory allocation schemes that make allocation of globals tricky. This is especially true in languages where "constructors" have side-effects other than allocation (because, in that case, you can express unsafe situations where two globals mutually depend on one another). Also, when dynamically linking modules, it can be unclear whether different libraries have their own instances of globals or whether the globals are shared.
- Testing and Confinement - source that utilizes globals is somewhat more difficult to test because one cannot readily set up a 'clean' environment between runs. More generally, source that utilizes global services of any sort (e.g. reading and writing files or databases) that aren't explicitly provided to that source is difficult to test for the same reason. For communicating systems, the ability to test system invariants may require running more than one 'copy' of a system simultaneously, which is greatly hindered by any use of shared services - including global memory - that are not provided for sharing as part of the test.

Namespacing
-----------
In many programming languages, namespacing is a technique employed to avoid collisions with other objects or variables in the global namespace. They're also extremely useful for helping organize blocks of functionality in your application into easily manageable groups that can be uniquely identified.

Single global variables
Object literal notation
Nested namespacing
Immediately-invoked Function Expressions
Namespace injection
Module Pattern

document.write()
----------------
Shouldn't be used after the page has loaded to change the content as it will overwrite the entire page
add script files, overwrite the page

Why would you use something like the load event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?
-----------------------------------------------------------------------------------------------------------------------------------------------
 The load event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading. To execute anything post document load, we fire these events.
- If you want event function to execute before fully loaded frames, images, async scripts, use domcontentloaded instead. or just normal scripts
- Lazy loading, below the fold
- window.onload => want to do things with the DOM here

Explain what a single page app is and how to make one SEO-friendly.
-------------------------------------------------------------------
Single-Page Applications (SPAs) are Web apps that load a single HTML page and dynamically update that page as the user interacts with the app. SPAs use AJAX and HTML5 to create fluid and responsive Web apps, without constant page reloads. However, this means much of the work happens on the client side, in JavaScript.

However, relying heavily on JavaScript to render your page content and provide navigation functionality brings with it well-known risks in terms of technical SEO, indexing and linkability challenges. Here are some proven strategies for creating AJAX sites and Single Page Applications that are not search disasters.

Background: Client Side JavaScript and URL Fragments

Client-side web frameworks are heavily using a technology referred to as AJAX — Asynchronous JavaScript and XML. It turns static websites into dynamic web applications that can present rich and varied user experiences without refreshing the entire page and changing the URL. Different states of the application are typically denoted by appending a hashtag to the URL, recognizable by the (#) prefix (e.g. http://www.hugeinc.com/#aboutus).

- Much better / App like user experience
- Single page apps don't perform well on search engines

SEO
Due to the lack of HTML5 History support in browsers, single page apps based their navigation URLs in HTML bookmark anchors (URLs with #, like /home#section1). These are not easily indexed as separate pages by search engines, there are ways to do it but it's a pain and there will always be difficulties getting this indexed right as opposed to use just plain HTML.

The good news is that none of these two reasons are 100% accurate anymore! Google has started to index better single page apps.

And the recent deprecation of IE9 means that HTML5 History is available almost everywhere, making the use of anchor URLs not needed anymore for SPAs, we can just use plain URLs (like /home/section1).

Also, there is still the issue of performance: a single page app will be slower due to the large Javascript amounts that it needs and large startup time, and will therefore perform worse than an HTML-based solution.

What is the extent of your experience with Promises and/or their polyfills?
---------------------------------------------------------------------------
The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

var promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

console.log(promise1);

-states
    pending: initial state, neither fulfilled nor rejected.
    fulfilled: meaning that the operation completed successfully.
    rejected: meaning that the operation failed.
- polyfill with babelJS


function getFirstUser() {
    return getUsers().then(function(users) {
        return users[0].name;
    }).catch(function(err) {
        return {
          name: 'default user'
        };
    });
}

In fact every async function you write will return a promise, and every single thing you await will ordinarily be a promise.
Even though promises will usually be for ‘future’ data, once I actually have a promise for something, I really don’t need to care whether the data will be there in future, or it’s already been retrieved. I just call `then()` in either case. As such, promises force consistent asynchronicity

promise = await /async

async function getFirstUser() {
    let users = await getUsers();
    return users[0].name;
}

async function getFirstUser() {
    try {
        let users = await getUsers();
        return users[0].name;
    } catch (err) {
        return {
            name: 'default user'
        };
    }
}

awaiting multiple values - same of async/await and promises
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

Ex:
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

asyncCall();

What are the pros and cons of using Promises instead of callbacks?
------------------------------------------------------------------
It is fair to say promises are just syntactic sugar. Everything you can do with promises you can do with callbacks. The deep reason why promises are often better is that they’re more composeable, which roughly means that combining multiple promises “just works” and is more readable, while combining multiple callbacks often doesn’t and creates callback hell.

What are callbacks?
-------------------
Callbacks are just the name of a convention for using JavaScript functions. There isn't a special thing called a 'callback' in the JavaScript language, it's just a convention. Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result. The word 'asynchronous', aka 'async' just means 'takes some time' or 'happens in the future, not right now'. Usually callbacks are only used when doing I/O, e.g. downloading things, reading files, talking to databases, etc.

Callback Hell
-------------
The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom. Lots of people make this mistake! In other languages like C, Ruby or Python there is the expectation that whatever happens on line 1 will finish before the code on line 2 starts running and so on down the file. As you will learn, JavaScript is different.

chaining callbacks inside one another, creates a pyramid of nested functions!

Memoizing - store answers in an array (cheap js memoize)
---------
In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?
-------------------------------------------------------------------------------------------------------------------
Example: CoffeeScript. Pros/Cons: Syntactic sugar, readable code, and use of good patterns vs debugging and compilation issues

Encourages the use of good JavaScript patterns
Discourages JavaScript anti-patterns
Makes even good JavaScript code shorter and more readable

Cons: Ramp up period....just use Flow, esLint

What tools and techniques do you use debugging JavaScript code?  
---------------------------------------------------------------
Web/Browser console using console.log. Firebug, Developer Tools, break points, node-debugger

What language constructions do you use for iterating over object properties and array items?
-------------------------------------------------------------------------------------------
for loop, for..in, for each..in, map, reduce etc.

Explain the difference between mutable and immutable objects. What is an example of an immutable object in JavaScript? What are the pros and cons of immutability? How can you achieve immutability in your own code?
----------------------------------------------------------------
Mutable objects are those whose state is allowed to change over time. An immutable value is the exact opposite — after it has been created, it can never change. Strings and Numbers are inherently immutable in javascript.

var statement = "I am an immutable value";
var otherStr = statement.slice(8, 17);

JavaScript doesn’t (yet) have immutable lists and maps, so we’ll need a third-party library for now. Immutable.js

function revealTile(game, tile) {
  return game.setIn(['tiles', tile, 'isRevealed'], true);
}

Now the revealTile function returns a new immutable instance, where one of the tiles is different from the previous version. setIn is null-safe and will pad with empty objects if any part of the key does not exist. This is not desirable in the case of the Minesweeper board, because a missing tile means we’re trying to reveal a tile outside the board. This could be mitigated by using getIn to look for the tile before manipulating it:

You might think that this would yield terrible performance, and in some ways you’d be right. Whenever you add something to an immutable object, we need to create a new instance by copying the existing values and add the new value to it. This will certainly be both more memory intensive and more computationally challenging than mutating a single object.

Because immutable objects never change, they can be implemented using a strategy called “structural sharing”, which yields much less memory overhead than you might expect. There will still be an overhead compared to built-in arrays and objects, but it’ll be constant, and can typically be dwarfed by other benefits enabled by immutability. In practice, the use of immutable data will in many cases increase the overall performance of your app, even if certain operations in isolation become more expensive.

Explain the difference between synchronous and asynchronous functions
---------------------------------------------------------------------
Synchronous: Step wise execution. Next line executed after first. Asynchronous: Execution moves to next step before first is finished. When you execute something synchronously, you wait for it to finish before moving on to another task. When you execute something asynchronously, you can move on to another task before it finishes.

That being said, in the context of computers this translates into executing a process or task on another "thread." A thread is a series of commands (a block of code) that exists as a unit of work. The operating system can manage multiple threads and assign a thread a piece ("slice") of processor time before switching to another thread to give it a turn to do some work. At its core (pardon the pun), a processor can simply execute a command, it has no concept of doing two things at one time. The operating system simulates this by allocating slices of time to different threads.

Now, if you introduce multiple cores/processors into the mix, then things CAN actually happen at the same time. The operating system can allocate time to one thread on the first processor, then allocate the same block of time to another thread on a different processor. All of this is about allowing the operating system to manage the completion of your task while you can go on in your code and do other things.

What is event loop? What is the difference between call stack and task queue?
-----------------------------------------------------------------------------
JavaScript has a concurrency model based on an “event loop”, stack, queue, heap. In JavaScript, almost all I/O is non-blocking. This includes HTTP requests, database operations and disk reads and writes; the single thread of execution asks the runtime to perform an operation, providing a callback function and then moves on to do something else. When the operation has been completed, a message is enqueued along with the provided callback function. At some point in the future, the message is dequeued and the callback fired.

Heap : Stores All variables, Objects, Functions and To all this memory is allocated

Event Queue : Contains list functions TO BE EXCECUTED By Stack.

Stack : EXECUTES FUNCTIONS held by Event queue

Event Loop : Manages the Event Queue and Stack. If The Stack is empty and Event Queue contains functions to execute.then push the first function from Event Queue to Stack

STACK - call stack
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7)); //returns 42

When calling bar, a first frame is created containing bar's arguments and local variables. When bar calls foo, a second frame is created and pushed on top of the first one containing foo's arguments and local variables. When foo returns, the top frame element is popped out of the stack (leaving only bar's call frame). When bar returns, the stack is empty.

HEAP - Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory.

QUEUE - A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function which gets called in order to handle the message. At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one. To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use. The processing of functions continues until the stack is once again empty; then the event loop will process the next message in the queue (if there is one).

The event loop got its name because of how it's usually implemented, which usually resembles:
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
queue.waitForMessage() waits synchronously for a message to arrive if there is none currently.

Each message is processed completely before any other message is processed. This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be pre-empted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it can be stopped at any point to run some other code in another thread.
A downside of this model is that if a message takes too long to complete, the web application is unable to process user interactions like click or scroll. The browser mitigates this with the "a script is taking too long to run" dialog. A good practice to follow is to make message processing short and if possible cut down one message into several messages.

* In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there is no listener, the event is lost. So a click on an element with a click event handler will add a message--likewise with any other event.

Zero delay doesn't actually mean the call back will fire-off after zero milliseconds. Calling setTimeout with a delay of 0 (zero) milliseconds doesn't execute the callback function after the given interval.

The execution depends on the number of waiting tasks in the queue. In the example below, the message ''this is just a message'' will be written to the console before the message in the callback gets processed, because the delay is the minimum time required for the runtime to process the request, but not a guaranteed time.

Basically, the setTimeout needs to wait for all the codes to complete even though you specified a particular time limit for your setTimeout.

Web Worker / Cross-origin
A web worker or a cross-origin iframe has its own stack, heap, and message queue. Two distinct runtimes can only communicate through sending messages via the postMessage method. This method adds a message to the other runtime if the latter listens to message events.

Non-blocking
A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or an XHR request to return, it can still process other things like user input.

Legacy exceptions exist like alert or synchronous XHR, but it is considered as a good practice to avoid them. Beware, exceptions to the exception do exist (but are usually implementation bugs rather than anything else).
JavaScript enables a developer to build their system around a collection of asynchronously-fired callbacks, freeing the runtime to handle concurrent operations while waiting on external events to happen.


Explain the differences on the usage of foo between function foo() {} and var foo = function() {}
-------------------------------------------------------------------------------------------------
First one is declaration defined at parse time while the other is expression defined at run time.

Function declarations load before any code is executed.
Function expressions load only when the interpreter reaches that line of code.

So if you try to call a function expression before it's loaded, you'll get an error! If you call a function declaration instead, it'll always work, because no code can be called until all declarations are loaded.
alert(foo()); // ERROR! foo wasn't loaded yet
var foo = function() { return 5; }

alert(foo()); // Alerts 5. Declarations are loaded before any code can run.
function foo() { return 5; } i

What are the differences between variables created using let, var or const?
---------------------------------------------------------------------------
- const: means that the identifier can’t be reassigned. (Not to be confused with immutable values. Unlike true immutable datatypes such as those produced by Immutable.js and Mori, a `const` object can have properties mutated.)
- let: variable that  can be reassigned. It also signals that the variable will be used only in the block it’s defined in, which is not always the entire containing function.
- Don’t use `var` in ES6. There is value in block scope for loops, but I can’t think of a situation where I’d prefer `var` over `let`. `var` is now the weakest signal available when you define a variable in JavaScript. The variable may or may not be reassigned, and the variable may or may not be used for an entire function, or just for the purpose of a block or loop.

* Always initialize your identifiers before you try to use them…

What are the differences between ES6 class and ES5 function constructors?
-------------------------------------------------------------------------

// class
class ClassCar {
  drive () {
    console.log('Vroom!');
  }
}

const car1 = new ClassCar();
console.log(car1.drive());


// constructor
function ConstructorCar () {}

ConstructorCar.prototype.drive = function () {
  console.log('Vroom!');
};

const car2 = new ConstructorCar();
console.log(car2.drive());


// factory
const proto = {
  drive () {
    console.log('Vroom!');
  }
};

function factoryCar () {
  return Object.create(proto);
}

const car3 = factoryCar();
console.log(car3.drive());

In JavaScript, any function can return a new object. When it’s not a constructor function or class, it’s called a factory function. In other words, they have mostly the same features, and could mostly be used interchangeably.
https://gist.github.com/remarkablemark/fa62af0a2c57f5ef54226cae2258b38d

Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?
--------------------------------------------------------------------------------------------------------------------

An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

Arrow Functions, or “fat arrow functions,” introduce a new syntax for defining functions that is very concise. We can avoid typing keywords like function, return and even curly brackets { } and parentheses ()

let mirror = value => value;
// equivalent to:
let mirror = function(value) {
  return value;
};
OR - * you must include empty parentheses
let getMessage = () => 'Hello World';
// equivalent to:
let getMessage = function() {
  return 'Hello World';
}
OR
// with arrow function
let result = sampleArray.filter(element => element > 5000);
// without arrow function
let result = sampleArray.filter(function(element) {
  return element > 5000;
});

A few things about arrow functions to keep in mind though:

- They can’t be called with new, can’t be used as constructors (and therefore lack prototype as well)
- Arrow functions have their own scope, but there’s no ‘this’ of their own.
- No arguments object is available. You can use rest parameters however.

Since JavaScript treats functions as first-class, arrow functions make writing functional code like lambda expressions and currying much easier.

“Arrow functions were like rocket fuel for the functional programming explosion in JavaScript.” — Eric Elliott

* Default Parameters
function counts(number1 = 5, number2 = 10) {
  // do anything here
}

What advantage is there for using the arrow syntax for a method in a constructor?
---------------------------------------------------------------------------------
There’s an even cleaner solution to this problem using arrow functions. Recall we said that arrow functions take their value of this from the lexical scope. That means it just uses the value of this in the surrounding code block. It doesn’t care what calls it, it just cares where it was defined.

let obj = {
  myVar: 'foo',

  myFunc: function() {
    console.log(this.myVar)  

    setTimeout(() => {
      console.log(this.myVar)
    }, 1000)
  }
}
obj.myFunc() // foo ... then... foo

The takeaway: Function expressions are best for object methods. Arrow functions are best for callbacks or methods like map, reduce, or forEach.

- Use function in the global scope and for Object.prototype properties.
- Use class for object constructors.
- Use => everywhere else.
Why use arrow functions almost everywhere?

Scope safety: When arrow functions are used consistently, everything is guaranteed to use the same thisObject as the root. If even a single standard function callback is mixed in with a bunch of arrow functions there's a chance the scope will become messed up.
Compactness: Arrow functions are easier to read and write. (This may seem opinionated so I will give a few examples further on).
Clarity: When almost everything is an arrow function, any regular function immediately sticks out for defining the scope. A developer can always look up the next-higher function statement to see what the thisObject is.
Why always use regular functions on the global scope or module scope?

To indicate a function that should not access the thisObject.
The window object (global scope) is best addressed explicitly.
Many Object.prototype definitions live in the global scope (think String.prototype.truncate etc.) and those generally have to be of type function anyway. Consistently using function on the global scope helps avoid errors.
Many functions in the global scope are object constructors for old-style class definitions.
Functions can be named1. This has two benefits: (1) It is less awkward to writefunction foo(){} than const foo = () => {} — in particular outside other function calls. (2) The function name shows in stack traces. While it would be tedious to name every internal callback, naming all the public functions is probably a good idea.
Function declarations are hoisted, (meaning they can be accessed before they are declared), which is a useful attribute in a static utility function.

What is the definition of a higher-order function?
--------------------------------------------------
Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions. Higher-order functions allow us to abstract over actions, not just value.

map, filter and reduce/reduceRightare the functions present in JavaScript that map to classic higher order functions in other functional languages.

In functional programming languages, there are no loops. When you need to do an operation like traversing a list or a tree, there are two predominant styles: recursion and higher order functions.

var newArr = [];
var myArr = [ 1, 2, 3 ];
for(var i = 0; i < myArr.length; i++) {
  newArr.push(myArr[i] * 2);
}
console.log(newArr); // [ 2, 4, 6 ]
// nicer with `map`
const doubled = myArr.map( x => x * 2 );
console.log(doubled); // [ 2, 4, 6 ]

Side-effect free programming
Array higher order functions do not mutate the variable they are called on. This is good, because the loop-based approach using .push and .pop changes it. It means if you pass a variable as a parameter, it’s not suddenly going to get changed by a function down the call stack.

- Functions that create new functions.
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

- Functions that change other functions.
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1

- Functions that provide new types of control flow.
function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even

First-class functions
----------------------
A language with first-class functions means that it treats functions like expressions of any other type. Functions are like any other object.
- You can pass them into other functions as parameters
- You can assign a function as a value to a variable
- You can return a function

Can you give an example for destructuring an object or an array?
----------------------------------------------------------------
const { action = null, data: objectId = null } = e.data || {};

ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?
------------------------------------------------------------------------------------------------
Template strings bring simple string interpolation to JavaScript. That is, they’re a nice-looking, convenient way to plug JavaScript values into a string.

${user.name} - template substitutions instead of plus icon
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      `User ${user.name} is not authorized to do ${action}.`);
  }
}

- The code in a template substitution can be any JavaScript expression, so function calls, arithmetic, and so on are allowed. (If you really want to, you can even nest a template string inside another template string, which I call template inception.)
- If either value is not a string, it’ll be converted to a string using the usual rules. For example, if action is an object, its .toString() method will be called.
- If you need to write a backtick inside a template string, you must escape it with a backslash: `\`` is the same as "`".
- Likewise, if you need to include the two characters ${ in a template string, I don’t want to know what you’re up to, but you can escape either character with a backslash: `write \${ or $\{`.
- Allows multiple lines
- Template strings don’t have any built-in syntax for looping
- They don’t automatically escape special characters for you. To avoid cross-site scripting vulnerabilities, you’ll still have to treat untrusted data with care, just as if you were concatenating ordinary strings.

Can you give an example of a curry function and why this syntax offers an advantage?
------------------------------------------------------------------------------------
One of the advantages touted for functional JavaScript is shorter, tighter code that gets right to the point in the fewest lines possible, and with less repetition. Sometimes this can come at the expense of readability; until you’re familiar with the way the functional programming works, code written in this way can be harder to read and understand.

Briefly, currying is a way of constructing functions that allows partial application of a function’s arguments. What this means is that you can pass all of the arguments a function is expecting and get the result, or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments. It really is that simple.

Currying is elemental in languages such as Haskell and Scala, which are built around functional concepts. JavaScript has functional capabilities, but currying isn’t built in by default (at least not in current versions of the language). But we already know some functional tricks, and we can make currying work for us in JavaScript, too.

var greetCurried = function(greeting) {
  return function(name) {
    console.log(greeting + ", " + name);
  };
};

var greetHello = greetCurried("Hello");
greetHello("Heidi"); //"Hello, Heidi"
greetHello("Eddie"); //"Hello, Eddie"
greetCurried("Hi there")("Howard"); //"Hi there, Howard"


var greetDeeplyCurried = function(greeting) {
  return function(separator) {
    return function(emphasis) {
      return function(name) {
        console.log(greeting + separator + name + emphasis);
      };
    };
  };
};

var greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");
greetAwkwardly("Heidi"); //"Hello...Heidi?"
greetAwkwardly("Eddie"); //"Hello...Eddie?"

^MESSY

Clean
var curryIt = function(uncurried) {
  var parameters = Array.prototype.slice.call(arguments, 1);
  return function() {
    return uncurried.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  };
};

var greeter = function(greeting, separator, emphasis, name) {
  console.log(greeting + separator + name + emphasis);
};
var greetHello = curryIt(greeter, "Hello", ", ", ".");
greetHello("Heidi"); //"Hello, Heidi."
greetHello("Eddie"); //"Hello, Eddie."

What are the benefits of using spread syntax and how is it different from rest syntax?
--------------------------------------------------------------------------------------
Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected

function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

console.log(sum.apply(null, numbers));
// expected output: 6

The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3));
// expected output: 6

console.log(sum(1, 2, 3, 4));
// expected output: 10

rest parameters are only the ones that haven't been given a separate name, while the arguments object contains all arguments passed to the function;
the arguments object is not a real array, while rest parameters are Array instances, meaning methods like sort, map, forEach or pop can be applied on it directly;
the arguments object has additional functionality specific to itself (like the callee property).

How can you share code between files?
-------------------------------------
- ES6 modules import/export

Why you might want to create static class members?
--------------------------------------------------
The static keyword defines a static method for a class. Static method calls are made directly on the class and are not callable on instances of the class. Static methods are often used to create utility functions.

class Triple {
  static triple(n) {
    if (n === undefined) {
      n = 1;
    }
    return n * 3;
  }
}

class BiggerTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

console.log(Triple.triple());        // 3
console.log(Triple.triple(6));       // 18

var tp = new Triple();

console.log(BiggerTriple.triple(3));
// 81 (not affected by parent's instantiation)

console.log(tp.triple());
// 'tp.triple is not a function'.

OO Program VS Functional Program
--------------------------------

* OO
(function() {
  "use strict";
  var SomeText = function(text) {
    this.text = text;
  };
  SomeText.prototype.capify = function(str) {
    var firstLetter = str.charAt(0);
    var remainder = str.substring(1);
    return [firstLetter.toUpperCase(), remainder].join("");
  };
  SomeText.prototype.capifyWords = function() {
    var result = [];
    var textArray = this.text.split(" ");
    for (var counter = 0; counter < textArray.length; counter++) {
      result.push(this.capify(textArray[counter]));
    }
    return result.join(" ");
  };

  document.getElementById("main_button").addEventListener("click", function(e) {
    var something = prompt("Give me something to capitalize");
    var newText = new SomeText(something);
    alert(newText.capifyWords());
  });
}());

* Functional
(function() {
  "use strict";
  var capify = function(str) {
    return [str.charAt(0).toUpperCase(), str.substring(1)].join("");
  };
  var processWords = function(fn, str) {
    return str.split(" ").map(fn).join(" ");
  };
  document.getElementById("main_button").addEventListener("click", function(e) {
    var something = prompt("Give me something to capitalize");
    alert(processWords(capify, something));
  });
}());

* Each of these functions is pure, meaning that they don’t rely on the state of the code they’re called from. The functions don’t create side effects that alter variables outside of themselves. There is one and only one result a function returns for any given set of arguments. Because of these improvements, the new functions are very easy to test, and could be snipped right out of this code and used elsewhere without any modifications.

Just using map here, in place of a for loop, eliminated the counter variable and helped make our code much cleaner and easier to read.

Are my functions dependent on the context in which they are called, or are they pure and independent?
Can I write these functions in such a way that I could depend on them always returning the same result for a given input?
Am I sure that my functions don’t modify anything outside of themselves?
If I wanted to use these functions in another program, would I need to make changes to them?

Recursion
---------
Instead of loops! factorial recursion
var countdown = function(value) {
    if(value > 0) {
        console.log(value);
        return countdown(value -1);
    }
    else {
        return value;
    }
};
countdown(10);

BETTER
Also worth noticing is the way we test the value of the argument being passed in to the function first thing, before doing any calculations. We want any functions that are going to call themselves to exit quickly and cleanly when they get to their terminal case. For a factorial calculated this way, the terminal case comes when the number passed in is zero or negative

var factorial = function(number) {
  if (number <= 0) { // terminal case
    return 1;
  } else { // block to execute
    return (number * factorial(number - 1));
  }
}
console.log(factorial(6));

Higher Order Function - https://www.sitepoint.com/higher-order-functions-javascript/
---------------------
The strategy of passing in a function to be executed after the rest of the parent function’s operations are complete is one of the basic characteristics of languages that support higher-order functions. It allows for asynchronous behavior, so a script can continue executing while waiting for a result. The ability to pass a callback function is critical when dealing with resources that may return a result after an undetermined period of time.

var attitude = function(original, replacement, source) {
  return function(source) {
    return source.replace(original, replacement);
  };
};

var snakify = attitude(/millenials/ig, "Snake People");
var hippify = attitude(/baby boomers/ig, "Aging Hippies");

console.log(snakify("The Millenials are always up to something."));
// The Snake People are always up to something.
console.log(hippify("The Baby Boomers just look the other way."));
// The Aging Hippies just look the other way.

First Class Functions
---------------------
You may have heard it said that JavaScript treats functions as first-class citizens. What this means is that functions in JavaScript are treated as objects. They have the type Object, they can be assigned as the value of a variable, and they can be passed and returned just like any other reference variable. Allows functional programming to be easier. Higher-order functions are so basic to the way JavaScript works, you’re already using them. Every time you pass an anonymous function or a callback, you’re actually taking the value that the passed function returns, and using that as an argument for another function. As an added bonus, if you make sure your functions are pure, so that they don’t alter external values and they always return the same value for any given input, you put yourself in a good position to create test suites to verify that your code changes don’t break anything you’re relying on when you update your template functions.

Callbacks
---------
A callback is a function that gets executed at the end of an operation, once all of the other operations of been completed. Usually this callback function is passed in as the last argument in the function. Frequently, it’s defined inline as an anonymous function.

Threads
-------
Javasciprt is single threaded, meaning that only one operation happens at a time, each operation that’s going to happen is queued along this single thread.

Passing Functions
-----------------
Note that we passed proveIt and not proveIt() to our addEventListener function. When you pass a function by name without parentheses, you are passing the function object itself. When you pass it with parentheses, you are passing the result of executing that function.

Returning Functions
-------------------
In addition to taking functions as arguments, JavaScript allows functions to return other functions as a result. This makes perfect sense, since functions are simply objects, they can be returned the same as any other value. But what does it mean to return a function as a result? Defining a function as the return value of another function allows you to create functions that can be used as templates to create new functions. That opens the door to another world of functional JavaScript magic.

Functional Programming - https://www.sitepoint.com/introduction-functional-javascript/
----------------------
You can mix your imperative, object-oriented, prototypal, and functional code as you see fit. It's up to you to make the right choices for maintainability, readability, & performance.

- Imperative:
var result;
function getText() {
  var someText = prompt("Give me something to capitalize");
  capWords(someText);
  alert(result.join(" "));
};
function capWords(input) {
  var counter;
  var inputArray = input.split(" ");
  var transformed = "";
  result = [];
  for (counter = 0; counter < inputArray.length; counter++) {
    transformed = [
      inputArray[counter].charAt(0).toUpperCase(),
      inputArray[counter].substring(1)
    ].join("");
    result.push(transformed);
  }
};
document.getElementById("main_button").onclick = getText;
    - So many things are going on in this little snippet of code. Variables are being defined on the global scope. Values are being passed around and modified by functions. DOM methods are being mixed with native JavaScript.
- OO:
(function() {
  "use strict";
  var SomeText = function(text) {
    this.text = text;
  };
  SomeText.prototype.capify = function(str) {
    var firstLetter = str.charAt(0);
    var remainder = str.substring(1);
    return [firstLetter.toUpperCase(), remainder].join("");
  };
  SomeText.prototype.capifyWords = function() {
    var result = [];
    var textArray = this.text.split(" ");
    for (var counter = 0; counter < textArray.length; counter++) {
      result.push(this.capify(textArray[counter]));
    }
    return result.join(" ");
  };

  document.getElementById("main_button").addEventListener("click", function(e) {
    var something = prompt("Give me something to capitalize");
    var newText = new SomeText(something);
    alert(newText.capifyWords());
  });
}());

    - But despite all this reconfiguration, there are still many artifacts of the same imperative style that led us here. The methods in the constructor function rely on variables that are scoped to the parent object. There’s a looping construct for iterating across all the members of the array of strings. There’s a counter variable that serves no purpose other than to increment the progress through the for loop. And there are methods that produce the side effect of modifying variables that exist outside of their own definitions. All of this makes the code more brittle, less portable, and makes it harder to test the methods outside of this narrow context.

- Functional:
(function() {
  "use strict";
  var capify = function(str) {
    return [str.charAt(0).toUpperCase(), str.substring(1)].join("");
  };
  var processWords = function(fn, str) {
    return str.split(" ").map(fn).join(" ");
  };
  document.getElementById("main_button").addEventListener("click", function(e) {
    var something = prompt("Give me something to capitalize");
    alert(processWords(capify, something));
  });
}());
    - Did you notice how much shorter this version is? We’re only defining two functions: capify and processWords. Each of these functions is pure, meaning that they don’t rely on the state of the code they’re called from. The functions don’t create side effects that alter variables outside of themselves. There is one and only one result a function returns for any given set of arguments. Because of these improvements, the new functions are very easy to test, and could be snipped right out of this code and used elsewhere without any modifications. Just using map here, in place of a for loop, eliminated the counter variable and helped make our code much cleaner and easier to read.

Thinking functionally:
 - Are my functions dependent on the context in which they are called, or are they pure and independent?
 - Can I write these functions in such a way that I could depend on them always returning the same result for a given input?
 - Am I sure that my functions don’t modify anything outside of themselves?
 - If I wanted to use these functions in another program, would I need to make changes to them?

Server side vs Client side rendering
------------------------------------
- Server:
Whenever you visit a website, your browser makes a request to the server that contains the contents of the website. The request usually only takes a few milliseconds, but that ultimately depends on a multitude of factors: Your internet speed, the location of the server, how many people try to access the site, how optimized the website is.

On the bright side, server-side rendering is great for SEO. Your content is present before you get it, so search engines are able to index it and crawl it just fine. Something that is not so with client-side rendering. At least not simply.

Server-side pros:
 Search engines can crawl the site for better SEO.
 The initial page load is faster.
 Great for static sites.
Server-side cons:
 Frequent server requests.
 An overall slow page rendering.
 Full page reloads.
 Non-rich site interactions.

- Client:
When developers talk about client-side rendering, they’re talking about rendering content in the browser using JavaScript. So instead of getting all of the content from the HTML document itself, you are getting a bare-bones HTML document with a JavaScript file that will render the rest of the site using the browser. This is radically different than using server-side rendering because the server is now only responsible for loading the bare minus of the website. The main boilerplate. Everything else is handled by a client-side JavaScript library, in this case, Vue.js, and custom JavaScript code.

The key difference is that if you were to click on the link the page to load more content, the browser will not make another request to the server. You are rendering items with the browser, so it will instead use JavaScript to load the new content and Vue.js will make sure that only the new content is rendered. Everything else will be left alone.

Since the content is not rendered until the page is loaded on the browser, SEO for the website will take a hit. There are ways to get around this, but it’s not as easy as it is with server-side rendering.

Client-side pros:
 Rich site interactions
 Fast website rendering after the initial load.
 Great for web applications.
 Robust selection of JavaScript libraries.
Client-side cons:
 Low SEO if not implemented correctly.
 Initial load might require more time.
 In most cases, requires an external library.


HTML
====
What does a doctype do?
-----------------------
doctype is an abbreviation for document type. It is a declaration used in HTML5 to distinguish between a standards-compliant parsing mode and a quirks parsing mode. Hence its presence tells the browser to parse and render the webpage in standards mode.

Moral of the story, just add <!DOCTYPE html> to the start of your page.

How do you serve a page with content in multiple languages?
-----------------------------------------------------------
The question is a little vague, I will assume that it is asking about the most common case, which is how to serve a page with content available in multiple languages, but the content within the page is only in a single language.

When an HTTP request is made to a server, the requesting user agent usually sends information about language preferences, such as in the Accept-Language header. The server can then use this information to return a version of the document in the appropriate language if such an alternative is available. The returned HTML document should also declare the lang attribute in the <html> tag, such as <html lang="en">...</html>.

In the back end, the HTML markup will contain i18n placeholders and content for the specific language stored in YML or JSON formats. The server then dynamically generates the HTML page with content in that particular language, usually with the help of a back end framework.

What kind of things must you be wary of when design or developing for multilingual sites?
-----------------------------------------------------------------------------------------
- Use lang attribute in your HTML.
- Directing users to their native language — Allow a user to change his country/language easily without hassle.
- Text in images is not a scalable approach — Placing text in an image is still a popular way to get good-looking, non-system fonts to display on any computer. However to translate image text, each string of text will need to have it’s a separate image created for each language. Anything more than a handful of replacements like this can quickly get out of control.
- Restrictive words / sentence length — Some content can be longer when written in another language. Be wary of layout or overflow issues in the design. It’s best to avoid designing where the amount of text would make or break a design. Character counts come into play with things like headlines, labels, and buttons. They are less of an issue with free flowing text such as body text or comments.
- Be mindful of how colors are perceived — Colors are perceived differently across languages and cultures. The design should use color appropriately.
- Formatting dates and currencies — Calendar dates are sometimes presented in different ways. Eg. “May 31, 2012” in the U.S. vs. “31 May 2012” in parts of Europe.
- Do not concatenate translated strings — Do not do anything like "The date today is " + date. It will break in languages with different word order. Using template parameters instead.

What are data- attributes good for?
-----------------------------------
Before JavaScript frameworks became popular, front end developers used data- attributes to store extra data within the DOM itself, without other hacks such as non-standard attributes, extra properties on the DOM. It is intended to store custom data private to the page or application, for which there are no more appropriate attributes or elements.

These days, using data- attributes is not encouraged. For one thing, users can modify the data attribute easily by using inspect element in the browser. The data model is better stored within JavaScript itself and stay updated with the DOM via data binding possibly through a library or a framework.

Consider HTML5 as an open web platform. What are the building blocks of HTML5?
------------------------------------------------------------------------------
Semantics — Allowing you to describe more precisely what your content is.
Connectivity — Allowing you to communicate with the server in new and innovative ways.
Offline and storage — Allowing webpages to store data on the client-side locally and operate offline more efficiently.
Multimedia — Making video and audio first-class citizens in the Open Web.
2D/3D graphics and effects — Allowing a much more diverse range of presentation options.
Performance and integration — Providing greater speed optimization and better usage of computer hardware.
Device access — Allowing for the usage of various input and output devices.
Styling — Letting authors write more sophisticated themes.

Describe the difference between a cookie, sessionStorage and localStorage.
--------------------------------------------------------------------------
All the above mentioned technologies are key-value storage mechanisms on the client side. They are only able to store values as strings.

Cookie:

Initiator — Client or server. Server can use Set-Cookieheader
Expiry — Manually set
Persistent across browser sessions — 
Depends on whether expiration is set
Have domain associated — Yes
Sent to server with every HTTP request — Yes
Capacity (per domain) — 4kb
Accessibility — Any window

LocalStorage:

Initiator — Client
Expiry — Forever
Persistent across browser sessions — Yes
Have domain associated — No
Sent to server with every HTTP request — No
Capacity (per domain) — 5MB
Accessibility — Any window

localStorage.setItem('myCat', 'Tom');
var cat = localStorage.getItem("myCat");
localStorage.removeItem("myCat");


sessionStorage:

Initiator — Client
Expiry — On tab close
Persistent across browser sessions — No
Have domain associated — No
Sent to server with every HTTP request — No
Capacity (per domain) — 5MB
Accessibility — Same tab

// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
var data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
sessionStorage.clear();

Describe the difference between script, script async, script defered
--------------------------------------------------------------------
script - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.

script async - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). Use async when the script is independent of any other scripts on the page, for example analytics.

script defer - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. If there are multiple of them, each deferred script is executed in the order they were encoun­tered in the document. If a script relies on a fully-parsed DOM, the defer attribute will be useful in ensuring that the HTML is fully parsed before executing. There's not much difference from putting a normal script at the end of body. A deferred script must not contain document.write.

Why is it generally a good idea to position CSS linka between head /head and JS scripts just before /body? Do you know any exceptions?
--------------------------------------------------------------------------------------------------------------------------------------
Placing links in the head— Putting links in the head is part of the specification. Besides that, placing at the top allows the page to render progressively which improves user experience. The problem with putting stylesheets near the bottom of the document is that it prohibits progressive rendering in many browsers, including Internet Explorer. Some browsers block rendering to avoid having to repaint elements of the page if their styles change. The user is stuck viewing a blank white page. It prevents the flash of unstyled contents.

Placing scripts just before /body — scripts block HTML parsing while they are being downloaded and executed. Downloading the scripts at the bottom will allow the HTML to be parsed and displayed to the user first.

An exception for positioning of scripts at the bottom is when your script contains document.write(), but these days it's not a good practice to use document.write(). Also, placing scripts at the bottom means that the browser cannot start downloading the scripts until the entire document is parsed. One possible workaround is to put script in the head and use the defer attribute.

OR

Client side rendering script in the Head tag

What is progressive rendering?
-----------------------------
Progressive rendering is the name given to techniques used to improve performance of a webpage (in particular, improve perceived load time) to render content for display as quickly as possible.

It used to be much more prevalent in the days before broadband internet but it is still useful in modern development as mobile data connections are becoming increasingly popular (and unreliable)!

Examples of such techniques:

Lazy loading of images — Images on the page are not loaded all at once. JavaScript will be used to load an image when the user scrolls into the part of the page that displays the image.
Prioritizing visible content (or above-the-fold rendering) — Include only the minimum CSS/content/scripts necessary for the amount of page that would be rendered in the users browser first to display as quickly as possible, you can then use deferred scripts or listen for the DOMContentLoaded/load event to load in other resources and content.
Async HTML fragments — Flushing parts of the HTML to the browser as the page is constructed on the back end. More details on the technique can be found here.

Why you would use a srcset attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.
-----------------------------------------------------------------------------------------------------------------------------------------
n short, Srcset is a new attribute which allows you to specify different kind of images for different screen-sizes/orientation/display-types. The usage is really simple, you just provide a lot of different images separating them with a comma like this: <img src="image.jpg" alt="image" srcset="<img> <descriptor>, ..., <img_n> <descriptor_n>">. Here is an example: srcset="image.jpg 160w, image2.jpg 320w, image3.jpg 2x"

Have you used different HTML templating languages before?
--------------------------------------------------------
Mustache, Handlebars, Jade, Haml, JSP, React, Angular

Window vs Document
------------------
Yes. JavaScript has a global object and everything runs under it. window is that global object that holds global variables, global functions, location, history everything is under it. Besides, setTimeout, ajax call (XMLHttpRequest), console or localStorage are part of window.

document is also under window. document is a property of the window object. document represents the DOM and DOM is the object oriented representation of the html markup you have written. All the nodes are part of document. Hence you can use getElementById or addEventListener on document. These methods are not present in the window object.

CSS
===
- https://codeburst.io/clearing-your-front-end-job-interview-css-95bdd82871f2

Repaints
--------
A repaint occurs when changes are made to elements that affect visibility but not the layout. For example, opacity, background-color, visibility, and outline. Repaints are expensive because the browser must check the visibility of all other nodes in the DOM — one or more may have become visible beneath the changed element.

Answer: repaint happens when you change the look of an element without changing the size and shape. This doesn't cause reflow as geometry of the element didn't changed.

- change background color
- change text color
- visibility hidden

Reflows
-------
* Reasons to reflow: The following cases causes reflow

    - change layout (geometry of the page)
    - resize the window
    - change height/width of any element
    - changing font
    - change font size
    - move DOM element (animation)
    - adding or removing stylesheet
    - calculating offset height or offset width
    - display: none;

* How to avoid: To avoid reflow, try to avoid doing things in the above list and some more in the below

    - avoid setting multiple inline style
    - apply animation to the elements that are positioned fixed or absolute
    - avoid tables for layout

Reflows have a bigger impact. This refers to the re-calculation of positions and dimensions of all elements, which leads to re-rendering part or all of the document. Changing a single element can affect all children, ancestors, and siblings.

Adding, removing or changing visible DOM elements
The first is obvious; using JavaScript to change the DOM will cause a reflow.

- Adding, removing or changing CSS styles
Similarly, directly applying CSS styles or changing the class may alter the layout. Changing the width of an element can affect all elements on the same DOM branch and those surrounding it.

- CSS3 animations and transitions
Every frame of the animation will cause a reflow.

- Using offsetWidth and offsetHeight
Bizarrely, reading an element’s offsetWidth and offsetHeight property can trigger an initial reflow so the figures can be calculated.

- User actions
Finally, the user can trigger reflows by activating a :hover effect, entering text in a field, resizing the window, changing the font dimensions, switching stylesheets or fonts.

TESTING
=======

DESIGN PATTERNS
===============

Revealing Module Pattern
------------------------

var myRevealingModule = (function () {

        var privateVar = "Ben Cherry",
            publicVar = "Hey there!";

        function privateFunction() {
            console.log( "Name:" + privateVar );
        }

        function publicSetName( strName ) {
            privateVar = strName;
        }

        function publicGetName() {
            privateFunction();
        }


        // Reveal public pointers to
        // private functions and properties

        return {
            setName: publicSetName,
            greeting: publicVar,
            getName: publicGetName
        };

    })();

myRevealingModule.setName( "Paul Kinlan" );

Facade
------

When we put up a facade, we present an outward appearance to the world which may conceal a very different reality. This was the inspiration for the name behind the next pattern we're going to review - the Facade pattern. This pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity. Think of it as simplifying the API being presented to other developers, something which almost always improves usability.

Facades are a structural pattern which can often be seen in JavaScript libraries like jQuery where, although an implementation may support methods with a wide range of behaviors, only a "facade" or limited abstraction of these methods is presented to the public for use.

var addMyEvent = function( el,ev,fn ){

   if( el.addEventListener ){
            el.addEventListener( ev,fn, false );
      }else if(el.attachEvent){
            el.attachEvent( "on" + ev, fn );
      } else{
           el["on" + ev] = fn;
    }

};

The Observer
------------

The Observer is a design pattern where an object (known as a subject) maintains a list of objects depending on it (observers), automatically notifying them of any changes to state.

"One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. When something changes in our subject that the observer may be interested in, a notify message is sent which calls the update method in each observer. When the observer is no longer interested in the subject's state, they can simply detach themselves."

Subject: maintains a list of observers, facilitates adding or removing observers
Observer: provides an update interface for objects that need to be notified of a Subject's changes of state
ConcreteSubject: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
ConcreteObserver: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's

function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
};

ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }

  return -1;
};

ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};

MVC
---

MVC is an architectural design pattern that encourages improved application organization through a separation of concerns. It enforces the isolation of business data (Models) from user interfaces (Views), with a third component (Controllers) traditionally managing logic and user-input.

MVP
---
Model, View, Presenter

The P in MVP stands for presenter. It's a component which contains the user-interface business logic for the view. Unlike MVC, invocations from the view are delegated to the presenter, which are decoupled from the view and instead talk to it through an interface. This allows for all kinds of useful things such as being able to mock views in unit tests.


MVVM (Model View View Model)
----------------------------
is an architectural pattern based on MVC and MVP, which attempts to more clearly separate the development of user-interfaces (UI) from that of the business logic and behavior in an application. To this end, many implementations of this pattern make use of declarative data bindings to allow a separation of work on Views from other layers.

This facilitates UI and development work occurring almost simultaneously within the same codebase. UI developers write bindings to the ViewModel within their document markup (HTML), where the Model and ViewModel are maintained by developers working on the logic for the application.

DATA STRUCTURES
===============

Hash Table / Hash Map - O(1) constant time always 15 sec or 1min to find answer no matter how large the data set
----------------------------------------------------------------------------------------------------------------
Hash tables implement associative array abstract data types — which basically means it maps keys to values. O(1) constant lookup time

Hash tables use a hashing function in order to figure out where to store data. The hashing function will take in a key from the data we intend on storing, and return an index. Sounds simple, but hashing functions can be extremely complex!

Ideally, our hashing algorithm is designed so that each key returns a unique index and distributes our data evenly across our array of buckets, but most hashing algorithms are designed with imperfections. What happens if two different keys return the same index? In this case, we would have something called a hash collision.

JavaScript is a high-level language. Its basic primitive (Object) includes a hash table to keep properties. This hash table is usually written in a low-level language for efficiency. Using a simple object with string keys we use an efficiently implemented hash table with no efforts on our part.

If you want to hash an object, find what makes it unique and use it as a key. Do not try to calculate real hash or emulate hash tables — it is already efficiently handled by the underlying JavaScript object.

Use this key with JavaScript Object to leverage its built-in hash table while steering clear of possible clashes with default properties.

- If your objects include a unique user name
- If it includes a unique customer number

var key = function(obj){
  // some unique object-dependent key
  return obj.totallyUniqueEmployeeIdKey; // just an example
};

var dict = {};

dict[key(obj1)] = obj1;
dict[key(obj2)] = obj2;

export const algorithmLabels = {
    LEAST_CONNECTIONS: 'Least Connections',
    LEAST_TIME: 'Least Time',
    HASH: 'Hash',
    IP_HASH: 'IP Hash',
    ROUND_ROBIN: 'Round Robin',
};

algorithmLabels['HASH']



Stack
-----
In computer science, a stack is a linear data structure. If this statement holds marginal value to you, as it originally did with me, consider this alternative: A stack organizes data into sequential order.

This sequential order is commonly described as a stack of dishes at a cafeteria. When a plate is added to a stack of dishes, the plate retains the order of when it was added; moreover, when a plate is added, it is pushed towards the bottom of a stack. Every time we add a new plate, the plate is pushed towards the bottom of the stack, but it also represents the top of the stack of plates. Remove from the top.

.push() - adds data on top
.pop() - remove most recently added or top item

A stack is useful when we want to add data in sequential order and remove data. Based on its definition, a stack can remove only the most recently added data. What happens if we want to remove the oldest data? We want to use a data structure named queue.

Queue
-----
Similar to a stack, a queue is a linear data structure. Unlike a stack, a queue deletes only the oldest added data.  

To help you conceptualize how this would work, let's take a moment to use an analogy. Imagine a queue being very similar to the ticketing system of a deli. Each customer takes a ticket and is served when their number is called. The customer who takes the first ticket should be served first.

A more practical example of a queue is the event-loop of a web browser. As different events are being triggered, such as the click of a button, they are added to an event-loop's queue and handled in the order they entered the queue.

enqueue(data) - adds data to a queue.
dequeue() - removes the oldest added data to a queue.

Tree
----
In mathematics and more specifically in graph theory, a tree is an undirected graph in which any two vertices are connected by exactly one path.
    o
    |
o---o---o
    |
    o

Heap
----
A heap is a tree-like data structure where each node must be ordered with respect to the value of its children. This ordering must persist throughout the entire heap. Put simply, a parent node’s value must always be greater (or less) than its children’s values. There are two types of heap: max heap and min heap. As you may have guessed, in a max heap, parent node values are greater than those of their children, whereas the opposite is true in a min heap.

Binary heaps are a specific implementation of a heap whereby each parent can have no more than two children. Additionally, a complete binary heap has every level filled, except for the bottom level. This level gets populated left to right.

*A heap is a useful and efficient way to store and look up data that must maintain order. The classic example is a priority queue abstract data type.

Depth-First Search
------------------
In depth-first search, you start at the root node and traverse a branch all the way down to the bottom most node or leaf node.

Breadth-First Search
--------------------
In breadth-first search, we traverse each level of the tree systematically before moving on to the next level of the tree. Here is an example of how that looks.

Run time performance
--------------------
O(1) - constant time
O(log n) - logrithmic
O(n) - linear
O(n^2) - quadratic

SORTING
=======
Binary search
Bubble sort
Insertion sort
Merge sort
Quick sort
Selection sort
