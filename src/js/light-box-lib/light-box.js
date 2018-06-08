/**
* Represents a light box
* @constructor
*/
export default class LightBox {

    constructor() {
        // light box properties
        this.els = Array.prototype.slice.call(document.querySelectorAll('[data-light-box]'));
        this.gallery = document.querySelector('.gallery');
        this.lightBox;
        this.lightBoxContent;
        this.lightBoxCurrent;
        this.lightBoxImg;
        this.closeBtn;

        // start the light box
        this.initialize();
    }

    /**
    * Initialize the light box creation and event listeners
    */
    initialize() {
        // add light box to dom
        this.createBox();
        // add click listener/keypress
        this.createClickTriggers();
    }

    /**
    * Create the light box html elements and listeners
    */
    createBox() {
        // Check if a light box has already been created
        if(!this.lightBox) {
            this.lightBox = document.createElement('div');
            this.lightBox.classList.add('light-box-container');
            document.body.appendChild(this.lightBox);

            var boxHTML  = '<a class="light-box-close-btn"></a>'+
            '<div class="light-box-content">'+
            '</div>'+
            '<a class="arrow left light-box-next"></a>'+
            '<a class="arrow right light-box-previous"></a>';

            this.lightBox.innerHTML = boxHTML;

            this.lightBoxContent = document.querySelector('.light-box-content');

            // add trigger on close
            this.closeClickTrigger();
            // add arrow triggers
            this.createArrowClickTriggers();
        }
    }

    /**
    * Add click listeners to image thumbnails
    */
    createClickTriggers() {
        for(var i = 0; i < this.els.length; i++) {
            this.els[i].addEventListener('click', this.displayBox.bind(this));
        }
    }

    /**
    * Add click/keyboard listeners to next/previous arrows
    */
    createArrowClickTriggers() {
        document.querySelector('.light-box-next').addEventListener('click', this.getNext.bind(this));
        document.querySelector('.light-box-previous').addEventListener('click', this.getPrevious.bind(this));
        this.createKeyboardTriggers();
    }

    /**
    * Add keyboard listeners for left and right arrow key
    */
    createKeyboardTriggers() {
        window.addEventListener('keydown', function(e) {
            switch(e.keyCode) {
                case 37:
                    this.getPrevious();
                    break;
                case 39:
                    this.getNext();
                    break;
                case 27:
                    this.hideBox();
                    break;
                default:
                break;
            }
        }.bind(this));
    }

    /**
    * Add click listener for close button
    */
    closeClickTrigger() {
        this.closeBtn = this.lightBox.querySelector('.light-box-close-btn');
        this.closeBtn.addEventListener('click', this.hideBox.bind(this));
    }

    /**
    * Show light box
    * @param {MouseEvent} e
    */
    displayBox(e) {
        this.lightBox.classList.add('open');
        this.gallery.classList.add('light-box-open');
        document.body.classList.add('light-box-open');
        this.displayBoxContent(e.target);
    }

    /**
    * Display full size image in light box
    * @param {HTMLElement} - The current element to display
    */
    displayBoxContent(currentEL) {
        this.lightBoxCurrent = currentEL;
        // remove previous img element
        if (this.lightBoxImg) {
            this.lightBoxContent.removeChild(this.lightBoxImg);
        }

        // normalize number count
        this.lightBoxCurrent.count = JSON.parse(this.lightBoxCurrent.getAttribute('data-light-box')).number;

        // create img element container and img
        this.lightBoxImg = document.createElement('div');
        this.lightBoxImg.classList.add('light-box-img');

        var img = '<img src="'+this.lightBoxCurrent.dataset.srcset+'"/>'+
        '<div class="light-box-info">'+
        '<p class="light-box-title">'+this.lightBoxCurrent.title+'</p>'+
        '<p class="light-box-pagination"><span class="light-box-selected">Image '+ this.lightBoxCurrent.count +' of </span>'+this.els.length+'</p>'+
        '</div>';

        // append element to dom
        this.lightBoxContent.append(this.lightBoxImg);
        // set the element html
        this.lightBoxImg.innerHTML = img;
    }

    /**
    * Hide light box
    */
    hideBox() {
        this.lightBox.classList.remove('open');
        this.gallery.classList.remove('light-box-open');
        document.body.classList.remove('light-box-open');
    }

    /**
    * Get previous light box image element
    */
    getPrevious() {
        var previousEl = null;
        // if we reach the first element reset to the end element
        if(this.lightBoxCurrent.count === 1) {
            previousEl = this.els[this.els.length-1];
        }
        // set element to previous element
        else {
            previousEl = this.els[this.lightBoxCurrent.count-2];
        }
        this.displayBoxContent(previousEl);
    }

    /**
    * Get next light box image element
    */
    getNext() {
        var nextEl = null;
        // if we reach the last element reset to the first element
        if(this.lightBoxCurrent.count >= this.els.length) {
            nextEl = this.els[0];
        }
        // set element to previous element
        else {
            nextEl = this.els[this.lightBoxCurrent.count];
        }
        this.displayBoxContent(nextEl);
    }
}
