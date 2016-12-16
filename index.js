/**
 * Created by zhouchao on 16/12/8.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import MultiMonthView,{DatePicker}  from './src'
import './index.less'

const days = [
  {
    key:20161201,
    text:'¥ 3000'
  },
  {
    key:20161202,
    text:'¥ 1000'
  },
  {
    key:20161203,
    text:'¥ 1000'
  },
  {
    key:20161204,
    text:'¥ 2000'
  },
  {
    key:20161205,
    text:'¥ 2000'
  },
  {
    key:20161206,
    text:'¥ 2000'
  },
  {
    key:20161209,
    text:'¥ 3000'
  },
  {
    key:20161231,
    text:'¥ 3000'
  },
  {
    key:20170101,
    text:'¥ 3000'
  },
  
];

const onDayClick  = (day,rangeDays,is_complete)=>{
  
  for (var value of rangeDays) {
    
    if(value.disable==false) {
      
      console.log(value.moment.format('YYYY-MM-DD')+'不可以订');
      
      return false;
    }
  }
  
  if(is_complete){
    
    console.log('选择完毕');
    
  }else{
    
    console.log('选择退房时间')
    
  }
  
  return true;
};

const rendDay = (day,props)=>{

  let day_my = days.find((value)=>{
    return value.key==day.number
  });

  if(day_my==undefined){

    day.disable = false;

    day.money = '暂无';

  }else{

    day.money = day_my.text;

    day.disable = true;

  }
  props.children = <div className="day"><span className="textNum">{day.text}</span><span className="textMoney">{day.money}</span></div>;

};

ReactDOM.render(
  
  <div>
    <DatePicker defaultDay="2016-12-03" />
  
    <MultiMonthView startMoment="2016-12-03" endMoment="2016-12-06" startText="入住" endText="退房" monthNumber="5" viewMoment="2016-12" onDayClick={onDayClick} rendDay={rendDay}/>
  </div>,
  document.getElementById('root')
);