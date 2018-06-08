// Take an array of arrays and flatten
// into one array of only numbers
function flatten(arr) {
    let flatten = [];

    reduceArrays(arr);
    // worst case O(n^2) aka n*n or more??? ASK PHD
    // it's funny they ask FE these questions
    // this type of data manipulation especially for large data sets
    // crashes the browser
    function reduceArrays(arr) {
        for(var i=0; i < arr.length; i++) {
            if(Array.isArray(arr[i])) {
                reduceArrays(arr[i]);
            }
            else {
                flatten.push(arr[i]);
            }
        }
    }

    return flatten;
}

const array = [[3], [1], 2, [3, [7, [6]]]];

flatten(array); // [3, 1, 2, 3, 7, 6];
console.log('flatten(array)', flatten(array));
