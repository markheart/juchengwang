import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCityList } from '../../Redux/Actions/citylist'
import LittleNavbar from '../../Components/LittleNavbar/littlenavbar'
import style from './city.module.scss'
import Axios from 'axios'
import {showTabbar,hideTabbar} from '../../Redux/Actions/login'

class City extends Component {

        scrollToAnchor = (anchorName) => {
            // console.log('滚动+变红')
            this.setState({
                isRed:false
            })
            if (anchorName) {
                // 找到锚点
                let anchorElement = document.getElementById(anchorName);
                // 如果对应id的锚点存在，就跳转到锚点
                // console.log(anchorElement)
                if(anchorElement) { anchorElement.scrollIntoView({
                    block: 'start', 
                    behavior: 'smooth'
                }); }
            }
        }

        state = {
            sortedCityList: [],
            isRed: true
        }
        
        componentWillMount() {
            this.props.showTabbar()
            if (this.props.datalist.length === 0) {
                this.props.getCityList()
            } else {
                // console.log("缓存")
            }
        }

        componentDidMount() {
            this.props.hideTabbar()
            //---------------所有城市的数据-----------------
            //所有城市数据问题，在redux中存放后获取不了
            Axios.get('https://api.juooo.com/city/city/getSortedCityList?version=6.0.9&referer=2')
                .then(res => {
                    // console.log(res.data.data)
                    this.setState({
                        sortedCityList: res.data.data
                    })
                })
        }

        render() {
            return (
                <div>
                <LittleNavbar Lnbname={'城市选择'}></LittleNavbar>
                <div className={style.city_body}>
                <h2>热门城市</h2>
                <ul className={style.hot_city}>
                    {
                        this.props.datalist.map(item =>
                            <li key={item.id} onClick={() => {
                                this.handleClick(item.id)
                            }}>
                                <span>{item.name}</span>
                            </li>
                        )
                    }
                </ul>
                </div>
                <div className={style.all_city_body}>
                <ol className={style.all_city}>
                        {
                            // 利用遍历对象的方法对数据进行key、value值的获取
                            Object.keys(this.state.sortedCityList).map((key, value) => (
                                <li id={key} key={key}>
                                    <h2>{key}</h2>
                                    {
                                        this.state.sortedCityList[key].list.map(item =>
                                            <span key={item.id} onClick={() => {
                                                this.handleClick(item.id)
                                            }}
                                            >{item.name}</span>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ol>
                    </div>
                    <div className={style.city_nav}>
                        {
                                // 利用遍历对象的方法对数据进行key、value值的获取
                                Object.keys(this.state.sortedCityList).map((key, value) => (
                                   <div key={key}>
                                        <a  onClick={()=>
                                            this.scrollToAnchor(key)
                                        }
                                        style={{color:this.state.isRed?'#6f6f6f':'red'}}
                                       >{key}</a>
                                   </div>
                                ))
                        }
                    </div>
                </div>
            )
        }


        handleClick = (id) => {
            this.props.history.push(`/home/${id}`)
        }
    }


    const mapStateToProps = (state) => ({
        datalist: state.CitylistReducer
    })
    const mapDispatchToProps = {
        getCityList,
        showTabbar,
        hideTabbar
    }

    export default connect(mapStateToProps, mapDispatchToProps)(City)
