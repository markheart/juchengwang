import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import style from './tabbar.module.scss'

export default class Tabbar extends Component {
  render() {
    return (
      <nav id={style.tabbar}>
        <ul>
          <li><NavLink to='/home' activeClassName={style.active_home}>首页</NavLink></li>
          <li><NavLink to='/cinema' activeClassName={style.active}>剧院</NavLink></li>
          <li><NavLink to='/eticket' activeClassName={style.active}>票夹</NavLink></li>
          <li><NavLink to='/center' activeClassName={style.active}>我的</NavLink></li>
        </ul>
      </nav>
    )
  }
}
