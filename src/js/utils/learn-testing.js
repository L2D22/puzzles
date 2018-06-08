// Jest comes with assertions and mocking
export function orderTotal(fetch, order) {
    return Promise.resolve(order.items.reduce((prev, cur) =>
        cur.price * (cur.quantity || 1) + prev, 0));
}

// const vat = fetch('https://vatapi.com/v1/country-code-check?code=DE', {
//         hearders: {
//             'apikey': 'dfasdfasdfblergggg'
//         }
//     }).then(response => response.json());
