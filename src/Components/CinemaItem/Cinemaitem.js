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
          <span className={style.morecont}><NavLink to="/" id={this.props.data.id}>...</NavLink></span>
        </h2>


{/* -----------------------------swiper组件------------------------------------------ */}
        {/* swiper */}

        <MySwiper homeSwiper={
                {
                  slidesPerView: 2.8,
                }}>
          {
            this.props.data.showList.map(item=>
              <div className={"swiper-slide"+" "+style.swiperbox} key={item.id}>
                <p>{item.show_time}<span></span></p>
                <img src={item.pic} alt={item.schedular_name} className={style.swiperimg}/>
              </div>
              )
          }

          {/*---------------------------- 显示最后的那个查看更多 ----------------------------*/}
          {
            // swiper最后有个查看更多,当轮播个数大于8才会显示
            this.props.data.showList.length>8 ? <div className={"swiper-slide"+" "+style.swiperbox}>
            <p><span></span></p>
            <div className={style.swiperlast}><NavLink to="/list">查看更多></NavLink></div>
          </div> : null
          }
          
        </MySwiper>
      </div>
    )
  }
}

export default withRouter(Cinemaitem)