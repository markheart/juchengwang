import React,{Component} from 'react'
import {withRouter} from 'react-router'
import style from './littlenavbar.module.scss'
import { connect } from 'react-redux'
import { showTabbar, hideTabbar } from '../../Redux/Actions/login'

class LittleNavbar extends Component{

    componentDidMount() {
        // console.log(this.props.Lnbname)
    }
    

    render(){
        return <div>
            <div className={style.LittleNavbar_height}></div>
            <div className={style.LittleNavbar_box}>
                <i className="iconfont icon-icon_left" onClick={()=>{
                    // console.log()
                    this.props.history.go(-1)
    
                }}></i>
                <h2>
                    {this.props.Lnbname }
                </h2>
            </div>
        </div>
    }

}

export default withRouter(LittleNavbar)