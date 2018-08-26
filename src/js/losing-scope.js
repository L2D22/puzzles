const arr = [1, 2, 3, 4];
for (var i = 0; i < arr.length; i++) {
  var newFunc = () => {
    return console.log(arr[i]);
  };
  newFunc.bind(this);

  setTimeout(newFunc(), 100);
}

// Block scope
for (let k = 0; k < arr.length; k++) {
  setTimeout(() => {
    console.log("arr[k]", arr[k]);
  }, 100);
}
