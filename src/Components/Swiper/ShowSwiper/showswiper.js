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
        new Swiper(".ShowSwiper", 
            {
                slidesPerView: 'auto',
                observer:true,
                observeParents:true
            }
        )
    }
}

export default MySwiper