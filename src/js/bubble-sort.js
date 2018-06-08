// O(n^2)
function bubbleSort(arr) {
   var len = arr.length;
   for (var i = 0; i <= arr.length; i++) {
     for(var j = 1; j <= i ;j++) {
       if(arr[j-1]>arr[j]){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}
console.log('bubble sort', bubbleSort([7,5,2,4,3,9])); //[2, 3, 4, 5, 7, 9]
