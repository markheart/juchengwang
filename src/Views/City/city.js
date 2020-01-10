import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCityList } from '../../Redux/Actions/citylist'
import Axios from 'axios'

class City extends Component {


        state = {
            sortedCityList: []
        }

        componentWillMount() {
            if (this.props.datalist.length === 0) {
                this.props.getCityList()
            } else {
                // console.log("缓存")
            }
        }

        componentDidMount() {
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
                    hotcity
                <ul>
                        {
                            this.props.datalist.map(item =>
                                <li key={item.id} style={{ float: "left" }} onClick={() => {
                                    this.handleClick(item.id)
                                }}>
                                    <span>{item.name}</span>
                                </li>
                            )
                        }
                    </ul>
                    sortedcity
                <ol>
                        {
                            // 利用遍历对象的方法对数据进行key、value值的获取
                            Object.keys(this.state.sortedCityList).map((key, value) => (
                                <li key={key}>
                                    {key}
                                    {
                                        this.state.sortedCityList[key].list.map(item =>
                                            <span key={item.id} onClick={() => {
                                                this.handleClick(item.id)
                                            }}>{item.name}</span>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ol>
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
        getCityList
    }

    export default connect(mapStateToProps, mapDispatchToProps)(City)