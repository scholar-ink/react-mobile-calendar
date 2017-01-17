'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeekDay = function (_Component) {
  (0, _inherits3.default)(WeekDay, _Component);

  function WeekDay(props) {
    (0, _classCallCheck3.default)(this, WeekDay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WeekDay.__proto__ || (0, _getPrototypeOf2.default)(WeekDay)).call(this, props));

    _this.state = {

      names: ['天', '一', '二', '三', '四', '五', '六']
    };

    return _this;
  }

  (0, _createClass3.default)(WeekDay, [{
    key: 'render',
    value: function render() {

      var names = this.state.names;

      return _react2.default.createElement(
        'div',
        { className: 'rmc-week-day' },
        names.map(function (name, index) {

          var props = {
            key: index,
            className: 'rmc-week-day-item',
            children: name
          };

          if (index == 0 || index == 6) {
            props.className = 'rmc-week-day-item week';
          }

          return _react2.default.createElement('div', props);
        })
      );
    }
  }]);
  return WeekDay;
}(_react.Component); /**
                      * Created by zhouchao on 16/12/9.
                      */


exports.default = WeekDay;