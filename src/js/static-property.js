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
  // Whenever you have a method that is specific to a class itself,
  // but doesn’t need to be shared across instances of that class,
  // you can add it as a static property of the class.
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a,b) => {
      return a.energy - b.energy
    })

    return sortedByLeastEnergy[0].name
  }
}

// Now, because we added nextToEat as a static property on the class,
// it lives on the Animal class itself (not its prototype)
// and can be accessed using Animal.nextToEat.
const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo

// ES5
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

Animal.nextToEat = function (nextToEat) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo

// You may have seen __proto__ used before to get an instances’ prototype.
// That’s a relic of the past. Instead, use Object.getPrototypeOf(instance) as we saw above.
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

const leo = new Animal('Leo', 7)
const prototype = Object.getPrototypeOf(leo)

console.log(prototype)
// {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}

prototype === Animal.prototype // true

// Well a for in loop is going to loop over all of the enumerable properties
// on both the object itself as well as the prototype it delegates to.
// shows class methods too
for(let key in leo) {
  console.log(`Key: ${key}. Value: ${leo[key]}`)
}

// just props no methods
for(let key in leo) {
  if (leo.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${leo[key]}`)
  }
}

// check if an object is an instance of a class
object instanceof Class
leo instanceof Animal // true

// The way that instanceof works is it checks for the presence of constructor.prototype
// in the object’s prototype chain.
// In the example above, leo instanceof Animal is true because Object.getPrototypeOf(leo) === Animal.prototype.

// Creating new agnostic constructor functions
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return animal
}
// As a refresher, the commented out lines are what happens
// behind the scenes when you use the new keyword on a function.
const leo = Animal('Leo', 7) ==> const leo = new Animal('Leo', 7)

// checks for new
function Animal (name, energy) {
  if (this instanceof Animal === false) {
    console.warn('Forgot to call Animal with the new keyword')
    return new Animal(name, energy)
  }

  this.name = name
  this.energy = energy
}

// What is Object.create
// When we create a new function, Fn in the code above, it comes with a prototype property.
// When we invoke it with the new keyword, we know what we’ll get back is an object
// that will delegate to the function’s prototype on failed lookups.
// If we override the function’s prototype, then we can decide which object to delegate to on failed lookups.
// So in our example above, we override Fn's prototype with the object
// that was passed in when Object.create was invoked which we call objToDelegateTo.
Object.create = function (objToDelegateTo) {
  function Fn(){}
  Fn.prototype = objToDelegateTo
  return new Fn()
}

// * Note that we’re only supporting a single argument to Object.create.
// The official implementation also supports a second,
// optional argument which allow you to add more properties to the created object.

// Public and Private Class Fields
// So now instead of just defining static methods in the class body,
// you can also define static values.
// What that means for our code is we can move
// propTypes and defaultProps up into the class definition.
class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username'
  }
  state = {
    username: ''
  }
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}

// Get to drop this!! woot
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}

// If you’ve used arrow functions before, you know that they the this keyword is bound lexically.
// That’s a fancy way of saying when you use the this keyword inside of an arrow function,
// things behave how you’d expect them to.
class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username'
  }
  state = {
    username: ''
  }
  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}

// Private Fields
class Car {
  _milesDriven = 0
  drive(distance) {
    this._milesDriven += distance
  }
  getMilesDriven() {
    return this._milesDriven
  }
}

class Car {
  #milesDriven = 0
  drive(distance) {
    this.#milesDriven += distance
  }
  getMilesDriven() {
    return this.#milesDriven
  }
}
