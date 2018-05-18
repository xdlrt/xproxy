/* global chrome */
import defaultData from '../constants/defaultData';
import Toast from './toast';

export function getListData(listModel) {
  chrome.storage.sync.get('xproxyConfig', (res) => {
    if (!res.xproxyConfig) {
      defaultData.proxyList.forEach(item => listModel.addItem(item));
      chrome.storage.sync.set(
        { xproxyConfig: defaultData },
        () => { console.log('保存默认数据成功'); }
      );
    }
    res.xproxyConfig.proxyList.forEach(item => listModel.addItem(item));
  });
}

export function saveListData(items = []) {
  const proxyList = items.map(item => {
    const { title, url, redirectUrl } = item;
    return { title, url, redirectUrl };
  });
  chrome.storage.sync.set({
    xproxyConfig: { proxyList }
  }, () => {
    Toast.success('保存数据成功');
  });
}

export function saveXproxyDisabled(bool) {
  chrome.storage.sync.set({
    xproxyDisabled: bool ? '' : 'disabled'
  }, () => {
    Toast.success('插件状态切换成功');
  });
}