let p = document.createElement('p');
p.classList.add('p');
document.body.appendChild(p);

document.querySelector('.p').insertAdjacentHTML('beforebegin', '<div>beforebegin boom</div>');
document.querySelector('.p').insertAdjacentHTML('afterend', `<a href="https://egghead.io/browse/frameworks/react"> afterend yo!</a>`);

let a = document.createElement('a');
a.textContent = 'sup';
a.innerHTML += 'sup';
p.appendChild(a);

console.log('p.children', p.children);
console.log('p.childNodes', p.childNodes);
console.log('p !== child', p !== p.childNodes);
console.log('p.contains(child)', p.contains(p.childNodes[0]));
console.log('p.childNodes[0]', p.childNodes[0]);
