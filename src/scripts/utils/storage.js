/* global chrome */
import defaultData from '../constants/defaultData';

export function getListData(listModel) {
  chrome.storage.sync.get('xproxyConfig', (res) => {
    if (!res.xproxyConfig) {
      defaultData.proxyList.forEach(item => listModel.addItem(item));
      chrome.storage.sync.set(
        { xproxyConfig: defaultData },
        () => { console.log('保存默认数据成功'); }
      );
    }
    else {
      res.xproxyConfig.proxyList.forEach(item => listModel.addItem(item));
    }
  });
}

export function saveListData(items = []) {
  const proxyList = items.map(item => {
    const { title, url, redirectUrl, checked } = item;
    return { title, url, redirectUrl, checked };
  });
  chrome.storage.sync.set({
    xproxyConfig: { proxyList }
  }, () => { console.log('设置 xproxyConfig 成功') });
}

export function saveXproxyDisabled(bool) {
  chrome.storage.sync.set({
    xproxyDisabled: bool ? '' : 'disabled'
  }, () => { console.log('设置 xproxyDisabled 成功') });
}