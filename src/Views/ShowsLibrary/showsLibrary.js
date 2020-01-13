import React, { Component } from 'react'
import { withRouter } from 'react-router'
import LittleNavbar from '../../Components/LittleNavbar/littlenavbar'
import Axios from 'axios'
import Masonry from 'react-masonry-component';
import style from './showsLibrary.module.scss'
import {connect} from 'react-redux'
import {showTabbar,hideTabbar} from '../../Redux/Actions/login'

const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class ShowsLibrary extends Component {
  state = {
    showslist: [],
    showbar:'',
    navlist:[],
    showsIds:'',
    current: 0,
    page: 1,
    height: document.documentElement.clientHeight,
  }

  getnewdatalist = () => {
    // console.log(document.body.offsetHeight - this.state.height - document.documentElement.scrollTop)
    if (document.body.offsetHeight - this.state.height - document.documentElement.scrollTop <= 100) {
      this.setState({
        page: this.state.page + 1
      })
      Axios({
        url: `https://api.juooo.com/Show/Search/getShowList?city_id=0&category=35&keywords=&venue_id=&start_time=&page=${this.state.page}&referer_type=&version=6.0.9&referer=2`
      }).then(res => {
          // console.log(res.data.data.list)
        this.setState({
          showslist: [...this.state.showslist, ...res.data.data.list]
        })
      })
    } else if (this.state.showslist.length === this.state.datatotal) {
      window.removeEventListener('scroll', this.getnewdatalist)
    }
  }

  componentDidMount() {
      window.addEventListener('scroll', this.getnewdatalist);
      this.props.hideTabbar()
  }

  componentWillUnmount(){
    this.props.showTabbar()
  }

  UNSAFE_componentWillMount() {
    Axios.get('https://api.juooo.com/Show/Index/getShowCategoryList?version=6.0.9&referer=2')
    .then(res=>{
      // console.log(res.data.data)
      this.setState({
        navlist:res.data.data
      })
    })
    Axios.get(`https://api.juooo.com/Show/Search/getShowList?city_id=0&category=35&keywords=&venue_id=&start_time=&page=${this.state.page}&referer_type=&version=6.0.9&referer=2`)
    .then(res => {
        // console.log(res.data.data.list)
        this.setState({
          showslist: res.data.data.list,
        })
    })
    window.addEventListener('scroll', this.getnewdatalist);
  }

  render() {
    const childElements = this.state.showslist.map((item,index)=>
      <li className={style.foryoulist} key={index} onClick={()=>{
          this.toDetailClick(item.schedular_id)    
      }}>
          <img src={item.pic} alt=""/>
          <span className={style.city}>{item.city_name}</span>
          <h3>
              {
                  item.method_icon===''?null:
                  <img src={item.method_icon} alt=""/>
              }
              {item.name}
          </h3>
          <p className={style.date}>{item.start_show_time}<i>{item.show_time_bottom}</i></p>
          <p className={style.pic}>¥{item.min_price}<i>起</i></p>
          {
            item.support_desc.map((item,index)=>
              <p key={index} className={style.type}>{item}</p>
            )
          }
    </li>
  );
    return (
      <div>
        <ul>
          <LittleNavbar Lnbname={'演出'}></LittleNavbar>
          <div className={style.showsbar_box}>
            <ul className={style.showsbar_box_left}>
                {
                  this.state.navlist.map((item,index)=>
                      <li key={item.id} onClick={()=>{
                        this.handleclick(item.id,index)
                      }}
                      className={this.state.current===index?style.active:''}
                      >{item.name}</li>
                  )
                }
            </ul>
            <div className={style.choose_city}>
                <span>全国</span>
                <i className="iconfont icon-icon_GPS"></i>
            </div>
          </div>
        </ul>
        
        <Masonry
              className={style.Masonry_box} // default ''
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              imagesLoadedOptions={imagesLoadedOptions} // default {}
          >
              {childElements}
          </Masonry>
      </div>
    )
  }
  handleclick=(id,index)=>{
    // console.log(id)
    this.setState({
        current:index
    })
    Axios.get(`https://api.juooo.com/Show/Search/getShowList?city_id=0&category=${id}&keywords=&venue_id=&start_time=&page=1&referer_type=&version=6.0.9&referer=2`)
    .then(res => {
        // console.log(res.data.data.list)
        this.setState({
          showslist: res.data.data.list,
        })
    })
  }

  toDetailClick = (id) => {
      // console.log(this.props)
      this.props.history.push(`/detail/${id}`)
  }

}

const mapStateToProps=null
const mapDispatchToProps={
  showTabbar,
  hideTabbar
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShowsLibrary))