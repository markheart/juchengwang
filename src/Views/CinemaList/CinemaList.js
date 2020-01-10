import React, { Component } from 'react'
import { hideTabbar, showTabbar } from '../../Redux/Actions/login'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'
import Masonry from 'react-masonry-component';
import style from './CinemaList.module.scss'
class CinemaList extends Component {
  state = {
    datatotal: 0,
    datalist: [],
    height: document.documentElement.clientHeight,
    page: 1
  }


  //--------------------------------------------------懒加载------------------------------------------------------
  getnewdatalist = () => {
    console.log(document.body.offsetHeight - this.state.height - document.documentElement.scrollTop)
    if (document.body.offsetHeight - this.state.height - document.documentElement.scrollTop <= 100) {
      this.setState({
        page: this.state.page + 1
      })
      let dataid = this.props.match.params.cinemaid
      Axios({
        url: `https://api.juooo.com/Show/Search/getShowList?city_id=&category=&keywords=&venue_id=${dataid}&start_time=&page=${this.state.page}&referer_type=&version=6.0.9&referer=2`
      }).then(res => {
        this.setState({
          datalist: [...this.state.datalist, ...res.data.data.list]
        })
      })
    } else if (this.state.datalist.length === this.state.datatotal) {
      window.removeEventListener('scroll', this.getnewdatalist)
    }
  }
  //--------------------------------------------------懒加载------------------------------------------------------

  componentDidMount() {
    this.props.hideTabbar()
    let dataid = this.props.match.params.cinemaid
    // 发送ajax请求数据,附上ID
    Axios({
      url: `https://api.juooo.com/Show/Search/getShowList?city_id=&category=&keywords=&venue_id=${dataid}&start_time=&page=1&referer_type=&version=6.0.9&referer=2`
    }).then(res => {
      this.setState({
        datalist: res.data.data.list,
        datatotal: res.data.data.total
      })
    })
    window.addEventListener('scroll', this.getnewdatalist); //监听滚动事件,且调用函数
  }

  // -------------------------瀑布流组件---------------------------------
  render() {
    const childElements = this.state.datalist.map((element,i) =>
      <li key={i} onClick={()=>{this.handelClick(element.schedular_id)}}>
        <span className={style.cinemacity}>{element.city_name}</span>
        <div className={style.cinemafall}>
          <img src={element.pic} />
          <div className={style.content}>
            <p className={style.cinemaname}>
              <span>主办</span>
              {element.name}
            </p>
            <p className={style.date}>
              <span>{element.start_show_time.slice(0, 10)}-</span><span>{element.end_show_time.slice(5, 10)}</span>
            </p>
            <p className={style.pirce}><span>￥{element.min_price} </span>起</p>
            <div className={style.support_desc+" "+"clear"}>
              {element.support_desc.map((item,i)=>
                <span key={i}>{item}</span>
                )}
            </div>
          </div>
        </div>
      </li>
    );
    return (
      <Masonry
        className={style.cinemabox}
        elementType={'ul'} // default 'div'
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
      >
        {childElements}
      </Masonry>
    );
    // -------------------------瀑布流组件---------------------------------
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getnewdatalist)
    this.props.showTabbar()
  }
  handelClick(id){
    this.this.props.history.push(`/detail/${id}`)
  }


}

const mapStateToProp = null
const mapReducerToProps = {
  hideTabbar,
  showTabbar
}
export default connect(mapStateToProp, mapReducerToProps)(withRouter(CinemaList))