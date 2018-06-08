function changeCase(identifier, targetCase){
    if ((/[A-Z]/.test(identifier) + /[_]/.test(identifier) + /[-]/.test(identifier)) > 1)
    return undefined;

    var splitzy = identifier.split(/-|_|(?=[A-Z])/);

    switch(targetCase) {
        case 'snake':
            return splitzy.join('_').toLowerCase();
            break;
        case 'kebab':
            return splitzy.join('-').toLowerCase();
            break;
        case 'camel':
            splitzy.forEach( (el, i) => { return i > 0 ? splitzy[i] = el.charAt(0).toUpperCase() + el.slice(1) : splitzy[i]; });
            return splitzy.join('');
        default:
            return undefined;
    }

}

var stuff = changeCase('littleShopOfHorrors', 'snake');
console.log('stuff', stuff);

// Test Cases
// changeCase("snakeCase", "snake")
// "snake_case"
// changeCase("some-lisp-name", "camel")
// "someLispName"
// changeCase("map_to_all", "kebab")
// "map-to-all"
// changeCase("doHTMLRequest", "kebab")
// "do-h-t-m-l-request"
// changeCase("invalid-inPut_bad", "kebab")
// undefined
// changeCase("valid-input", "huh???")
// undefined
// changeCase("", "camel")
