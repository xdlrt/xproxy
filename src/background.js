/* global chrome */
window.xproxyDisabled = 'disabled'; // if 'disabled',this extension will be disabled
window.isCacheCleaning = false; // check if cleaning cache
window.xproxyConfig = {}; // config

chrome.storage.onChanged.addListener(changes => {
  if (changes.xproxyConfig) {
    window.xproxyConfig = changes.xproxyConfig.newValue;
  }
  if (changes.xproxyDisabled) {
    window.xproxyDisabled = changes.xproxyDisabled.newValue;
  }
});

chrome.storage.sync.get('xproxyConfig', result => {
  window.xproxyConfig = result.xproxyConfig;
});

chrome.storage.sync.get('xproxyDisabled', result => {
  window.xproxyDisabled = result.xproxyDisabled;
});

// clear browser cache
function clearCache() {
  if (!window.isCacheCleaning) {
    window.isCacheCleaning = true;
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const oneWeekAgo = new Date().getTime() - millisecondsPerWeek;
    chrome.browsingData.removeCache({
      since: oneWeekAgo
    }, () => {
      window.isCacheCleaning = false;
    });
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (window.xproxyDisabled !== 'disabled') {
      clearCache();
      return window.onBeforeRequestCallback(details);
    }
    return {};
  },
  {
    urls: ['<all_urls>']
  },
  ['blocking']
);
