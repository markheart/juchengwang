import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import style from './cinemaitem.module.scss'
import MySwiper from '../Swiper/swiper'
class Cinemaitem extends Component {
  //该页面获取cinema数据(this.props.data)
  render() {
    console.log(this.props.data)
    return (
      <div id={style.cinemaitem}>
        {/* 组件title */}
        <h2>
          <img src={this.props.data.pic} />
          <p>
            <span className={style.cinemaname}>{this.props.data.name}</span>
            <span>{this.props.data.count}场在售演出</span>
          </p>
          <span className={style.morecont}><NavLink to="/" id={this.props.data.vid}>...</NavLink></span>
        </h2>


{/* -----------------------------swiper组件------------------------------------------ */}
        {/* swiper */}

        <MySwiper homeSwiper={
                {
                  slidesPerView: 3,
                  spaceBetween: 30,
                }}>
          {
            this.props.data.showList.map(item=>
              if(item.length > 0){
                <div className="swiper-slide" key={item.id}>
                  <img src={item.pic} alt={item.schedular_name} className={style.swiperitem}/>
                </div>
              }
              )

          }
          
        </MySwiper>
      </div>
    )
  }
}

export default withRouter(Cinemaitem)