let urls = [
    '/api/commits',
    '/api/issues/opened',
    '/api/issues/assigned',
    '/api/issues/completed',
    '/api/issues/comments',
    '/api/pullrequests'
];

let promises = urls.map((url) => {
    return new Promise((resolve, reject) => {
        $.ajax({ url: url })
        .done((data) => {
            resolve(data);
        });
    });
});

Promise.all(promises)
.then((results) => {
    // Do something with results of all our promises
});

// fetch('url',params)
// .then(response => response.json())
// .then( data => render(data))
// .catch(err => console.log('error', err);)
