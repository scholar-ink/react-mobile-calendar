/**
 * Created by zhouchao on 16/12/9.
 */
import React, { PropTypes, Component } from 'react'
import chunk from 'lodash/chunk'
import './index.less'
import toMoment from '../Utils/toMoment'
import format from '../Utils/format'
import NavBar from '../NavBar'

const getMonthDays = (viewMoment,monthNumber)=>{
  
  let monthDays = [];
  
  for (let i=0;i<monthNumber;i++){
  
    let firstDay = toMoment(viewMoment).startOf('month');//第一天
  
    let endDay = toMoment(viewMoment).endOf('month');//最后一天
  
    let start = toMoment(firstDay).day(0);  //这个月第一天的周日
  
    let end = toMoment(endDay).day(6);
    
    let month = {
      viewMoment:toMoment(viewMoment),
      firstDay:firstDay,
      endDay:endDay,
      days:getDaysInMonthView(start,end)
    };
  
    monthDays.push(month);
    
    viewMoment = toMoment(viewMoment).add('+1','month');
    
  }
  return monthDays;
};

const getDaysInMonthView = (start,end) => {
  
  const length = end.diff(start,'days');
  
  const result = [];
  
  for (let i = 0 ; i <= length; i++) {
    
    let day = {
      text:format.day(start),
      number:format.full(start),
      moment: toMoment(start),
      type: 0, // -1:上一个月 0:当前月  1:下一个月  2:range
      className: '',
      old:{
        text:format.day(start),
        number:format.full(start),
        moment: toMoment(start),
        type: 0,
        className: '',
      },
    };
    
    result.push(day);
    
    start.add(1, 'days');
    
  }
  return result;
};

export default class MultiMonthView extends Component {
  
  static defaultProps = {
    startText: '',
    endText: '',
    viewMoment:toMoment(),//初始月份
    monthNumber:1,//显示月份数
    rendDay:()=>{}
  };
  
  constructor(props){
    
    super(props);
    
    const {monthNumber,viewMoment} = this.props;
    
    this.startMoment = null;
    
    this.endMoment = null;
    
    this.state = {
      
      monthDays: getMonthDays(viewMoment,monthNumber)
    
    }
    
  }
  
  onDayClick(dayIndex,monthIndex) {
  
    let day = this.state.monthDays[monthIndex]['days'][dayIndex];
  
    let dayMoment = toMoment(day.moment);
    
    const {startMoment,endMoment} = this;
  
    if (this.startMoment == null) {
    
      this.startMoment = dayMoment;
    
    } else if (this.endMoment == null) {
    
      if (toMoment(dayMoment).isBefore(this.startMoment)) {
      
        this.startMoment = dayMoment;
      
      } else if (toMoment(dayMoment).isSame(this.startMoment)) {
      
        this.startMoment = null;
      
      } else {
      
        this.endMoment = dayMoment;
      
      }
    
    } else {
    
      this.startMoment = dayMoment;
    
      this.endMoment = null;
    
    }
  
    let star_time = this.startMoment != null ? format.full(this.startMoment) : 0;
  
    let end_time = this.endMoment != null ? format.full(this.endMoment) : star_time;
  
    let rangeDays = [];
  
    this.state.monthDays.map((month)=> {
    
      month.days.map((day)=> {
      
        if (day.number > star_time && day.number < end_time) {
        
          rangeDays.push(day);
        
          day.type = 2;
        
          day.className = ' range';
        
        } else if (day.number == star_time) {
        
          rangeDays.push(day);
        
          day.type = 2;
        
          day.className = ' active';
        
          day.text = this.props.startText != '' ? this.props.startText : day.text;
        
        } else if (day.number == end_time) {
        
          rangeDays.push(day);
        
          day.type = 2;
        
          day.className = ' active';
        
          day.text = this.props.endText != '' ? this.props.endText : day.text;
        
        } else {
        
          day.type = day.old.type;
        
          day.className = day.old.className;
        
          day.text = day.old.text;
        
        }
      })
    });
  
    let is_complete = this.startMoment != null && this.endMoment != null;
  
    if (this.props.onDayClick(day, rangeDays, is_complete)){
  
      this.setState({monthDays: this.state.monthDays});
  
    }else{
      
      this.startMoment = startMoment;
      
      this.endMoment = endMoment;
      
    }
  
  }
  
  renderNav(viewMoment){
  
    return <NavBar viewMoment={viewMoment}/>
  }
  
  renderDay(day,dayIndex,month,monthIndex){
    
    if(dayIndex%7==0 || (dayIndex+1)%7==0){
      
      day.className+= ' week';
      
    }
    
    if(toMoment(day.moment).isSame(toMoment(),'day')){
      
      if(day.type!=2) day.text = '今天';
  
      day.className += ' today'
      
    }
    
    if(day.moment.isBefore(month.firstDay)){
      
      day.type = -1;
      
      day.className += ' prev-month';
      
    }else if(day.moment.isAfter(month.endDay)){
      
      day.type = 1;
      
      day.className += ' next-month';
      
    }else{
      
      day.type = 1;
      
      day.className += ' this-month';
      
    }
    
    let className = 'item'+ day.className;
    
    const props = {
      key: day.number,
      className: className,
      children: day.text,
      style: {}
    };
  
    this.props.rendDay(day,props);
  
    return <div onClick={()=>this.onDayClick(dayIndex,monthIndex)} {...props} ></div>
  }
  
  renderDays(month,monthIndex){
    
    let nodes = month.days.map((date ,dayIndex) => this.renderDay(date, dayIndex,month,monthIndex));
    
    nodes = chunk(nodes,7);
    
    return nodes.map((node, index) => <div
      key={`row_${index}`}
      className={`row row-${index}`}
      children={node}
    />)
  }
  
  renderMonth(month,monthIndex){
      return <div>
        {this.renderNav(month.viewMoment)}
        {this.renderDays(month,monthIndex)}
      </div>
  }
  
  renderMonthDay(monthDays){
  
    let nodes = monthDays.map((month ,index) => this.renderMonth(month, index));
    
    return nodes.map((node, index) => <div
      key={`month_${index}`}
      className={`month month-${index}`}
      children={node}
    />)
  
  }
  
  render(){
    
    return (
      <div className="rmc-days">
        {this.renderMonthDay(this.state.monthDays)}
      </div>
    );
    
  }
}