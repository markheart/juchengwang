import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showTabbar, hideTabbar } from '../../Redux/Actions/login'
import Back from '../../Components/Back/Back'
import style from './login.module.scss'
import Axios from 'axios'
import Qs from 'qs'
class Login extends Component {
  render() {
    return (
      <div id={style.login}>
        <Back />
        <div className={style.loginlogo}>
          <img src="images/login_logo.png" />
        </div>
        <div className={style.logincontent}>
          <input placeholder="请输入手机号/邮箱" type="email" name="user_name" ref="user_name" />
          <input placeholder="请输入密码" name="password" type="password" ref="password" />
          <button onClick={this.postmesage}>登 录</button>
        </div>
        <div className={style.register} onClick={this.toregister}>邮箱注册</div>
      </div>
    )
  }
  postmesage = () => {
    var data = Qs.stringify({
      user_name: this.refs.user_name.value,
      password: this.refs.password.value,
      log_type: 2,
      reg_from: 2,
    })
    Axios({
      url: "https://api.juooo.com/passport/login/index?version=6.0.9&referer=2",
      method: 'post',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data
    }).then(res => {
      console.log(res.data.data.token)
      if (res.data.code === "200") {
        localStorage.setItem('juooo_app_token', res.data.data.token)
        this.props.history.push(`/center/`)
      }
    })
  }
  componentWillUnmount() {
    this.props.showTabbar()
  }
  componentDidMount() {
    this.props.hideTabbar()
  }
  toregister = () => {
    this.props.history.push('/register')
  }
}
const mapStateToProps = null
const mapDispatchToProps = {
  showTabbar,
  hideTabbar
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)