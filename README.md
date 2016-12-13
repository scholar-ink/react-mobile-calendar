# react-mobile-calendar
> 用react做的用于手机端显示的日历

## Features

* 选择时间点、时间段(多月选择)
* 可以对每一天的界面数据及样式进行自定义和扩展
* 使用moment处理日历时间

## 下载

```shell

git clone https://github.com/scholar-ink/react-ttouch

npm install

npm start

```

## 下载

```shell

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
];

const onDayClick  = (day,rangeDays,is_complete)=>{
  
  for (var value of rangeDays) {
    
    if(value.disable==false) {  //使用rendDay 自定义的数据
      
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

  let day_my = days.find((value)=>(value.key==day.number));

  if(day_my==undefined){

    day.disable = false;  //自定义数据

    day.money = '暂无';  //自定义数据

  }else{

    day.money = day_my.text;

    day.disable = true;
  }
  //自定义 一天的样式
  props.children = <div className="day"><span className="textNum">{day.text}</span><span className="textMoney">{day.money}</span></div>;

};

ReactDOM.render(
  
  <div>
    <MultiMonthView startText="入住" endText="退房" monthNumber="5" viewMoment="2016-12" onDayClick={onDayClick} rendDay={rendDay}/>
  </div>,
  document.getElementById('root')
);

```

## Docs

* MultiMonthView
    * startText: 开始按钮显示的值
    * endText: 结束按钮显示的值
    * monthNumber: 显示月数
    * viewMoment: 当前显示月份
    * renderDay: 自定义渲染一天的数据
    * onDayClick: 接收三个参数
        * day:选中天数据
        * rangeDays: 选中时间段
        * is_complete: 是否选择完成
    




