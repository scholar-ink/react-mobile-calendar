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

require('./index.less');

var _toMoment = require('../Utils/toMoment');

var _toMoment2 = _interopRequireDefault(_toMoment);

var _format = require('../Utils/format');

var _format2 = _interopRequireDefault(_format);

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by zhouchao on 16/12/9.
 */
var getMonthDays = function getMonthDays(viewMoment, monthNumber) {

  var monthDays = [];

  for (var i = 0; i < monthNumber; i++) {

    var firstDay = (0, _toMoment2.default)(viewMoment).startOf('month'); //第一天

    var endDay = (0, _toMoment2.default)(viewMoment).endOf('month'); //最后一天

    var start = (0, _toMoment2.default)(firstDay).day(0); //这个月第一天的周日

    var end = (0, _toMoment2.default)(endDay).day(6);

    var month = {
      viewMoment: (0, _toMoment2.default)(viewMoment),
      firstDay: firstDay,
      endDay: endDay,
      days: getDaysInMonthView(start, end)
    };

    monthDays.push(month);

    viewMoment = (0, _toMoment2.default)(viewMoment).add('+1', 'month');
  }
  return monthDays;
};

var getDaysInMonthView = function getDaysInMonthView(start, end) {

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

    result.push(day);

    start.add(1, 'days');
  }
  return result;
};

var MultiMonthView = function (_Component) {
  (0, _inherits3.default)(MultiMonthView, _Component);

  function MultiMonthView(props) {
    (0, _classCallCheck3.default)(this, MultiMonthView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MultiMonthView.__proto__ || (0, _getPrototypeOf2.default)(MultiMonthView)).call(this, props));

    var _this$props = _this.props,
        monthNumber = _this$props.monthNumber,
        viewMoment = _this$props.viewMoment;


    _this.startMoment = null;

    _this.endMoment = null;

    _this.state = {

      monthDays: getMonthDays(viewMoment, monthNumber)

    };

    return _this;
  }

  (0, _createClass3.default)(MultiMonthView, [{
    key: 'onDayClick',
    value: function onDayClick(dayIndex, monthIndex) {
      var _this2 = this;

      var day = this.state.monthDays[monthIndex]['days'][dayIndex];

      var dayMoment = (0, _toMoment2.default)(day.moment);

      var startMoment = this.startMoment,
          endMoment = this.endMoment;


      if (this.startMoment == null) {

        this.startMoment = dayMoment;
      } else if (this.endMoment == null) {

        if ((0, _toMoment2.default)(dayMoment).isBefore(this.startMoment)) {

          this.startMoment = dayMoment;
        } else if ((0, _toMoment2.default)(dayMoment).isSame(this.startMoment)) {

          this.startMoment = null;
        } else {

          this.endMoment = dayMoment;
        }
      } else {

        this.startMoment = dayMoment;

        this.endMoment = null;
      }

      var star_time = this.startMoment != null ? _format2.default.full(this.startMoment) : 0;

      var end_time = this.endMoment != null ? _format2.default.full(this.endMoment) : star_time;

      var rangeDays = [];

      this.state.monthDays.map(function (month) {

        month.days.map(function (day) {

          if (day.number > star_time && day.number < end_time) {

            rangeDays.push(day);

            day.type = 2;

            day.className = ' range';
          } else if (day.number == star_time) {

            rangeDays.push(day);

            day.type = 2;

            day.className = ' active';

            day.text = _this2.props.startText != '' ? _this2.props.startText : day.text;
          } else if (day.number == end_time) {

            rangeDays.push(day);

            day.type = 2;

            day.className = ' active';

            day.text = _this2.props.endText != '' ? _this2.props.endText : day.text;
          } else {

            day.type = day.old.type;

            day.className = day.old.className;

            day.text = day.old.text;
          }
        });
      });

      var is_complete = this.startMoment != null && this.endMoment != null;

      if (this.props.onDayClick(day, rangeDays, is_complete)) {

        this.setState({ monthDays: this.state.monthDays });
      } else {

        this.startMoment = startMoment;

        this.endMoment = endMoment;
      }
    }
  }, {
    key: 'renderNav',
    value: function renderNav(viewMoment) {

      return _react2.default.createElement(_NavBar2.default, { viewMoment: viewMoment });
    }
  }, {
    key: 'renderDay',
    value: function renderDay(day, dayIndex, month, monthIndex) {
      var _this3 = this;

      if (dayIndex % 7 == 0 || (dayIndex + 1) % 7 == 0) {

        day.className += ' week';
      }

      if ((0, _toMoment2.default)(day.moment).isSame((0, _toMoment2.default)(), 'day')) {

        if (day.type != 2) day.text = '今天';

        day.className += ' today';
      }

      if (day.moment.isBefore(month.firstDay)) {

        day.type = -1;

        day.className += ' prev-month';
      } else if (day.moment.isAfter(month.endDay)) {

        day.type = 1;

        day.className += ' next-month';
      } else {

        day.type = 1;

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
          return _this3.onDayClick(dayIndex, monthIndex);
        } }, props));
    }
  }, {
    key: 'renderDays',
    value: function renderDays(month, monthIndex) {
      var _this4 = this;

      var nodes = month.days.map(function (date, dayIndex) {
        return _this4.renderDay(date, dayIndex, month, monthIndex);
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
    key: 'renderMonth',
    value: function renderMonth(month, monthIndex) {
      return _react2.default.createElement(
        'div',
        null,
        this.renderNav(month.viewMoment),
        this.renderDays(month, monthIndex)
      );
    }
  }, {
    key: 'renderMonthDay',
    value: function renderMonthDay(monthDays) {
      var _this5 = this;

      var nodes = monthDays.map(function (month, index) {
        return _this5.renderMonth(month, index);
      });

      return nodes.map(function (node, index) {
        return _react2.default.createElement('div', {
          key: 'month_' + index,
          className: 'month month-' + index,
          children: node
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'rmc-days' },
        this.renderMonthDay(this.state.monthDays)
      );
    }
  }]);
  return MultiMonthView;
}(_react.Component);

MultiMonthView.defaultProps = {
  startText: '',
  endText: '',
  viewMoment: (0, _toMoment2.default)(), //初始月份
  monthNumber: 1, //显示月份数
  rendDay: function rendDay() {}
};
exports.default = MultiMonthView;