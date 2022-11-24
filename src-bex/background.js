/* eslint-disable camelcase */
import { bexBackground } from 'quasar/wrappers';

const state = {
  loaded: {},
  injected: {}
};

export default bexBackground(
  (bridge, allActiveConnections /* , allActiveConnections */) => {
    // chrome.action.onClicked.addListener(async (tab) => {
    //   console.log('action was clicked', tab);
    //   const { data } = await bridge.send('test', {
    //     tabId: tab.id
    //   });
    //   console.log('Some response from the other side', data);
    // });
    // eslint-disable-next-line no-unused-vars
    const toggleIn = ({ id: tabId }) => {
      if (state.loaded[tabId] && state.injected[tabId]) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['./assets/eject.js']
        });
        state.injected[tabId] = false;
      } else if (state.loaded[tabId] && !state.injected[tabId]) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['./assets/restore.js']
        });
        state.injected[tabId] = true;
      } else {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['./assets/inject.js']
        });
        state.loaded[tabId] = true;
        state.injected[tabId] = true;
      }
    };
    chrome.action.onClicked.addListener(async (tab) => {
      console.log('action was clicked', tab, allActiveConnections);
      // toggleIn(tab);
      // send message to content script
      console.log('action was clicked', tab);
      const { data } = await bridge.send('test', {
        tabId: tab.id
      });
      console.log('Some response from the other side', data);
    });
  }
);
