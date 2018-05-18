import { CHECK_IS_LEGAL } from './scripts/constants/regExp';

let lastRequestId = null;
const urls = new Array(200); // for cache

const redirectToMatchingRule = (details) => {
  const rules = window.xproxyConfig.proxyList;
  const originUrl = details.url;
  let redirectUrl;

  // exclude chrome extension
  if (!rules || !rules.length || /^chrome-extension:\/\//i.test(originUrl)) {
    return {};
  }

  // check if url is legal
  if (CHECK_IS_LEGAL.test(originUrl) && urls.indexOf(originUrl) < 0) {
    urls.shift();
    urls.push(originUrl);
  }

  try {
    rules.forEach(rule => {

      let isMatched = false;

      // support [ ] ( ) \ * ^ $
      if (/\\|\[|]|\(|\)|\*|\$|\^/i.test(rule.url)) {
        // support ??
        const reg = new RegExp(originUrl.replace('??', '\\?\\?'), 'i');
        isMatched = reg.test(originUrl);
      } else {
        isMatched = originUrl.indexOf(rule.url) > -1;
      }

      if (isMatched && details.requestId !== lastRequestId) {
        redirectUrl = originUrl.replace(rule.url, rule.redirectUrl);
      }

      if (!redirectUrl) {
        redirectUrl = originUrl;
      }

    });
  } catch (e) {
    console.error('rule match error', e);
  }

  lastRequestId = details.requestId;

  return redirectUrl === details.url ? {} : { redirectUrl };
};

window.onBeforeRequestCallback = (details) => redirectToMatchingRule(details);