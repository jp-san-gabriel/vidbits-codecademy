const {jsdom} = require('jsdom');

function getElementFromHtml(html, selector) {
  const selectedElement= jsdom(html).querySelector(selector);
  if(selectedElement !== null) {
    return selectedElement;
  } else {
    throw new Error(`No element with selector "${selector}" found in HTML string`);
  }
};

module.exports = {
  getElementFromHtml
};
