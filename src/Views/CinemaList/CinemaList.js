import React, { Component } from 'react'
import { hideTabbar, showTabbar } from '../../Redux/Actions/login'
import {showSearch , hideSearch} from '../../Redux/Actions/showsearch'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'
import Masonry from 'react-masonry-component';
import style from './CinemaList.module.scss'
import Searchbar from '../../Components/Search/Search'
import Cinemabox from '../../Components/Cinemabox/Cinemabox'

class CinemaList extends Component {
  state = {
    datatotal: 0,
    datalist: [],
    height: document.documentElement.clientHeight,
    searchdata:[],
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
    this.props.showSearch()
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
    Axios({
      url:"https://api.juooo.com/Show/Search/getHotWord?version=6.0.9&referer=2"
    }).then(res=>{
      console.log(res.data)
      this.setState({
        searchdata:[...this.state.searchdata,...res.data.data]
      })
    })
    window.addEventListener('scroll', this.getnewdatalist); //监听滚动事件,且调用函数
  }
  // -------------------------瀑布流组件---------------------------------


  render() {
    const childElements = this.state.datalist.map((element,i) =>
     <Cinemabox cinemaelement={element} cinemaindex={i} key={i}/>
    );
    // {<Searchbar />}
    return (
      <div>
      {this.state.searchdata.length>0 ?<Searchbar searchdata={this.state.searchdata}/>:null}
      <Masonry
        className={style.cinemabox}
        elementType={'ul'} // default 'div'
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
      >
        {childElements}
      </Masonry>
      </div>
    );
    // -------------------------瀑布流组件---------------------------------
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getnewdatalist)
    this.props.showTabbar()
    this.props.hideSearch()
  }

}
const mapStateToProp = (state)=>{
  return{
    isSearcheShow:state.searchReducer
  }
}
const mapReducerToProps = {
  hideTabbar,
  showTabbar,
  showSearch,
  hideSearch
}
export default connect(mapStateToProp, mapReducerToProps)(withRouter(CinemaList))