import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showTabbar, hideTabbar } from '../../Redux/Actions/login'
import Back from '../../Components/Back/Back'
import style from './PhoneCode.module.scss'
import Axios from 'axios'
import Qs from 'qs'
import { withRouter } from 'react-router-dom'
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
          <h3>验证码</h3>
          <p>已将验证码发送至手机号为<span>{this.props.match.params.phonenumber}</span></p>
          {/* <input placeholder="请输入验证码" name="sms_code" type="number" ref="sms_code" /> */}
          <div className={style.codebox}>
            <input type="tel" maxLength="1" className="code" onInput={this.changecode} />
            <input type="tel" maxLength="1" className="code" onInput={this.changecode} />
            <input type="tel" maxLength="1" className="code" onInput={this.changecode} />
            <input type="tel" maxLength="1" className="code" onInput={this.changecode} />
          </div>
          {/* <button onClick={this.postreg}>下一步</button> */}
        </div>
      </div>
    )
  }


  changecode = () => {
    let element = document.getElementsByClassName('code')
    var array = []
    for(let i=0;i<element.length;i++){
      if(element[i].value && i<element.length ){
        array.push(element[i].value)
        if (i < element.length - 1) {
          element[i + 1].focus()
        } else {
          //Do Nothing
        }
      } else {
        //Do Nothing
      }
    }
    if(array.length === 4){
      let str = array.join("")
      this.postreg(str)
    }
  }



  postreg = (codearray) => {
    var data = Qs.stringify({
      log_type: 1,
      reg_from: 2,
      mobile: this.props.match.params.phonenumber,
      sms_code: codearray,
    })
    Axios({
    url:"https://api.juooo.com/passport/login/index?version=6.1.1&referer=2",
    method:'post',
    headers: {
      "Content-Type":'application/x-www-form-urlencoded; charset=UTF-8',
  },
    data
  }).then(res=>{
      if(res.data.code === "200"){
        localStorage.setItem('juooo_app_token',res.data.data.token)
        this.successToast()
        this.props.history.push(`/center`)
      } else if (res.data.code === "400") {
        this.failToast(res.data.msg)
      }
    })
  }

  //登录成功弹框
  successToast = (msg) => {
    Toast.success("登录成功", 1);
  }
  //登录失败弹框
  failToast = (msg) => {
    Toast.fail(msg, 1);
    console.log(msg)
  }


  componentWillUnmount() {
    this.props.showTabbar()
  }
  componentDidMount() {
    this.props.hideTabbar()
  }

}
const mapStateToProps = null
const mapDispatchToProps = {
  showTabbar,
  hideTabbar
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))