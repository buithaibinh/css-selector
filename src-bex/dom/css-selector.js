import { finder } from '@medv/finder';

let currentElement = null;
let timmer = null;

const notify = (message, autoHide = false) => {
  let oMessage = document.getElementById('cssViewerInsertMessage');
  if (oMessage) {
    oMessage.innerText = message;
  } else {
    oMessage = document.createElement('p');
    oMessage.innerText = `${message}`;
    oMessage.id = 'cssViewerInsertMessage';
    oMessage.style.backgroundColor = 'green';
    oMessage.style.color = '#ffffff';
    oMessage.style.position = 'fixed';
    oMessage.style.top = '10px';
    oMessage.style.left = '10px';
    oMessage.style.zIndex = '9999';
    oMessage.style.padding = '10px';
    oMessage.style.borderRadius = '5px';
    oMessage.style.fontSize = '14px';
    oMessage.style.fontWeight = 'bold';

    document.body.appendChild(oMessage);
  }

  // clear the timeout if it exists
  if (timmer) {
    clearTimeout(timmer);
  }

  if (autoHide) {
    timmer = setTimeout(() => {
      // animate the notification out to the left
      if (oMessage) {
        oMessage.animate([{ transform: 'translateX(-200%)', opacity: 0 }], {
          duration: 300,
          easing: 'ease-out'
        }).onfinish = () => oMessage.remove();
      }
    }, 500);
  }
};

const copyToClipboard = (str) => {
  navigator.clipboard.writeText(str);
};

/*
 ** Event Handlers
 */

const mouseOver = (e) => {
  const { target } = e;

  if (target === currentElement) {
    return;
  }

  // outline the element
  target.style.outline = 'rgb(255, 0,0 ) 1px solid';
  currentElement = target;
};

const mouseOut = (e) => {
  const { target } = e;

  // remove outline
  target.style.outline = '';
  currentElement = null;
};

const mouseClick = (e) => {
  // prevent the click from bubbling up to the document
  e.preventDefault();

  // prevent the click from triggering the default action
  e.stopPropagation();

  // if curentElement is null, return
  if (!currentElement) {
    return;
  }

  // get the css selector for the element
  const cssSelector = finder(currentElement);
  // copy the css selector to clipboard
  copyToClipboard(cssSelector);

  notify(`CSS Selector copied to clipboard: ${cssSelector}`);
};

export default class CssSelector {
  constructor(bridge) {
    this.haveEventListeners = false;
    this.bridge = bridge;

    this.isEnabled = false;
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  disable() {
    // remove outline
    if (currentElement) {
      currentElement.style.outline = '';
      currentElement = null;
    }
    this.removeEventListeners();
    notify('CSS Selector is disabled', true);

    this.isEnabled = false;
  }

  enable() {
    this.addEventListeners();
    notify('CSS Selector is enabled');
    this.isEnabled = true;
  }

  addEventListeners() {
    const { document } = window;
    const elements = this.getAllElements(document.body);

    for (let i = 0; i < elements.length; i += 1) {
      elements[i].addEventListener('mouseover', mouseOver, false);
      elements[i].addEventListener('mouseout', mouseOut, false);
    }
    this.haveEventListeners = true;

    // handle mouse click
    document.addEventListener('click', mouseClick, false);
  }

  getAllElements(element) {
    let elements = [];

    if (element && element.hasChildNodes()) {
      elements.push(element);

      const childs = element.childNodes;

      for (let i = 0; i < childs.length; i += 1) {
        if (childs[i].hasChildNodes()) {
          elements = elements.concat(this.getAllElements(childs[i]));
        } else if (childs[i].nodeType === 1) {
          elements.push(childs[i]);
        }
      }
    }

    return elements;
  }

  removeEventListeners() {
    const { document } = window;
    const elements = this.getAllElements(document.body);

    // remove click event
    document.removeEventListener('click', mouseClick, false);

    for (let i = 0; i < elements.length; i += 1) {
      elements[i].removeEventListener('mouseover', mouseOver, false);
      elements[i].removeEventListener('mouseout', mouseOut, false);
    }
    this.haveEventListeners = false;
  }
}
