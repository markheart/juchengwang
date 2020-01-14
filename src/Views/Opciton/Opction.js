import React, { Component } from 'react'
import Axios from 'axios'
import Back from '../../Components/Back/Back'
import style from './Opction.module.scss'
import { withRouter } from 'react-router-dom'
class Opction extends Component {
  state={
    userinfo:null
  }
  render() {
    return (
      <div id={style.opction}>
        <div className={style.opctioncontent}>
          <div className={style.opctiontop}>
            <Back />
          </div>
        </div>
         {this.state.userinfo?<ul className={style.opctioninfo}>
           <li>
             <img src={this.state.userinfo.basic_info.photo} />
             <div>
              <p>{this.state.userinfo.basic_info.nick_name}</p>
              <p>用户ID:{this.state.userinfo.basic_info.uid}</p>
             </div>
           </li>
           <li onClick={this.logout} className={style.logouttext}>
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

export default withRouter(Opction)