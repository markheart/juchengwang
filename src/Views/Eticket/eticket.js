import React, { Component } from 'react'
import style from './eticket.module.scss'

export default class Eticket extends Component {
  render() {
    return (
      <div id={style.eticket}>
        <h3>票夹</h3>
        <img src="https://m.juooo.com/static/img/ticket_empty.cf4b072.png" />
        <p>暂无电子票</p>
      </div>
    )
  }
}
