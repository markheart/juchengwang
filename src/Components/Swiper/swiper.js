import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
class MySwiper extends Component{
    render(){
        return <div className="swiper-container MySwiper">
            <div className="swiper-wrapper">
                {this.props.children}
            </div>
            <div className="swiper-pagination"></div>
        </div>
    }
    componentDidMount() {
        // 首页轮播初始化配置
        var homeLoop = this.props.homeSwiper
        // console.log(homeLoop)
        new Swiper(".MySwiper", homeLoop)
    }
}

export default MySwiper