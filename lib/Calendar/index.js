'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _chunk = require('lodash/chunk');

var _chunk2 = _interopRequireDefault(_chunk);

var _toMoment = require('../Utils/toMoment');

var _toMoment2 = _interopRequireDefault(_toMoment);

var _format = require('../Utils/format');

var _format2 = _interopRequireDefault(_format);

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _WeekDay = require('../WeekDay');

var _WeekDay2 = _interopRequireDefault(_WeekDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by zhouchao on 16/12/9.
 */
var MonthView = function (_Component) {
  (0, _inherits3.default)(MonthView, _Component);

  function MonthView(props) {
    (0, _classCallCheck3.default)(this, MonthView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MonthView.__proto__ || (0, _getPrototypeOf2.default)(MonthView)).call(this, props));

    _this.firstDay = null;

    _this.endDay = null;

    _this.state = {
      viewMoment: _this.props.viewMoment,
      days: _this.getDaysInMonthView(_this.props.viewMoment, _this.props.defaultDay),
      day: _this.props.defaultDay
    };

    _this.onRowClick = _this.onRowClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MonthView, [{
    key: 'getDaysInMonthView',
    value: function getDaysInMonthView(viewMoment, defaultDay) {

      this.firstDay = (0, _toMoment2.default)(viewMoment).startOf('month'); //第一天

      this.endDay = (0, _toMoment2.default)(viewMoment).endOf('month'); //最后一天

      var start = (0, _toMoment2.default)(this.firstDay).day(0); //这个月第一天的周日

      var end = (0, _toMoment2.default)(this.endDay).day(6);

      var length = end.diff(start, 'days');

      var result = [];

      for (var i = 0; i <= length; i++) {

        var day = {
          text: _format2.default.day(start),
          number: _format2.default.full(start),
          moment: (0, _toMoment2.default)(start),
          type: 0, // -1:上一个月 0:当前月  1:下一个月  2:range
          className: '',
          old: {
            text: _format2.default.day(start),
            number: _format2.default.full(start),
            moment: (0, _toMoment2.default)(start),
            type: 0,
            className: ''
          }
        };

        if (defaultDay != null && start.isSame((0, _toMoment2.default)(defaultDay))) {

          day.type = 2;

          day.className = ' active';
        }

        result.push(day);

        start.add(1, 'days');
      }

      return result;
    }
  }, {
    key: 'onDayClick',
    value: function onDayClick(day) {

      this.state.days.forEach(function (day) {

        if (day.type == 2) {

          day.type = day.old.type;

          day.className = day.old.className;
        }
      });

      day.type = 2;

      day.className = ' active';

      if (this.props.onDayClick(day)) {
        this.setState({ days: this.state.days, day: day.moment });
      }
    }
  }, {
    key: 'renderDay',
    value: function renderDay(day, index) {
      var _this2 = this;

      if (index % 7 == 0 || (index + 1) % 7 == 0) {

        day.className += ' week';
      }

      if ((0, _toMoment2.default)(day.moment).isSame((0, _toMoment2.default)(), 'day')) {

        if (day.type != 2) day.text = '今天';

        day.className += ' today';
      }

      if (day.moment.isBefore(this.firstDay)) {

        if (day.type != 2) day.type = -1;

        day.className += ' prev-month';
      } else if (day.moment.isAfter(this.endDay)) {

        if (day.type != 2) day.type = 1;

        day.className += ' next-month';
      } else {

        if (day.type != 2) day.type = 1;

        day.className += ' this-month';
      }

      var className = 'item' + day.className;

      var props = {
        key: day.number,
        className: className,
        children: day.text,
        style: {}
      };

      this.props.rendDay(day, props);

      return _react2.default.createElement('div', (0, _extends3.default)({ onClick: function onClick() {
          return _this2.onDayClick(day);
        } }, props));
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this3 = this;

      var nodes = this.state.days.map(function (day, index) {
        return _this3.renderDay(day, index);
      });

      nodes = (0, _chunk2.default)(nodes, 7);

      return nodes.map(function (node, index) {
        return _react2.default.createElement('div', {
          key: 'row_' + index,
          className: 'row row-' + index,
          children: node
        });
      });
    }
  }, {
    key: 'onRowClick',
    value: function onRowClick(type) {

      var viewMoment = null;

      if (type == -1) {

        viewMoment = (0, _toMoment2.default)(this.state.viewMoment).add('-1', 'month');
      } else {

        viewMoment = (0, _toMoment2.default)(this.state.viewMoment).add('+1', 'month');
      }

      this.setState({ viewMoment: viewMoment, days: this.getDaysInMonthView(viewMoment, this.state.day) });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_NavBar2.default, { onRowClick: this.onRowClick, isShowArrow: true, viewMoment: this.state.viewMoment }),
        _react2.default.createElement(_WeekDay2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'rmc-days' },
          this.renderDays()
        )
      );
    }
  }]);
  return MonthView;
}(_react.Component);

MonthView.defaultProps = {
  viewMoment: (0, _toMoment2.default)(), //初始月份
  defaultDay: null,
  rendDay: function rendDay() {},
  onDayClick: function onDayClick() {}
};
exports.default = MonthView;