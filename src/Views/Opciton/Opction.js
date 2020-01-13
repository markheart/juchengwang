import React, { Component } from 'react'
import Axios from 'axios'
import Back from '../../Components/Back/Back'
import style from './Opction.module.scss'
export default class Opction extends Component {
  state={
    userinfo:null
  }
  render() {
    return (
      <div id={style.opction}>
        <div>
         <Back />
        </div>
         {this.state.userinfo?<ul>
           <li>
             <img src={this.state.userinfo.basic_info.photo} />
             <div>
             {this.state.userinfo.basic_info.nick_name}
             </div>
           </li>
           <li onClick={this.logout}>
             退出账号
           </li>
         </ul> : null}
      </div>
    )
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
  logout=()=>{
    localStorage.removeItem("juooo_app_token")
    this.props.history.push('/center')
  }
}
