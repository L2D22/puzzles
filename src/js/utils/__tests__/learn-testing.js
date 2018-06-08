import { orderTotal } from '../learn-testing.js'
const emptyFunction = () => {};

// Mocking
// it('Calls vatapi.com', () => {
//     let isFakeFetchCalled = false;
//     const fakeFetch = (url) => {
//         expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE');
//         isFakeFetchCalled = true;
//
//         return Promise.resolve({
//             json: () => Promise.resolve({
//                 rates: {
//                     standard: {
//                         value: 19
//                     }
//                 }
//             })
//         });
//     };
//     orderTotal(fakeFetch, {
//         country: 'DE',
//         items: [
//             {'name': 'Dragon waffles', price: 20, quantity: 3}
//         ]
//     }).then(result => {
//         expect(result).toBe(60);
//         expect(isFakeFetchCalled).toBe(true);
//     })
// });
//
// // Pending testing
// it('if country code specified');
//
// it('Quantity', () => {
//     orderTotal(emptyFunction, {
//         items: [
//             {'name': 'Dragon candy', price: 2, quantity: 3}
//         ]
//     }).then(result => expect(result).toBe(6));
// });
//
// it('No quantity specified', () => {
//     orderTotal(emptyFunction, {
//         items: [
//             {'name': 'Dragon candy', price: 3}
//         ]
//     }).then(result => expect(result).toBe(3));
// });
//
it('Happy path example 1', () => {
    orderTotal(emptyFunction, {
        items: [
            {'name': 'Dragon food', price: 8, quantity: 1},
            {'name': 'Dragon cage', price: 800, quantity: 1}
        ]
    }).then(result => expect(result).toBe(808));
});
