// Recursive fibonacci
// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,
// Each value is the sum of the 2 previous values
// F(n) = F(n-1) + F(n-2)
export function fib(n) {
    if(n <= 1) return 1;
    return fib(n-1) + fib(n-2);
}
// numbers don't seem to add up to 8
console.log('fib(n)', fib(4));

// Start from the beginning and count up
function fibonacci(num){
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}


function fib(n) {

    if(n <= 1) return 1;
    //console.log('n: ', n-1)
    return fib(n-1) + fib(n-2);
}

fib(4) = fib(3)+fib(2);//5
fib(3) = fib(2) + fib(1);//3
fib(2) = fib(1) + fib(0); //2
fib(1) = 1
fib(0) = 1
console.log('fib(n)', fib(4));

console.log('fibonacci(n)', fibonacci(5));
