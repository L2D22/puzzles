var string1 = "";
var obj = {a: 1, b: 2, c: 3};

for (var prop in obj) {
    // value
    console.log('obj', obj[prop] );
    // key
    console.log('prop', prop);
    if (obj.hasOwnProperty(prop)) {
        string1 = string1 + obj[prop];
    }
}

console.log(string1);
