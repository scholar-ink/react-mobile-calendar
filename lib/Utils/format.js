'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toMoment = require('./toMoment');

var _toMoment2 = _interopRequireDefault(_toMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG = {
  // the format in which days should be displayed in month view
  dayFormat: 'D',

  // the format in which months should be displayed in year view
  monthFormat: 'MM',

  // the format in which years should be displayed in decade view
  yearFormat: 'YYYY',

  fullFormat: 'YYYYMMDD'

};

var f = function f(mom, format) {
  return (0, _toMoment2.default)(mom).format(format);
};

exports.default = {
  day: function day(mom) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONFIG.dayFormat;

    return f(mom, format);
  },
  month: function month(mom) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONFIG.monthFormat;

    return f(mom, format);
  },
  year: function year(mom) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONFIG.yearFormat;

    return f(mom, format);
  },
  full: function full(mom) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CONFIG.fullFormat;

    return f(mom, format);
  }
};