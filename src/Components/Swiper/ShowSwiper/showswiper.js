import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import './show.scss'
class MySwiper extends Component{
    render(){
        return <div className="swiper-container ShowSwiper">
            <div className="swiper-wrapper">
                {this.props.children}
            </div>
            <div className="swiper-pagination"></div>
        </div>
    }
    componentDidMount() {
<<<<<<< HEAD:src/Components/Swiper/ShowSwiper/showswiper.js
        new Swiper(".ShowSwiper", 
            {
                slidesPerView: 'auto',
            }
        )
=======
        // 首页轮播初始化配置
        // console.log(homeLoop)
        const homeLoop = this.props.homeSwiper
        const defaultinfo = {
            observer:true,
            observeParents:true
        }
        new Swiper(".MySwiper", {...homeLoop,...defaultinfo})
>>>>>>> cinema-syl:src/Components/Swiper/swiper.js
    }
}

export default MySwiper