(function () {
  'use strict';

  var conversions, identifier, locale, options, units;

  conversions = [
    1000,
    60,
    60,
    24,
    30,
    12,
    100,
  ];
  identifier = {
    en: {
      past: ' ago',
      present: 'just now',
    },
    ja: {
      past: '前',
      present: 'たった今',
    },
  },
  locale = {
    en: {
      pluralable: true,
    },
    ja: {
      pluralable: false,
    },
  },
  options = {
    locale: 'en',
  };
  units = {
    en: [
      'second',
      'minute',
      'hour',
      'day',
      'month',
      'year',
    ],
    ja: [
      '秒',
      '分',
      '時間',
      '日',
      'か月',
      '年',
    ],
  };

  function _pluralize(target) {
    if (!locale[options.locale].pluralable) return target;

    return parseInt(target) > 1 ? target + 's' : target;
  }

  function relativize(params) {
    var delta;

    if (params !== undefined) for (var i = 0, k = Object.keys(params), l = k.length; i < l; i++) {
      options[k[i]] = params[k[i]];
    }

    delta = new Date() - this;

    for (var i = 0, l = conversions.length; i < l; i++) {
      delta = Math.floor(delta / conversions[i]);

      if (delta < conversions[i + 1]) {
        return i < 1 && 15 > Math.abs(delta)
            ? identifier[options.locale]['present']
            : _pluralize(delta + ' ' + units[options.locale][i], options.locale) + identifier[options.locale]['past'];
      }
    }
  }

  function toDate() {
    return new Date(Date.parse(this));
  }

  Object.defineProperties(Date.prototype, {
    relativize: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: relativize,
    },
  });

  Object.defineProperties(String.prototype, {
    toDate: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: toDate,
    },
  });
})();
