import { CHECK_IS_LEGAL, ORIGIN_URL_REG } from './scripts/constants/regExp';

window.lastRequestId = null;
window.urls = new Array(200); // for cache

const redirectToMatchingRule = (details) => {
  const rules = window.xproxyConfig.proxyList;
  const originUrl = details.url;
  let redirectUrl;

  // exclude chrome extension
  if (!rules || !rules.length || /^chrome-extension:\/\//i.test(originUrl)) {
    return {};
  }
  
  // check if url is legal
  if (CHECK_IS_LEGAL.test(originUrl) && window.urls.indexOf(originUrl) < 0) {
    window.urls.shift();
    window.urls.push(originUrl);
  }

  rules.forEach(rule => {
    
    if (!rule.url || !rule.redirectUrl || rule.checked === false) {
      return;
    }
    
    let reg = rule.url;
    let isMatched = false;

    // check if [ ] ( ) \ * ^ $ exist
    if (ORIGIN_URL_REG.test(rule.url)) {
      // transform originUrl into regExp
      // check if ?? exist, if true, transform ?? to regExp format
      reg = new RegExp(reg.replace('??', '\\?\\?'), 'i');
      isMatched = reg.test(originUrl);
    } else {
      // originUrl rules directly include rule.url
      isMatched = originUrl.indexOf(reg) > -1;
    }

    if (isMatched && details.requestId !== window.lastRequestId) {
      // console.log(redirectUrl, reg, rule.redirectUrl);
      redirectUrl = redirectUrl
        ? redirectUrl.replace(reg, rule.redirectUrl)
        : originUrl.replace(reg, rule.redirectUrl);
    }

  });

  window.lastRequestId = details.requestId;

  if (!redirectUrl) {
    redirectUrl = originUrl;
  }

  return redirectUrl === details.url ? {} : { redirectUrl };
};

window.onBeforeRequestCallback = (details) => redirectToMatchingRule(details);

export default { redirectToMatchingRule };