import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import './swiper.scss'
class MySwiper extends Component{
    render(){
        return <div className="swiper-container MySwiper">
            <div className="swiper-wrapper">
                {this.props.children}
            </div>
            <div className={`swiper-pagination ${this.props.swiperAddClassName}`}
                style={this.props.swiperStyle}
            ></div>
        </div>
    }
    componentDidMount() {
        new Swiper(".MySwiper", 
            {
                loop:true,
                autoplay:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                observer:true,
                observeParents:true
            }
        )
    }
}

export default MySwiper