import React,{Component} from 'react'
import {withRouter} from 'react-router'
import style from './navbar.module.scss'
import Axios from 'axios'

class MyNavbar extends Component{

    state = {
        hotcitylist:[],
        sortedCityList:[]
    }

    componentDidMount() {
        // console.log(this.props)
        Axios.get('https://api.juooo.com/city/city/getSortedCityList?version=6.0.9&referer=2')
        .then(res => {
            // console.log(res.data.data)
            this.setState({
                sortedCityList: res.data.data
            })
        })
    }

    render(){
        return (
            <div>
                <div className={style.navbar}>
                    <div className={style.city} onClick={ this.handleClick }>
                        <i className="iconfont icon-icon_gps_fill"></i>
                        <p>
                            {
                                this.props.myCity
                            }
                        </p>
                    </div>
                    <div className={style.search}>
                        <input type="text" placeholder="搜索热门演出"/>
                    </div>
                    <div className={style.data}>
                        <i className="iconfont icon-icon_calendar"></i>
                    </div>
                </div>
                <div className={style.navbar_box}></div>
            </div>
        )
    }
    handleClick = () => {
        // console.log(this.props)
        this.props.history.push('/city')
    }
}

export default withRouter(MyNavbar)