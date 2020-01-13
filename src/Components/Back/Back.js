import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import style from './back.module.scss'
export default class Back extends Component {
  render() {
    return (
      <div className={style.backbtn}>
        <span className={"iconfont icon-icon_left" + " " + style.goback} onClick={this.gobackpage}><NavLink to="/"></NavLink></span>
      </div>
    )
  }

  gobackpage=()=>{
    window.history.back()
  }
}
