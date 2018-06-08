// Q: unsorted array 1-100 how do you find if a number is missing?
function sortNumbers(a, b) { return a > b ? 1 : -1}

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
            if((arr.length - 1) !== i && arr[i+1] - value !== 1) {
                // find how many numbers are missing
                const missingDiff = arr[i+1] - value;
                for (var k = 1; k < missingDiff; k++) {
                    missingNum.push(value + k);
                }
            }
            // reduce must return modified array only
            return missingNum;
        },[]);

        return missingNum;
    }

    return -1;
}

console.log('result', findMissingNums([5,3,1,25]));
