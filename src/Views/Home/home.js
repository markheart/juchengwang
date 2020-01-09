import React,{Component} from 'react'
import {withRouter} from 'react-router'
import style from './home.module.scss'
import Axios from 'axios'
import MySwiper from '../../Components/Swiper/swiper'
import HotSwiper from '../../Components/Swiper/hotswiper'
import ShowSwiper from '../../Components/Swiper/showswiper'
import Navbar from '../../Components/Navbar/navbar'

class Home extends Component {

    state = {
        datalist:[],
        looplist:[],
        navlist:[],
        hotlist:[],
        showlist:[],
        cityname:''
    }

    componentDidMount() {

    }
    
    componentWillMount(){
        //---------------热门推荐的数据-----------------
        //需要城市绑定功能，所以不可以放在redux中
        Axios.get(`https://api.juooo.com/Show/Search/getShowList?city_id=${this.props.match.params.cityid}&category=&keywords=&venue_id=&start_time=&page=1&referer_type=index&version=6.0.9&referer=2`)
        .then(res=>{
            // console.log(res.data.data.list[0].city_name)     
            this.setState({
                datalist: res.data.data.list,
                cityname: res.data.data.list[0].city_name
            })
            // console.log(this.state.datalist)
        })

        //---------------banner和nav的数据-----------------
        // console.log(this.props.match.params.cityid)
        Axios.get(`https://api.juooo.com/home/index/getClassifyHome?city_id=${this.props.match.params.cityid}&abbreviation=&version=6.0.9&referer=2`)
        .then(res=>{
            // console.log(res.data.data.classify_list)
            this.setState({
                looplist:res.data.data.slide_list,
                navlist:res.data.data.classify_list
            })
        })

        //---------------首页热门推荐数据-----------------
        Axios.get(`https://api.juooo.com/home/index/getHotsRecommendList?city_id=${this.props.match.params.cityid}&version=6.0.9&referer=2`)
        .then(res=>{
            // console.log(res.data)
            this.setState({
                hotlist:res.data.data.hots_show_list
            })
        })
        
        //---------------首页热门巡回演出数据-----------------
        Axios.get(`https://api.juooo.com/home/index/getTourRecommendList?version=6.0.9&referer=2`)
        .then(res=>{
            // console.log(res.data)
            this.setState({
                showlist:res.data.data.tour_show_list
            })
        })

    }

    render() {
        return <div>
            <Navbar myCity={this.state.cityname}></Navbar>
            <div className={style.banner_box}>
                <MySwiper key={this.state.looplist.length}>
                    {
                        this.state.looplist.map((item,index)=>
                            <div className="swiper-slide" key={index}><img src={item.image_url} alt="" className={style.banner_img}/></div>
                        )
                    }
                </MySwiper>
            </div>
            <ul className={style.nav}>
                {
                    this.state.navlist.map(item=>
                        <li key={item.id}>
                            <img src={item.pic} alt=""/>
                            <span>{item.name}</span>
                        </li>
                    )
                }
            </ul>
            <div className={style.Vip1}>
                <i className="iconfont icon-icon_sketch_fill"></i>
                <p>VIP+会员尊享权益</p>
                <div className={style.Vip_cost}>
                    <p>99元/年</p>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
            </div>
            <div className={style.hot_list}>
                <div className={style.hot_list_title}>
                    <h2>热门演出</h2>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
                <div className={style.hot_list_item}>
                    <HotSwiper key={this.state.hotlist.length} >
                        {
                            this.state.hotlist.map((item,index)=>
                                <div className="swiper-slide" key={index}>
                                    <div className={style.swiper_box}>
                                        <div className={style.swiper_box_img}>
                                            <img src={item.pic} alt=""/>
                                        </div>
                                        <h3>{item.show_name}</h3>
                                    </div>
                                </div>
                            )
                        }
                    </HotSwiper>
                </div>
            </div>
            <div className={style.show_list}>
                <div className={style.show_list_title}>
                    <h2>巡回演出</h2>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
                <div className={style.show_list_item}>
                    <ShowSwiper key={this.state.showlist.length}>
                        {
                          this.state.showlist.map((item,index)=>
                            <div className="swiper-slide" key={index}>
                                <img src={item.pic} alt=""/>
                                <h3>{item.show_name}</h3>
                                <p><span>{item.schedular_num}</span>场巡演</p>
                            </div>
                          )
                        }
                    </ShowSwiper>
                </div>
            </div>
            <ul>
                {
                    // console.log(this.props)
                    this.state.datalist.map(item=>
                        <li key={item.schedular_id} onClick={()=>{
                            this.handleClick(item.schedular_id)
                        }}>
                            <p>{item.name}</p>
                            <img src={item.pic} alt="" className={style.item_img}/>
                        </li>
                    )
                }
            </ul>
        </div>;
    }

    handleClick = (id) => {
        // console.log(this.props)
        this.props.history.push(`/detail/${id}`)
    }
}

export default withRouter(Home)