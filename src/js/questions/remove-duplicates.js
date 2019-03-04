// Q: Remove duplicate elements from an array
const array = [1, 1, 1, 2, 3, 3, 3, 4, 5, 6, 6, 6];
// A: [1,2,3,4,5,6]

[...new Set(array)];

array.filter((item, index) => array.indexOf(item) === index);

array.reduce((unique,item) => ) unique.includes(item) ? unique : [...unique, item], []);
