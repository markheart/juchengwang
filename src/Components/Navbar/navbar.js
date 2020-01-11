import React,{Component} from 'react'
import {withRouter} from 'react-router'
import style from './navbar.module.scss'
import Axios from 'axios'

class MyNavbar extends Component{

    state = {
        hotcitylist:[],
        sortedCityList:[],
        allcity:[]
    }

    componentDidMount() {
        // console.log(this.props.match.params.cityid)
        Axios.get('https://api.juooo.com/city/city/getSortedCityList?version=6.0.9&referer=2')
        .then(res => {
            // console.log(res.data.data)
            this.setState({
                sortedCityList: res.data.data,
                allcity: this.props.myCity
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
                        <input type="text" className="iconfont" placeholder="&#xebda;  搜索热门演出"/>
                    </div>
                    <div className={style.date}>
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