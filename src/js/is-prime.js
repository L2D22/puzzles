// check if a number is prime with memoization
var isPrime = (function () {
    var mem = [];
    var check = function (num) {
        if (num <= 1) {
            return false;
        }
        else if (num === 2) {
            return true;
        }
        if (num % 2 === 0) {
            return false;
        }
        var i = num - 2;
        while (i > 1) {
            if (num % i === 0) {
                return false;
            }
            i -= 2;
        }
        return true;
    };
    return function (num) {
        if (mem[num] === undefined) {
            mem[num] = check(num);
        }
        return mem[num];
    };
})();

var answer = isPrime(7);
console.log('answer ', answer);
