/**
 * Created by zhouchao on 16/12/9.
 */
import React, { PropTypes, Component } from 'react'

export default class WeekDay extends Component {
  
  
  constructor(props){
    
    super(props);
    
    this.state = {
      
      names: [
        '天',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
      ]
    };
    
  }
  
  render(){
    
    const names =  this.state.names;
    
    return <div className="rmc-week-day">
      {
        names.map((name, index) => {
    
          const props = {
            key: index,
            className: 'rmc-week-day-item',
            children: name
          };
          
          return <div {...props} ></div>
    
        })
      }
      
      </div>
    
  }
}