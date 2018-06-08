//DFS
// function dfs(callback) {
//  var stack=[this];
//  var n;
//
//  while(stack.length>0) {
//
//    n = stack.pop();
//    callback(n.value);
//
//    if (!n.children) {
//      continue;
//    }
//
//    for (var i = n.children.length-1; i>=0; i--) {
//       stack.push(n.children[i]);
//    }
//  }
// };
//
// //BFS
// function BFS(callback) {
//   var queue=[this];
//   var n;
//
//   while(queue.length>0) {
//
//     n = queue.shift();
//     callback(n.value);
//
//     if (!n.children) {
//       continue;
//     }
//
//     for (var i = 0; i< n.children.length; i++) {
//        queue.push(n.children[i]);
//     }
//   }
// };

//BFS
var nodes = [
    {
        links: [ 1 ], // node 0 is linked to node 1
        visited: false
    }, {
        links: [ 0, 2 ], // node 1 is linked to node 0 and 2
        path: [],
        visited: false
    },
    {
        links: [ 0, 1 ], // node 2 is linked to node 0 and 2
        path: [],
        visited: false
    },
];


function bfs( start ) {
    var listToExplore = [ start ];
    console.log('listToExplore', listToExplore);

    nodes[ start ].visited = true;
    const searchTerm = 3;
    console.log('nodes[start]', nodes[start]);
    console.log('nodes[start].visited', nodes[start].visited);

    while ( listToExplore.length > 0 ) {
        var nodeIndex = listToExplore.shift();
        if(nodeIndex === searchTerm) {
            console.log('found', searchTerm);
            break;
        }
        console.log('nodeIndex', nodeIndex);
        console.log('nodes[ nodeIndex ].links', nodes[ nodeIndex ].links);
        nodes[ nodeIndex ].links.forEach( function( childIndex ) {
            console.log('childIndex', childIndex);
            console.log('nodes[ childIndex ]', nodes[ childIndex ]);
            console.log('nodes[ childIndex ].visited ', nodes[ childIndex ].visited );
            if ( !nodes[ childIndex ].visited ) {
                nodes[ childIndex ].visited = true;
                listToExplore.push( childIndex );
            }
        } );
        console.log('end while');
    }

};

bfs( 0 );
