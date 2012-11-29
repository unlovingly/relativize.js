var should = require('should');
var relativize = require('../relativize.js');

describe('Date.prototype', function () {
  var epoch = 'Thu, 01 Jan 1970 00:00:00 GMT';

  describe('relativize', function () {
    it('should return string which date or time (singular)', function () {
      new Date(new Date('01 Jan 2011 GMT'))
        .relativize()
        .should
        .equal('1 year ago');
    });

    it('should return string which date or time (plural)', function () {
      new Date(epoch)
        .relativize()
        .should
        .equal('43 years ago');
    });

    it('日付または時刻を表す文字列を返す', function () {
      new Date(epoch)
        .relativize({ locale: 'ja' })
        .should
        .equal('43 年前');
    });
  });
});
