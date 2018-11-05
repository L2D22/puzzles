// OOO ES5
// Class
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

// subClass
function Dog (name, energy, breed) {
  // inherit animal props
  Animal.call(this, name, energy)

  this.breed = breed
}

// inherit animal methods
Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function () {
  console.log('Woof Woof!')
  this.energy -= .1
}

const charlie = new Dog('Charlie', 10, 'Goldendoodle')

charlie.name // Charlie
charlie.energy // 10
charlie.breed // Goldendoodle

// ES6
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep() {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play() {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

class Dog extends Animal {
  constructor(name, energy, breed) {
    super(name, energy) // calls Animal's constructor
    this.breed = breed
  }
  bark() {
    console.log('Woof Woof!')
    this.energy -= .1
  }
}

// JavaScript has two types - Primitive types and Reference types.
// Primitive types are boolean, number, string, null, and undefined and are immutable.
// Everything else is a reference type and they all extend Object.prototype

function speak(){}
speak.woahFunctionsAreLikeObjects = true
console.log(speak.woahFunctionsAreLikeObjects) // true

const friends = ['Mikenzi', 'Jake', 'Ean']
friends.woahArraysAreLikeObjectsToo = true
console.log(friends.woahArraysAreLikeObjectsToo) // true
