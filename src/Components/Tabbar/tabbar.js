import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import style from './tabbar.module.scss'

export default class Tabbar extends Component {
  render() {
    return (
      <nav id={style.tabbar}>
        <ul>
          <li>
            <NavLink to='/home' activeClassName={style.active_home}>
              <i className="iconfont icon-icon_certificate_fil"></i>
              <span>首页</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/cinema' activeClassName={style.active}>
              <i className="iconfont icon-icon_circle_line"></i>
              <span>剧院</span>
            </NavLink>
            </li>
          <li>
            <NavLink to='/eticket' activeClassName={style.active}>
              <i className="iconfont icon-icon_doc"></i>
              <span>票夹</span>
            </NavLink>
            </li>
          <li>
            <NavLink to='/center' activeClassName={style.active}>
              <i className="iconfont icon-icon_signal"></i>
              <span>我的</span>
            </NavLink>
            </li>
        </ul>
      </nav>
    )
  }
}
