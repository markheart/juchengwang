import React, { Component } from 'react'
import style from './search.module.scss'
import { withRouter, NavLink } from 'react-router-dom'
import Masonry from 'react-masonry-component';
import Cinemabox from '../../Components/Cinemabox/Cinemabox'

import Axios from 'axios'

class Search extends Component {
  state={
    contentShow:false,
    hotlist:[],
    page: 1
  }
  render() {
    const childElements = this.state.hotlist.map((element,i) =>
    <Cinemabox cinemaelement={element} cinemaindex={i} key={i}/>
   );
    return (
      <div id={style.search} ref="hotlistcontainer" >
       <div className={style.searchbar}><input type="text" placeholder="搜索热门演出" onChange={this.showContent}  ref="searchinfo" /><span><NavLink to="/">取消</NavLink></span></div>
       {this.state.contentShow?
       <div className={style.hotsearch} >
         <h3>热门搜索</h3>
         <ul >
           {this.props.searchdata.map(item=>
           <li className={style.hotlistitem} key={item} ref="hottext" onClick={()=>this.handelClick(item)}>{item}</li>
           )}
         </ul>
       </div>
       :null}
       {this.state.hotlist.length > 0 ?
       <div>
         <h2>为您推荐</h2>
          <Masonry
            className={style.cinemabox}
            elementType={'ul'} // default 'div'
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
          >
            {childElements}
          </Masonry>
        </div> :null
        }
        {/* <input type="search"/> */}
      </div>
    )
  }
  componentDidMount() {
    console.log(this.props.searchdata)
  }
  showContent=()=>{
    //设置input输入,获取列表延迟,防抖....----------
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.gethotlist()
    }, 300)
//-------------------------------------------------
    console.log(this.refs.searchinfo.value)
    this.refs.hotlistcontainer.style.height = document.documentElement.clientHeight + "px"
//aixos请求回数据,等待处理


//判断ul的显示和隐藏,当change事件触发, 则判断开关取反,当开关为true的时候,保持开启
    if(this.state.contentShow){
      return
    }
    this.setState({
      contentShow:!this.state.contentShow
    })
  }
  gethotlist=()=>{
        //input onChange事件,改变input的大小和根据数据信息显示列表
    Axios({
      url:`https://api.juooo.com/Show/Search/getShowList?city_id=&category=&keywords=${this.refs.searchinfo.value}&venue_id=1078,1079,1795&start_time=&page=1&referer_type=&version=6.0.9&referer=2`,
      type:"post"
    }).then(res=>{
      this.setState({
        hotlist:res.data.data.list
      })
      console.log(this.state.hotlist)
    })  
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
      url: `https://api.juooo.com/Show/Search/getShowList?city_id=&category=&keywords=${this.refs.searchinfo.value}&venue_id=1078,1079,1795&start_time=&page=${this.state.page}&referer_type=&version=6.0.9&referer=2`
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

handelClick=(text)=>{
  this.refs.searchinfo.value = text
}
}


export default withRouter(Search)