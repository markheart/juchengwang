import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './cinemabox.module.scss'
class Cinemabox extends Component {
  render() {
    return (
      <li key={this.props.index} onClick={()=>{this.handelClick(this.props.cinemaelement.schedular_id)}} className={style.cinemaboxli}>
      <span className={style.cinemacity}>{this.props.cinemaelement.city_name}</span>
      <div className={style.cinemafall}>
        <img src={this.props.cinemaelement.pic} />
        <div className={style.content}>
          <p className={style.cinemaname}>
            <span>主办</span>
            {this.props.cinemaelement.name}
          </p>
          <p className={style.date}>
            <span>{this.props.cinemaelement.start_show_time.slice(0, 10)} - </span><span>{this.props.cinemaelement.end_show_time.slice(5, 10)}</span>
          </p>
          <p className={style.pirce}><span>￥{this.props.cinemaelement.min_price} </span>起</p>
          <div className={style.support_desc+" "+"clear"}>
            {this.props.cinemaelement.support_desc.map((item,i)=>
              <span key={i}>{item}</span>
              )}
          </div>
        </div>
      </div>
    </li>
    )
  }

  handelClick(id){
    this.props.history.push(`/detail/${id}`)
  }
}

export default withRouter(Cinemabox)