/* global chrome */
window.xproxyDisabled = 'disabled'; // 是否启用插件
window.isCacheCleaning = false; // 是否正在清理缓存

chrome.storage.onChanged.addListener(changes => {
  if (changes.xproxyConfig) {
    window.xproxyConfig = changes.xproxyConfig.newValue;
  }
  if (changes.xproxyDisabled) {
    window.xproxyDisabled = changes.xproxyDisabled.newValue;
  }
});

chrome.storage.sync.get('xproxyDisabled', result => {
  window.xproxyDisabled = result.xproxyDisabled;
});

// 清除浏览器缓存
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
