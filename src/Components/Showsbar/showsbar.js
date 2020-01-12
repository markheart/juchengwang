import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Axios from 'axios'
import style from './showsbar.module.scss'

class ShowsBar extends Component {
  state = {
    navlist:[],
    showsIds:''
  }

  componentWillMount(){
    // console.log(this.props.onMyEvent)
    // console.log(this.props)
    Axios.get('https://api.juooo.com/Show/Index/getShowCategoryList?version=6.0.9&referer=2')
    .then(res=>{
      // console.log(res.data.data)
      this.setState({
        navlist:res.data.data
      })
    })
  }

  render() {
    return (
      <div>
          <div className={style.showsbar_box}>
            <ul className={style.showsbar_box_left}>
                {
                this.state.navlist.map(item=>
                    <li key={item.id} onClick={()=>{
                      this.props.onMyEvent(item.id)
                    }}>{item.name}</li>
                )
                }
            </ul>
            <div className={style.choose_city}>
                <i className="iconfont icon-icon_GPS"></i>
                <span>全国</span>
            </div>
          </div>
      </div>
    )
  }
  handleclick=(id)=>{
    // console.log(id)
    this.setState({
      showsIds:id
    })
  }
}

export default withRouter(ShowsBar)