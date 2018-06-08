/**
 * Write asyncronous code that reads like
 * syncronous code
 */

async function fetchAvatarUrl(userId) {
    const response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`);
    const data = await response.json();

    return data.imageUrl;
}

const result = fetchAvatarUrl(123);
console.log('result', result);

/**
 * Promises cat avatar
 * parrallel / faster
 */
function fetchCatAvatars(userId) {
    return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
        .then(response => response.json());
        .then(user => {
            const promises = user.cats.map(catId =>
                fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
                    .then(response => response.json())
                    .then(catData => catData.imageUrl)
            )
        });
        return Promise.all(promises);
    });
}

const catPromise = fetchCatAvatars(123);
console.log('catPromise', catPromise);

/**
 * Async/await cat avatar
 * async func returns a promise
 */
async function fetchCatAvatarsAsync(userId) {
    const response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`);
    const user = await response.json();
    const catImgUrls = [];
    for(const catId of user.cats) {
        const response = await fetch(`https://catappapi.herokuapp.com/cats/${catId}`);
        const catData = await response.json();
        catImgUrls.push(catData.imageUrl);
    }

    return catImageUrls;
}
const catAsync = fetchCatAvatarsAsync(123);
console.log('catAsync', catAsync);

/**
 * Hybrid async/await + Promise
 */
async function fetchHybrid(userId) {
    const response = await fetch(`https://catappapi.herokuapp.com/users/${userId}`);
    const user = await response.json();

    return await Promise.all(user.cats.map(async function(catId) {
        const response = await fetch(`https://catappapi.herokuapp.com/cats/${catId}`);
        const catData = await response.json();
        return catData.imageUrl;
    }));
}
const catHybrid = fetchHybrid(123);
console.log('catHybrid', catHybrid);
