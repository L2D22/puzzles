class EventEmmitter {
    constructor() {
        this.events = {};
    }

    indexOfListener(listeners, listener) {
        var i = listeners.length;

        while(i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    on(evt,listener) {
        if(typeof this.events[evt] !== 'object'){
            this.events[evt] = [];
        }
        this.events[evt].push(listener);
    }

    removeListener(evt,listener) {
        var index;
        if(typeof this.events[evt] === 'object') {
            index = this.indexOfListener(this.events[evt], listener);

            if(index > -1) {
                this.events[evt].splice(index,1);
            }
        }
    }

    trigger(evt) {
        var listeners, args = [].slice.call(arguments,1);

        if(typeof this.events[evt] === 'object') {
            listeners = this.evenets[evt].slice();

            for(var i=0; i < listeners.length; i++) {
                listeners[i].apply(this,args);
            }
        }
    }

    once(evt, listener) {
        this.on(evt,function g() {
            this.removeListener(evt,g);
            listener.apply(this,arguments);
        });
    }
}

var test = new EventEmmitter();

test.on('hello', function(){
    console.log('hello world');
});

window.addEventListener('click', function() {
    console.log('window click',test);
    test.trigger('hello');
});
