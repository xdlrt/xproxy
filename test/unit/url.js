/* global describe, it, beforeEach  */
import { expect } from 'chai';
import { redirectToMatchingRule } from '../../src/forward';

describe('转发url的规则测试', () => {
  beforeEach(function () {
    // 在本区块的每个测试用例之前执行
    window.xproxyConfig = { proxyList: [] };
  });
  it('no forwarding when no rules', () => {
    expect(redirectToMatchingRule({ url: 'g.alicdn.com' })).to.be.empty;
  });
});