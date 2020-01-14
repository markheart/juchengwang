import React, { Component } from 'react'
import style from './cinemaitem.module.scss'
import MySwiper from '../Swiper/CinemaSwiper/CinemaSwiper'
import { withRouter } from 'react-router-dom'
import {gettitle} from '../../Redux/Actions/gettitle'
import { connect } from 'react-redux'
class Cinemaitem extends Component {
  //该页面获取cinema数据(this.props.data)
  render() {
    return (
      <div id={style.cinemaitem}>
        {/* --------------------------------------组件title ---------------------------------*/}
        <h2>
          <img src={this.props.data.pic} onClick={() => {
            this.tolistpage(this.props.data.vid) //点击title跳转也列表页,将id传送给列表页,动态路由
          }} />
          <p onClick={() => {
            this.tolistpage(this.props.data.vid) //点击title跳转也列表页,将id传送给列表页,动态路由
          }}>
            <span className={style.cinemaname}>{this.props.data.name}</span>
            <span>{this.props.data.count}场在售演出</span>
          </p>
          <span className={style.morecont} onClick={() => {
            this.gettitleid(this.props.data.id) //点击title跳转也列表页,将id传送给列表页,动态路由
            this.tolistpage(this.props.data.vid)
          }}>...</span>
        </h2>
        {/* -----------------------------swiper组件------------------------------------------ */}
        {/* swiper */}

        <MySwiper homeSwiper={
          {
            slidesPerView: 2.8
          }
          } key={this.props.data.vid}>
          {
            this.props.data.showList.map(item =>
              <div className={"swiper-slide" + " " + style.swiperbox} key={item.id}>
                <p>{item.show_time}<span></span></p>
                <img src={item.pic} alt={item.schedular_name} className={style.swiperimg} />
              </div>
            )
          }

          {/*---------------------------- 显示最后的那个查看更多 ----------------------------*/}

          {
            // swiper最后有个查看更多,当轮播个数大于8才会显示
            this.props.data.showList.length > 8 ? <div className={"swiper-slide" + " " + style.swiperbox}>
              <p><span></span></p>
              <div className={style.swiperlast} onClick={() => {
                this.tolistpage(this.props.data.vid) //点击title跳转也列表页,将id传送给列表页,动态路由
              }}>查看更多></div>
            </div> : null
          }

        </MySwiper>
      </div>
    )
  }

  tolistpage = (listid) => {
    this.props.history.push(`/cinemalist/${listid}`)
  }

  gettitleid=(titleid)=>{
    this.props.gettitle(titleid)
    console.log(titleid)
  }
}

const mapStateToProp = null
const mapReducerToProps = {
  gettitle
}

export default connect(mapStateToProp,mapReducerToProps)(withRouter( Cinemaitem ))

