// https://gist.github.com/chrisco/ae1ba58b9df4f92e1db6c3adf39b71b0
// Algorithm for searching graph-like data structures... aggresively.
// Check current node - if found, return node
// For that node find the length of children
// For that length, recursively repeat search

function dfs(value, node) {
    if (node.value === value) {
        return node;
    }

    var len = node.children.length;

    for (var i = 0; i < len; i++) {
        var foundNode = dfs(value, node.children[i]);
        if (foundNode) {
            return foundNode;
        }
    }
    return null;
}

const nodes = [
    {
        links: [ 1 ], // node 0 is linked to node 1
        visited: false
    }, {
        links: [ 0, 2 ], // node 1 is linked to node 0 and 2
        visited: false
    },
    {
        links: [ 0 ], // node 2 is linked to node 0 and 2
        visited: false
    }
];


const dfs = start => {
    const listToExplore = [ start ];

    nodes[ start ].visited = true;

    console.log('listToExplore.length', listToExplore.length);
    while ( listToExplore.length > 0 ) {
        const nodeIndex = listToExplore.pop();

        nodes[ nodeIndex ].links.forEach( childIndex => {
            if ( !nodes[ childIndex ].visited ) {
                nodes[ childIndex ].visited = true;
                listToExplore.unshift( childIndex );
            }
        } );
    }
};

dfs( 0 );
