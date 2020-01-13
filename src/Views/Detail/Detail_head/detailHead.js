import React, { Component } from 'react'
import style from './detailHead.module.scss'
import {withRouter} from 'react-router'
import { Modal} from 'antd-mobile';

const alert = Modal.alert;
class DetailHead extends Component {
  render() {
    return (
      <div id={style.top}>
        <div>
          <span className={'iconfont '+style.back} onClick={this.handleBack}>&#xebc6;</span>
          <span className={style.play}>演出详情</span>
          <div className ={style.right}> 
            <span className={'iconfont '+style.share} onClick={this.handleShare}>&#xebc4;</span>
            <span className={'iconfont '+style.to_home} onClick={this.handlePush}>&#xeb98;</span>
          </div>
        </div>
     </div>
    )
  }
 
  handleBack=()=>{
    window.history.go(-1)
  }
  handleShare=()=>{
    alert('使用浏览器的分享功能', <div style={{fontSize:'18px',color:'black'}}>把演出分享出去</div>, [
      { text: '我知道了', onPress: () => console.log('我知道了') },
      
    ])
  }
  handlePush=()=>{
    this.props.history.push('/home')
  }
}
export default withRouter(DetailHead)