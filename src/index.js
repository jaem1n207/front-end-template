import './style.css';

import bold, { boldTagName } from './bold';
import italic, { italicTagName } from './italic';

let isBold = true;

function sayHello(name) {
  const formatter = isBold ? bold : italic;

  isBold = !isBold;

  return `Hello! ${formatter(name)}!`;
}

function component() {
  const element = document.createElement('div');

  element.innerHTML = `<div>${sayHello('jm')}</div>`;
  console.log(boldTagName);

  return element;
}

document.body.appendChild(component());
