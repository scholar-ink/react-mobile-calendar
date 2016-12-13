'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = undefined;

var _MultiMonthView = require('./MultiMonthView');

var _MultiMonthView2 = _interopRequireDefault(_MultiMonthView);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

require('./Style/index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = exports.DatePicker = _Calendar2.default; /**
                                                           * Created by zhouchao on 16/12/8.
                                                           */
exports.default = _MultiMonthView2.default;