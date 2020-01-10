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
      let defaultinfo=null
        new Swiper(".HotSwiper", {...defaultinfo,...this.props.homeSwiper})
    }
}

export default MySwiper