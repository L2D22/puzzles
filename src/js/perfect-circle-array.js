// Q: Given an array of integers where each element points to the  index of the next element how would you detect if there is a cycle in this array?
// Every array element must be visited & it must loop back to the beginning.


//every element visited exactly once, cycle ends on the first index
//assumption: return type bool, input not empty/size of 1, input fits in memory, if input doesn’t fit then it can be broken up as long as hash set does
//walk through array storing each visited index in hash set, if it already exists exit loop
//at end double check size of hash set if size of the array and size of hash set matches return true
//the size check contains an assumption that it can only be equal to input if the final visited element was 0

function isPerfectCircle(arr){
    if(arr == null || arr.length == 0) {
        return false;
    }
    const n = arr.length;
    let set = new Set([]);
    let position = 0;
    while (set.size < n) {
        // a cycle appear earlier
        if (set.has(position)) {
            break;
        }
        set.add(position);
        position = (position + arr[position]) % n;
    }

    // check the last one whether it points to 0
    if (set.size != arr.length) {
        return false;
    }

    return true;
}

console.log(isPerfectCircle([1,1]));
console.log(isPerfectCircle([2,2,-1]));

function isCompleteCycle(circularArray) {
    let length = circularArray.length;
    let currentIndex = 0;
    for (let i = 0; i < length; i++) {
        currentIndex = circularArray[currentIndex] + currentIndex;
        if (currentIndex < 0 || currentIndex >= length) {
            currentIndex %= length;
        }
        if (currentIndex == 0 && i != length - 1) {
            return false;
        } else if (currentIndex == 0) {
            return true;
        }
    }
    return false;
}

console.log(isCompleteCycle([1,1]));
console.log(isCompleteCycle([2,2,-1]));
//
// function is_complete_cycle(arr) {
//
//     if(arr == null || arr.length == 0) {
//       return false;
//     }
//
//    let visited = new Set([]);
//    let index = 0;
//    while (visited.length <= arr.length) {
//      visited.add(index);
//
//      if (visited.length == arr.length) {
//          break;
//      }
//      index = arr.length % (index + arr[index])
//     }
//
//    if (visited.length != arr.length) {
//        return false;
//    }
//    return true;
// }
// console.log(is_complete_cycle([1,1]));
// console.log(is_complete_cycle([1,2,-1]));
