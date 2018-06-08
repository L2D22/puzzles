// document.body.innerText;
// OR

let p = document.createElement('p');
p.classList.add('p');
document.body.appendChild(p);

document.querySelector('.p').insertAdjacentHTML('beforebegin', '<div>beforebegin boom</div>');
document.querySelector('.p').insertAdjacentHTML('afterend', `<a href="https://egghead.io/browse/frameworks/react"> afterend yo!</a>`);

let a = document.createElement('a');
a.textContent = 'sup';
a.innerHTML += 'sup';
p.appendChild(a);

function getAllText(node){
  var allText = [];

  function getNodeText(node){
      if(node && node.childNodes && node.childNodes.length){
          for(var i = 0, len = node.childNodes.length; i<len; i++){
              console.log('node.childNodes[i]', node.childNodes[i]);
              getNodeText(node.childNodes[i]);
          }
      }
      else {
          allText.push(node.nodeValue);
     }
  }
  getNodeText(node);
  return allText.join('');
}

console.log('getAllText()', getAllText(document.body));
