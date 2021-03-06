// Q: unsorted array 1-25 how do you find if a number is missing?
function findMissingNums(unSortedNums) {
  console.log("unSortedNums", unSortedNums);
}
console.log("result", findMissingNums([5, 3, 1, 10])); // [2,4,6,7,8,9]

// Question: unsorted array 1-infinity how do you find if a number is missing?

function findMissingNums(unSortedNums, start, end) {
  console.log("unSortedNums", unSortedNums);
  var unSortedNumsObj = {};

  var missingSorted = [];
  for (var i = 0; i < unSortedNums.length; i++) {
    unSortedNumsObj[unSortedNums[i]] = true;
  }

  for (var j = start; j <= end; j++) {
    if (unSortedNumsObj[j] !== true) {
      missingSorted.push(j);
    }
  }

  return missingSorted;
}

// Answer: missing numbers [2,4,6,7,8,9]
console.log("result", findMissingNums([5, 3, 1, 10], 1, 10));

// A:
function findMissingNums(unSortedNums) {
  let base = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let result = [];
  for (let i = 0; i < base.length; i++) {
    if (unSortedNums.indexOf(base[i]) === -1) {
      result.push(base[i]);
    }
  }
  return result;

  console.log("unSortedNums", unSortedNums);
  let sortedNums = unSortedNums.sort(function(a, b) {
    return a - b;
  }); // [1, 3, 5, 18, 25]

  let result = [];
  for (let i = 0; i < sortedNums.length; i++) {
    let temp = sortedNums[i];
    console.log("temp is ", temp);
    if (i + 1 !== temp) {
      while (i + 1 <= temp) {
        temp--;
        if (result.indexOf(temp) === -1 && sortedNums.indexOf(temp) === -1) {
          result.push(temp);
        }
      }
    }
  }
  result.sort(function(a, b) {
    return a - b;
  });
  return result;
}

console.log("result", findMissingNums([5, 3, 1, 18, 25]));

function sortNumbers(a, b) {
  return a > b ? 1 : -1;
}

export function findMissingNums(unSortedNum) {
  const sortedNum = unSortedNum.sort(sortNumbers);
  let missingNum = [];

  // unique remove duplicates
  let uniqueNum = [...new Set(sortedNum)];

  // if unique numbers equal original it's all good
  if (uniqueNum !== unSortedNum.length) {
    // Find missing numbers
    // Filter works for this specific case where the items are not modified.
    // But in many cases when you use map you want to make some modification
    // to the items passed.
    missingNum = uniqueNum.reduce((missingNum, value, i, arr) => {
      if (arr.length - 1 !== i && arr[i + 1] - value !== 1) {
        // find how many numbers are missing
        const missingDiff = arr[i + 1] - value;
        for (var k = 1; k < missingDiff; k++) {
          missingNum.push(value + k);
        }
      }
      // reduce must return modified array only
      return missingNum;
    }, []);

    return missingNum;
  }

  return -1;
}

console.log("result", findMissingNums([5, 3, 1, 18, 25]));

// Question: unsorted array 1-10 how do you find if a number is missing?

function findMissingNums(unSortedNums) {
  const sorted = unSortedNums.sort((a, b) => a > b); //O(n log n)
  const last = sorted[sorted.length - 1];
  let result = [];

  for (let i = sorted[0]; i < last; i++) {
    // O(n ^ 2)
    if (!sorted.includes(i)) result.push(i);
  }

  return result;
}

function test(input, expected) {
  // stringify easily compares objects or arrays regardless of depth
  const result = JSON.stringify(findMissingNums(input));
  const exp = JSON.stringify(expected);
  console.assert(result === exp, `expected ${result} to be ${exp}`);
  console.log(exp);
}

// Answer: missing numbers [2,4,6,7,8,9]
console.log("result", findMissingNums([5, 3, 1, 10]));

assertMissingNums([1, 3], [2]);
assertMissingNums([3, 1], [2]);
assertMissingNums([5, 3, 1, 10], [2, 4, 6, 7, 8, 9]);
