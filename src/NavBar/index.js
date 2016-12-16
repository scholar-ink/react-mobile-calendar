/**
 * Created by zhouchao on 16/12/9.
 */
import React, { PropTypes, Component } from 'react'
import toMoment from '../Utils/toMoment'

const NavBar = ({viewMoment,onRowClick,isShowArrow=false})=>{
  
  return (
  
    <div className="rmc-nav-bar">
      
      <span onClick={()=>onRowClick(-1)} style={isShowArrow!=true?{display:'none'}:{}} className="arrow">《</span>
    
      <div className="item">{toMoment(viewMoment).format('YYYY.MM')}</div>
      
      <span onClick={()=>onRowClick(1)} style={isShowArrow!=true?{display:'none'}:{}} className="arrow">》</span>
  
    </div>
    
  );
};

export default NavBar;