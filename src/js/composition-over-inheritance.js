// Composition vs Inhertiance
// Composition design around what things do

// Inhertiance design around what things are, no point is using this
// Trying to predicte the future and breaks down
// “…the problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.” ~ Joe Armstrong — “Coders at Work”

// Composition
const barker = (state) => ({
    bark: () => console.log('Woof')
});

const driver = (state) => ({
    drive: () => state.position = state.position + state.speed
});

barker({name: 'karo'}).bark();

const murderRobotDog = (name) => {
    let state = {
        name: 'steve',
        speed: 100,
        position: 0
    }

    // Object.assign
    // only takes objects and assigns them to a new empty obj
    return Object.assign(
        {},
        barker(state),
        driver(state),
    )
}

console.log('murderRobotDog', murderRobotDog);
murderRobotDog().bark();
