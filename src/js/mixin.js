var sayNameMixin = function(obj) {
    obj.sayName = function() {
        console.log(this.name);
    };
}

var me = {
    name: 'Liza',
    age: 31
};

// Decorate with new sayName functionality
sayNameMixin(me);

me.sayName();
