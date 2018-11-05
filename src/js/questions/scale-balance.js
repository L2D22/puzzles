
// Q: Take an array of numbers and find if any or any combination of numbers
// can equal the initial weight and balance the scale
const weight = 5;
const arr = [4,2,6,7];

function scaleBalance(weight, arr) {

}



// A:
const weight = 5;
//const arr = [4,2,6,7];
//const arr = [1,1,1,2,4];
//const arr = [4,2,1,4];
const arr = [4,2,6,3,7,2,3];

export function scaleBalance(weight, arr) {
    let sum = 0;
    for (var i = 0; i < arr.length - 1; i++) {
        if(weight === arr[i]) {
            return true;
        }
        // Add up weights
        sum += arr[i];
        if (sum === weight) {
            return true;
        }
        else if (sum > weight) {
            sum -= arr[i];
        }
    }
    // check all possible combinations of weights
    if (arr.slice(1).length > 1) {
        // return recursive functions otherwise results are undefined
        return scaleBalance(weight, arr.slice(1));
    }
    else {
        return false;
    }
}

console.log('scaleBalance(weight,arr)', scaleBalance(weight,arr));
