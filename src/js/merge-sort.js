// Merge Sort and Unique arrays
//  O(nlogn) the entire input must be iterated through, and this must occur O(log(n)) times
function mergeSort(arr) {
    if(arr.length === 1) {
        return arr;
    }

    const middle = Math.floor(arr.length/2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge (
        mergeSort(left),
        mergeSort(right)
    )
}

function merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
            result.push(left[indexLeft])
            indexLeft++
        } else {
            result.push(right[indexRight])
            indexRight++
        }
    }

    // remaining part needs to be addred to the result
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}
console.log('mergeSort()', mergeSort([3,5,2,1,8,23]));
// Sort and remove each element equal to preceding one
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

// get unique
function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
        return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}
