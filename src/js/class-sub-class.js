export class Polygon {
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.widthg = width;
    }

    sayName() {
        console.log(`Hi, I am a ${this.name}.`);
    }

    sayHistory() {
        console.log('"Polygon" is derived from the Greek polus (many) ' + 'and gonia (angle).');
    }
}

let p = new Polygon(300,400);
p.sayName();

class Square extends Polygon {
    // The reserved 'super' keyword is for making super-constructor
    // calls and allows access to parent methods.
    // Here, it will call the parent class' constructor with lengths
    // provided for the Polygon's width and height
    constructor(length, width) {
        super(length,width);
        this.name = 'Square';
    }

    get area() {
        return this.height * this.width;
    }

    set area(value) {
        this.area = value;
    }
}

let s = new Square(5);
s.sayName();
console.log('s.area', s.area);

// Subclassing methods of a parent class
class Rectangle extends Polygon {
  constructor(height, width) {
    super(height, width);
    this.name = 'Rectangle';
  }
  // Here, sayName() is a subclassed method which
  // overrides their superclass method of the same name.
  sayName() {
    ChromeSamples.log('Sup! My name is ', this.name + '.');
    super.sayHistory();
  }
}

let r = new Rectangle(50, 60);
r.sayName();

// Defining static methods
// Classes support static members which can be accessed without an
// instance being present.
class Triple {
  // Using the 'static' keyword creates a method which is associated
  // with a class, but not with an instance of the class.
  static triple(n) {
    n = n || 1;
    return n * 3;
  }
}

// Subclassing built-in classes and DOM
// Extend Date built-in
class MyDate extends Date {
  constructor() {
    super();
  }

  getFormattedDate() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    return this.getDate() + '-' + months[this.getMonth()] + '-' +
      this.getFullYear();
  }
}

var aDate = new MyDate();
console.log(aDate.getTime());
console.log(aDate.getFormattedDate());
