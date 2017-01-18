/**
 * Created by zhouchao on 16/12/9.
 */
import React, { PropTypes, Component } from 'react'
import chunk from 'lodash/chunk'
import toMoment from '../Utils/toMoment'
import format from '../Utils/format'
import NavBar from '../NavBar'
import WeekDay from '../WeekDay'


export default class MonthView extends Component {

  static defaultProps = {
    viewMoment: toMoment(),//初始月份
    defaultDay: null,
    renderDay: () => { },
    onDayClick:()=>{}
  };

  constructor(props) {

    super(props);

    this.firstDay = null;

    this.endDay = null;

    this.state = {
      viewMoment: this.props.viewMoment,
      days: this.getDaysInMonthView(this.props.viewMoment, this.props.defaultDay),
      day: this.props.defaultDay
    };

    this.onRowClick = this.onRowClick.bind(this);
  }

  getDaysInMonthView(viewMoment, defaultDay) {

    this.firstDay = toMoment(viewMoment).startOf('month');//第一天

    this.endDay = toMoment(viewMoment).endOf('month');//最后一天

    let start = toMoment(this.firstDay).day(0);  //这个月第一天的周日

    let end = toMoment(this.endDay).day(6);

    const length = end.diff(start, 'days');

    const result = [];

    for (let i = 0; i <= length; i++) {

      let day = {
        text: format.day(start),
        number: format.full(start),
        moment: toMoment(start),
        type: 0, // -1:上一个月 0:当前月  1:下一个月  2:range
        className: '',
        old: {
          text: format.day(start),
          number: format.full(start),
          moment: toMoment(start),
          type: 0,
          className: '',
        },
      };

      if (defaultDay != null && start.isSame(toMoment(defaultDay))) {

        day.type = 2;

        day.className = ' active';

      }

      result.push(day);

      start.add(1, 'days');
    }

    return result;
  }

  onDayClick(day) {

    this.state.days.forEach((day) => {

      if (day.type == 2) {

        day.type = day.old.type;

        day.className = day.old.className;

      }

    });

    day.type = 2;

    day.className = ' active';
    if(this.props.onDayClick(day)){
      this.setState({days:this.state.days,day:day.moment});
    }
  }

  renderDay(day, index) {

    if (index % 7 == 0 || (index + 1) % 7 == 0) {

      day.className += ' week';

    }

    if (toMoment(day.moment).isSame(toMoment(), 'day')) {

      if (day.type != 2) day.text = '今天';

      day.className += ' today'

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

    let className = 'item' + day.className;

    const props = {
      key: day.number,
      className: className,
      children: day.text,
      style: {}
    };

    this.props.renderDay(day, props);

    return <div onClick={() => this.onDayClick(day)} {...props} ></div>
  }

  renderDays() {

    let nodes = this.state.days.map((day, index) => this.renderDay(day, index));

    nodes = chunk(nodes, 7);

    return nodes.map((node, index) => <div
      key={`row_${index}`}
      className={`row row-${index}`}
      children={node}
      />)
  }

  onRowClick(type) {

    let viewMoment = null;

    if (type == -1) {

      viewMoment = toMoment(this.state.viewMoment).add('-1', 'month');

    } else {

      viewMoment = toMoment(this.state.viewMoment).add('+1', 'month');

    }
    if (this.props.onRowClick(viewMoment, type)) {
      this.setState({ viewMoment: viewMoment, days: this.getDaysInMonthView(viewMoment, this.state.day) });
    }
  }

  render() {

    return (
      <div>
        <NavBar onRowClick={this.onRowClick} isShowArrow={true} viewMoment={this.state.viewMoment} />
        <WeekDay />
        <div className="rmc-days">
          {this.renderDays()}
        </div>
      </div>
    );

  }
}
