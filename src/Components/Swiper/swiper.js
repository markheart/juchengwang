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
        new Swiper(".MySwiper", 
            {
                loop:true,
                autoplay:true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            }
        )
    }
}

export default MySwiper