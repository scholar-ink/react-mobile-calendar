'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.less');

var _toMoment = require('../Utils/toMoment');

var _toMoment2 = _interopRequireDefault(_toMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBar = function NavBar(_ref) {
  var viewMoment = _ref.viewMoment,
      onRowClick = _ref.onRowClick,
      _ref$isShowArrow = _ref.isShowArrow,
      isShowArrow = _ref$isShowArrow === undefined ? false : _ref$isShowArrow;


  return _react2.default.createElement(
    'div',
    { className: 'rmc-nav-bar' },
    _react2.default.createElement(
      'span',
      { onClick: function onClick() {
          return onRowClick(-1);
        }, style: isShowArrow != true ? { display: 'none' } : {}, className: 'arrow' },
      '\u300A'
    ),
    _react2.default.createElement(
      'div',
      { className: 'item' },
      (0, _toMoment2.default)(viewMoment).format('YYYY.MM')
    ),
    _react2.default.createElement(
      'span',
      { onClick: function onClick() {
          return onRowClick(1);
        }, style: isShowArrow != true ? { display: 'none' } : {}, className: 'arrow' },
      '\u300B'
    )
  );
}; /**
    * Created by zhouchao on 16/12/9.
    */
exports.default = NavBar;