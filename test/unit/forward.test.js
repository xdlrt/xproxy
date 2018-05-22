/* global describe, it, beforeEach  */
import { expect } from 'chai';
import { redirectToMatchingRule } from '../../src/forward';

describe('should not forward', () => {

  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
    window.xproxyConfig = {};
    window.lastRequestId = null;
    window.urls = new Array(200);
  });

  it('no forwarding when no rules', () => {
    window.xproxyConfig = {};
    expect(redirectToMatchingRule({ url: 'g.alicdn.com' })).to.deep.equal({});
    expect(redirectToMatchingRule({
      url: 'https://g.alicdn.com??a.js,b.js,c.js',
      requestId: 2
    })).to.deep.equal({});
  });

  it('redirectUrl does not exist', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: 'https://g.alicdn.com'
        },
        {
          title: 'test',
          url: 'https://baidu.com',
          redirectUrl: 'https://taobao.com'
        }
      ]
    };
    expect(redirectToMatchingRule({
      url: 'g.alicdn.com',
      requestId: 1
    })).to.deep.equal({});
    expect(redirectToMatchingRule({
      url: 'https://g.alicdn.com??a.js,b.js,c.js',
      requestId: 2
    })).to.deep.equal({});
  });

  it('chrome-extension:// should not forward', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test',
          url: '(.*).js',
          redirectUrl: '$1.js'
        },
        {
          title: 'test1',
          url: 'xxxxx',
          redirectUrl: 'xxxx'
        }
      ]
    };
    expect(redirectToMatchingRule({
      url: 'chrome-extension://xxxxx/a.js',
      requestId: 1
    })).to.deep.equal({});
  });

  it('same request id should not forwarding', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: 'https://g.alicdn.com',
          redirectUrl: 'https://taobao.com'
        }
      ]
    };
    expect(redirectToMatchingRule({
      url: 'g.alicdn.com',
      requestId: 1
    })).to.deep.equal({});
    expect(redirectToMatchingRule({
      url: 'https://g.alicdn.com??a.js,b.js,c.js',
      requestId: 1
    })).to.deep.equal({});
  });

});

describe('normal urls which should forward', () => {

  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
    window.xproxyConfig = {};
    window.lastRequestId = null;
    window.urls = new Array(200);
  });

  it('should forwarding url without query string', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: 'g.alicdn.com',
          redirectUrl: 'g.alicdn.com?t=2'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com',
        requestId: 1
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com#aaaa',
        requestId: 2
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2#aaaa');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/??a.js,b.js,c.js',
        requestId: 3
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2/??a.js,b.js,c.js');
  });

  it('should forwarding url with query string', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: 'https://g.alicdn.com?t=1',
          redirectUrl: 'https://g.alicdn.com?t=2'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com?t=1',
        requestId: 1
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com?t=1&k=2',
        requestId: 2
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2&k=2');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com?t=1/??a.js,b.js,c.js',
        requestId: 3
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2/??a.js,b.js,c.js');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com#aaaa',
        requestId: 1
      })
    ).to.deep.equal({});
  });

  it('should forwarding url with ?? ', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: 'https://a.com/??a.js,b.js',
          redirectUrl: 'https://b.com/??a.js,b.js'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'https://a.com/??a.js,b.js',
        requestId: 1
      }).redirectUrl
    ).to.be.equal('https://b.com/??a.js,b.js');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/#aaaa',
        requestId: 2
      })
    ).to.deep.equal({});
    expect(
      redirectToMatchingRule({
        url: 'https://a.com/??a.js,b.js?t=1#aaa',
        requestId: 3
      }).redirectUrl
    ).to.be.equal('https://b.com/??a.js,b.js?t=1#aaa');
  });

});

describe('reg urls which should forward', () => {

  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
    window.xproxyConfig = {};
    window.lastRequestId = null;
    window.urls = new Array(200);
  });

  it('should forward reg url without query', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: 'g.(\\w+).com',
          redirectUrl: 'g.alicdn.com?t=2'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'https://g1.alicdn.com',
        requestId: 1
      })
    ).to.deep.equal({});
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com',
        requestId: 2
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com#aaaa',
        requestId: 3
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2#aaaa');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/??a.js,b.js,c.js',
        requestId: 4
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2/??a.js,b.js,c.js');
  });

  it('should forward reg url with query', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: '(.*)g.(.*).com\\?t=1',
          redirectUrl: '$1g.alicdn.com?t=2'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'http://g.alicdn.com?t=1&k=2',
        requestId: 1
      }).redirectUrl
    ).to.be.equal('http://g.alicdn.com?t=2&k=2');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com?t=1&k=2',
        requestId: 2
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2&k=2');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com#aaaa',
        requestId: 3
      })
    ).to.deep.equal({});
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com?t=1#aaaa',
        requestId: 4
      }).redirectUrl
    ).to.be.equal('https://g.alicdn.com?t=2#aaaa');
  });

  it('should forwarding reg url with ??', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: '(.*)g.alicdn.com/??(.*)',
          redirectUrl: '$1aliyun.alicdn.com/??$2'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/??a.js,b.js?t=1',
        requestId: 1
      }).redirectUrl
    ).to.be.equal('https://aliyun.alicdn.com/??a.js,b.js?t=1');
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/#aaaa',
        requestId: 2
      }),
    ).to.deep.equal({});
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/??a.js,b.js?t=1#aaa',
        requestId: 3
      }).redirectUrl
    ).to.be.equal('https://aliyun.alicdn.com/??a.js,b.js?t=1#aaa');
  });

});


describe('combined rules', () => {
  it('should support combined rules', () => {
    window.xproxyConfig = {
      id: 'ioahsfioh',
      proxyList: [
        {
          title: 'test0',
          url: '//g.alicdn.com/platform/daily-test/(.*).js$',
          redirectUrl: '//g.alicdn.com/platform/daily-test/$1.json'
        },
        {
          title: 'test0',
          url: 'g.alicdn.com',
          redirectUrl: 'aliyun.alicdn.com'
        }
      ]
    };
    expect(
      redirectToMatchingRule({
        url: 'https://g.alicdn.com/platform/daily-test/isDaily.js',
        requestId: 1
      }).redirectUrl,
    ).to.be.equal('https://aliyun.alicdn.com/platform/daily-test/isDaily.json');
  });
});
