import React, { Component } from 'react'
import {hideTabbar,showTabbar} from '../../Redux/Actions/login'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'
import Masonry from 'react-masonry-component';
import style from './CinemaList.module.scss'
class CinemaList extends Component {
  state={
    datalist:[]
  }
  componentDidMount() {
    this.props.hideTabbar()

    let dataid=this.props.match.params.cinemaid

      // 发送ajax请求数据,附上ID
    Axios({
      url:`https://api.juooo.com/Show/Search/getShowList?city_id=&category=&keywords=&venue_id=${dataid}&start_time=&page=1&referer_type=&version=6.0.9&referer=2`
    }).then(res=>{
      this.setState({
        datalist:res.data.data.list
      })
    })
  }
  // render() {
  //   // this.props.match.params.cinemaid ----->或许编程式导航的id
  //   return (
  //        <div>
  //          <ul>
  //            {this.state.datalist.map(item=>
  //              <li key={item.schedular_id}  ref="container">
  //                 {console.log(this.refs)}
  //                <img src={item.pic}  />
  //              </li>
  //            )}
  //          </ul>
  //        </div>
  //   )
  // }

  render() {
    const childElements = this.state.datalist.map(function(element){
       return (
            <li>
                <div className={style.fall}><img src={element.pic}/>
                {element.name}
                </div>
            </li>
        );
    });

    return (
        <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
            {childElements}
        </Masonry>
    );
}
  componentWillUnmount() {
    this.props.showTabbar()
  }
  
}

const mapStateToProp=null
const mapReducerToProps={
  hideTabbar,
  showTabbar
}
export default  connect(mapStateToProp,mapReducerToProps)(withRouter(CinemaList))