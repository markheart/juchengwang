import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showTabbar,hideTabbar} from '../../../Redux/Actions/login'
import Back from '../../../Components/Back/Back'
import style from './Reg.module.scss'
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
            <input placeholder="请输入邮箱"  type="email" name="email" ref="email" />
            <input placeholder="请输入图中验证码" name="captcha" type="number" ref="captcha" maxLength="4" />
            <img src={`https://api.juooo.com/passport/captcha/index?gid=987987987987234897`} className={style.yazhengma} ref="imgurl"/>
            <button onClick={this.postreg}>下一步</button>
        </div>
      </div>
    )
  }
  postreg=()=>{
    var data =  Qs.stringify({
      email:this.refs.email.value,
      captcha:this.refs.captcha.value,
      gid: "987987987987234897"
		})
    Axios({
    url:"https://api.juooo.com/passport/register/sendEmailRegisterCode?version=6.0.9&referer=2",
    method:'post',
    headers: {
      "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'
  },
    data
  }).then(res=>{
    console.log(res.data)
      if(res.data.code === "200"){
        localStorage.setItem('register_token',res.data.data.register_token)
        this.props.history.push(`/password`)
      }else if(res.data.code === "400"){
        this.failToast(res.data.msg)
      }
    })
  }
  componentWillUnmount(){
    this.props.showTabbar()
  }
  componentDidMount() {
    this.props.hideTabbar()
  }
  
  failToast=(msg)=> {
    Toast.fail(msg, 1.5);
  }
}
const mapStateToProps=null
const mapDispatchToProps={
  showTabbar,
  hideTabbar
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)