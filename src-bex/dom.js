/* eslint-disable class-methods-use-this */
// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks
import { bexDom } from 'quasar/wrappers';

import CssSelector from './dom/css-selector';

const tabs = {};

export default bexDom((bridge) => {
  console.log('bexDom', bridge);

  // listen for messages from the Web Page
  window.addEventListener(
    'message',
    (event) => {
      // We only accept messages from ourselves
      if (event.source !== window) {
        return;
      }

      if (event.data.type === 'toggle') {
        let cssSelector = tabs[event.data.tabId];
        if (!cssSelector) {
          console.log('creating new instance');
          cssSelector = new CssSelector(bridge);
          tabs[event.data.tabId] = cssSelector;
        }
        cssSelector.toggle();
      }
    },
    false
  );
});
