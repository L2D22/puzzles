import LightBox from './light-box.js';
import { imageTest } from '../utils/image-test.js';
import { lazyLoad } from './lazy-load-images.js';

import '../../styles/app.scss';

// TODO:
// Testing

let imgurParams = {
  method: 'GET',
  headers: {
    'Authorization': 'Client-ID 68dcfe957bf6ca1',
  }
}

/**
 * Get Data
 */
fetch('imgur/3/gallery/r/cats/', imgurParams)
.then(response => response.json())
.then(data => render(data)).catch(function(err) {
    console.log('Fetch Error :-S', err);
});

/**
 * Render Images
 */
function render(data) {
  console.log('data', data);
    let { data: images } = data;
    const gallery = document.querySelector('.gallery');
    let htmlContent = '';
    // only load 50 images
    images = images.slice(50);
    // keep track of all promises fulfilled
    let countFulfilled = 0;

    let promises = images.map((el) => {
        return new Promise((resolve, reject) => {
            imageTest(el.link).then(
                function fulfilled(img) {
                    countFulfilled++;
                    gallery.innerHTML += `<div><img class="lazy" data-src="${el.link}" data-srcset="${el.link}" title="${el.title}" alt="${el.title}" data-light-box='{"number": ${countFulfilled}}'/></div>`;
                    resolve();
                },
                function rejected() {
                    reject();
                },
            );
        });
    });

    // if one promise is rejected the whole thing is rejected
    // it doesn't matter though because we put everything in gallery variable
    Promise.all(promises)
    .then((results) => {
        // initialize lightbox library
        const lightBoxLib = new LightBox();
        // lazy load images
        lazyLoad();
    });
}
