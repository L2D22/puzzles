function Tree() {
    this.root = null;
}

Tree.prototype.addNode = function(n) {
    if(this.root == null) {
        this.root = n;
    }
};

function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

let tree = new Tree();
let n = new Node(5);
tree.addNode(n);

console.log(tree);
