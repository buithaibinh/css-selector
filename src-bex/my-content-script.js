/* eslint-disable func-names */
/* eslint-disable wrap-iife */
import { bexContent } from 'quasar/wrappers';

export default bexContent((bridge) => {
  console.log('bexContent', bridge);

  bridge.on('test', ({ respond, data }) => {
    console.log('Event received from background script', data.tabId);

    // postMessage to the Web Page
    window.postMessage({ type: 'toggle', tabId: data.tabId }, '*');

    // must respond to the event. Otherwise the other side will wait forever
    respond('hey from content!');
  });
});
