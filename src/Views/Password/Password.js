import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showTabbar,hideTabbar} from '../../Redux/Actions/login'
import Back from '../../Components/Back/Back'
import style from './Password.module.scss'
import Axios from 'axios'
import Qs from 'qs'
import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'

class Register extends Component {
  render() {
    return (
      <div id={style.login}>
        <Back />
        <div className={style.loginlogo}>
          <img src="images/login_logo.png" />
        </div>
        <div className={style.logincontent}>
            <input placeholder="请设置6-16位(数字+字母)"  type="password" name="password" ref="password" />
            <input placeholder="请输入验证码" name="email_code" type="number" ref="email_code" />
            <button onClick={this.postreg}>下一步</button>
        </div>
      </div>
    )
  }
  postreg=()=>{
    var data =  Qs.stringify({
      reg_from: 2,
      password:this.refs.password.value,
      confirm_password: this.refs.password.value,
      register_token:localStorage.getItem("register_token"),
      email_code: this.refs.email_code.value,
		})
    Axios({
    url:"https://api.juooo.com/passport/register/email?version=6.0.9&referer=2",
    method:'post',
    headers: {
      "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8',
  },
    data
  }).then(res=>{
    console.log(res.data)
      if(res.data.code === "200"){
        localStorage.setItem('juooo_app_token',res.data.data.token)
        this.successToast()
        this.props.history.push(`/center`)
      }else if(res.data.code === "400"){
        this.failToast(res.data.msg)
      }
    })
  }
//登录成功弹框
successToast=()=> {
  Toast.success("注册成功", 1);
}
//登录失败弹框
failToast=(msg)=> {
  Toast.fail(msg, 1);
}

  componentWillUnmount(){
    this.props.showTabbar()
  }
  componentDidMount() {
    this.props.hideTabbar()
  }
  
}
const mapStateToProps=null
const mapDispatchToProps={
  showTabbar,
  hideTabbar
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)