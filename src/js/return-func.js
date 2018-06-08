// return function black
// HOC
// Decorator
// return a func
// modify their library or api func must return a func
// expects 1 arg but need to pass two

var a = [1,2,3,4,5]
function mapFunc(num) {
    let evenOdd = (num % 2 == 0) ? 'even' : 'odd'
    console.log(evenOdd)
    return evenOdd
}
console.log(a.map(mapFunc))

function multiLingualMap(num, language) {
    let evenOdd = (num % 2 == 0) ? 'even' : 'odd'
    if ( language == 'spanish') {
        evenOdd = (num % 2 == 0) ? 'par' : 'impar'
    }
    return evenOdd
}
spanishMap = function(num) {
    return multiLingualMap(num, 'spanish')
}


console.log(a.map(spanishMap))

function bunchOfComplexLogic(inputs) {
    //...a bunch of complex i dont understand
}

deboucnedComplexLogic(input)
