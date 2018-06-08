import { movieData } from './kevin-bacon-data.js';
// http://movie-database-server.appspot.com/
// Breadth-First Search - shortest distance between points
// Many graph theory problems are solved by finding the shortest path
// between two nodes in the graph.
console.log('movieData', movieData);
// Keep track of info as you search
function Node(name) {
    this.value = name; // is this KEVIN BACON?
    this.edges = []; // keep track of graph connections
    this.searched = false; // determine if you've been here before
    this.parent = null; // keep track of the path
}

Node.prototype.addEdge = function(neighbor) {
    this.edges.push(neighbor);
    // both directions
    neighbor.edges.push(this);
};

function Graph() {
    this.nodes = [];
    this.graph = {}; // Associative array or Hash table
    this.end = null;
    this.start = null;
}

Graph.prototype.addNode = function(n) {
    // Node into array
    this.nodes.push(n);
    // Node into 'hash' Look-up based on name n.value = title
    this.graph[n.value] = n;
};

Graph.prototype.getNode = function(actor) {
    return this.graph[actor];
};

Graph.prototype.setStart = function (actor) {
    this.start = this.graph[actor];
    return this.start;
};

Graph.prototype.setEnd = function (actor) {
    this.end = this.graph[actor];
    return this.end;
};

function setup() {
    let graph = new Graph();
    const movies = movieData.movies;
    const actors = movieData.actors;
    let movieNode = null;
    let actorNode = null;

    for (var variable in movies) {
        movieNode = new Node(movies[variable].title);
        graph.addNode(movieNode);
    }

    for (var variable in actors) {
        actorNode = graph.getNode(actors[variable]);
        if (actorNode == undefined) {
            actorNode = new Node(actors[variable])
            graph.addNode(actorNode);
            movieNode.addEdge(actorNode);
        }
    }

    console.log('graph', graph);
    //let start = graph.setStart('Robin Wright');
    let start = graph.setStart('Tom Hanks');
    // let start = graph.setStart('Kevin Bacon');
    let end = graph.setEnd('Kevin Bacon');

    var queue = [];

    start.searched = true;
    queue.push(start);

    while(queue.length > 0) {
        let current = queue.shift();
        if(current === end) {
            break;
        }
        let edges = current.edges;
        for (var i = 0; i < edges.length; i++) {
            let neighbor = edges[i];
            if(!neighbor.searched) {
                neighbor.searched = true;
                neighbor.parent = current;
                queue.push(neighbor);
            }
        }
    }

    var path = [];
    path.push(end);
    var next = end.parent;

    while(next != null) {
        path.push(next);
        next = next.parent;
    }

    var txt = '';

    for (var i = path.length - 1; i >= 0; i--) {
        txt += path[i].value;
        if(i != 0) { txt += ' ---> '};
    }

    console.log('path', txt);

}

setup();
