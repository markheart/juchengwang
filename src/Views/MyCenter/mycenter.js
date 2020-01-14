import React, { Component } from 'react'
import Axios from 'axios'
import style from './mycenter.module.scss'
import { connect } from 'react-redux'

class MyCenter extends Component {
  state={
    userinfo:null,
    infolist:[]
  }
  render() {
    return (
      <div id={style.mycenter}>
        <div className={style.info}>
          <div className={style.top}>
              <span className={"iconfont icon-icon_setting" + " " + style.opction} onClick={this.toopciton}></span>
          </div>
              <ul className={style.infocontent}>
                <li>
                  {this.state.userinfo?<img src={this.state.userinfo.basic_info.photo?this.state.userinfo.basic_info.photo:"https://m.juooo.com/static/img/logo-user.8413cbf.png"} />:null}
                </li>
                <li className={style.userid}>
                  <h4>
    {this.state.userinfo?<div>{this.state.userinfo.is_login?this.state.userinfo.basic_info.email||this.state.userinfo.basic_info.nick_name:<div onClick={this.register}>登录/注册</div>}</div>:null}
                  </h4>
                  <div>
    {this.state.userinfo?<p>{this.state.userinfo.is_login?("ID:" + this.state.userinfo.basic_info.uid):<span onClick={this.register}>请点击登录 > </span>}</p>:null}
                  </div>
                </li>
                {this.state.userinfo?<li className={style.vip_info} style={localStorage.getItem("juooo_app_token")?{background:"linear-gradient(-45deg, #f5dea9, #f8d583)"}:{backgroundColor:"#F5F5F5",color:"#b3b3b3"}}>
                  {this.state.userinfo.vip_info[0].vip_state?"高级会员":"普通会员"}
                </li>:null}
                <li>
                {this.state.userinfo?
              <ul className={style.user_money}>
                <li onClick={this.loginpage}>
                  <p>{this.state.userinfo.basic_info.user_money}</p>
                  <h4>账户余额</h4>
                </li>
                <li>
                  <p>{this.state.userinfo.basic_info.scores}</p>
                  <h4>积分</h4>
                </li>
                <li>
                  <p>{this.state.userinfo.coupon_info.total}</p>
                  <h4>优惠券</h4>
                </li>
                <li>
                  <p>立即开通</p>
                  <h4>橙PLUS卡</h4>
                </li>
              </ul>:null
              }
                </li>
              </ul>
          <img src="https://m.juooo.com/static/img/ad.411f5e6.png" className={style.buyvip}/>
          <div className={style.listone}>
          </div>
        </div>
      </div>
    )
  }
  register=()=>{
    let token=localStorage.getItem("juooo_app_token")
    if(token){
      //Do Nothing
    }else{
      this.props.history.push(`/login/`)
    }
  }
  loginpage=()=>{
    let token=localStorage.getItem("juooo_app_token")
    if(token){
      //Do Nothing
    }else{
      this.props.history.push(`/login/`)
    }
  }
  toopciton=()=>{
    let mytoken=localStorage.getItem("juooo_app_token")
    if(mytoken){
      this.props.history.push('/opction')
    }else{
      this.props.history.push('/login')
    }
  }
  componentDidMount() {
    let mytoken=localStorage.getItem("juooo_app_token")
    Axios({
      url:"https://api.juooo.com/user/account/basicInfo?version=6.0.9&referer=2",
      headers:{
        AUTHORIZATION:mytoken
      }
    }).then(res=>{
      this.setState({
        userinfo:res.data.data
      })
    })
  }
}



export default connect()(MyCenter)