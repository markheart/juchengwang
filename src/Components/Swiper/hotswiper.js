import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
class MySwiper extends Component{
    render(){
        return <div className="swiper-container HotSwiper">
            <div className="swiper-wrapper">
                {this.props.children}
            </div>
            <div className="swiper-pagination"></div>
        </div>
    }
    componentDidMount() {
        new Swiper(".HotSwiper", 
            {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: true,
            }
        )
    }
}

export default MySwiper