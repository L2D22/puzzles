//The chosen one
function matrixDot (A, B) {
    var result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));

    return result.map((row, i) => {
        return row.map((val, j) => {
            return A[i].reduce((sum, elm, k) => sum + (elm*B[k][j]) ,0)
        })
    })
}

var print = m => m.forEach(r => console.log(`&nbsp;&nbsp;${r.join(' ')}<br/>`))

var a = [[8, 3], [2, 4], [3, 6]]
var b = [[1, 2, 3], [4, 6, 8]]

console.log('matrix a:<br />');
console.log(a);
console.log('matrix b:<br />');
console.log(b);
console.log('a * b =<br />');
console.log(matrixDot(a,b));
