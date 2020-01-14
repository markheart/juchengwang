import React, { Component } from 'react'
import { withRouter } from 'react-router'
import style from './home.module.scss'
import Axios from 'axios'
import Masonry from 'react-masonry-component';
import MySwiper from '../../Components/Swiper/HomeSwiper/swiper'
import HotSwiper from '../../Components/Swiper/hotswiper'
import ShowSwiper from '../../Components/Swiper/ShowSwiper/showswiper'
import Navbar from '../../Components/Navbar/navbar'

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Home extends Component {

    state = {
        datalist: [],
        looplist: [],
        navlist: [],
        navlist2: [],
        iconlist: [],
        hotlist: [],
        showlist: [],
        separationlist: [],
        sepfirstlist: [],
        cityname: '',
        page: 1,
        height: document.documentElement.clientHeight,
    }

    getnewdatalist = () => {
        // console.log(document.body.offsetHeight - this.state.height - document.documentElement.scrollTop)
        if (document.body.offsetHeight - this.state.height - document.documentElement.scrollTop <= 100) {
          this.setState({
            page: this.state.page + 1
          })
          Axios({
            url: `https://api.juooo.com/Show/Search/getShowList?city_id=${this.props.match.params.cityid}&category=&keywords=&venue_id=&start_time=&page=${this.state.page}&referer_type=index&version=6.0.9&referer=2`
          }).then(res => {
            //   console.log(res.data)
            this.setState({
              datalist: [...this.state.datalist, ...res.data.data.list]
            })
          })
        } else if (this.state.datalist.length === this.state.datatotal) {
          window.removeEventListener('scroll', this.getnewdatalist)
        }
      }

    componentDidMount() {
        window.addEventListener('scroll', this.getnewdatalist);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.getnewdatalist)
      }

    UNSAFE_componentWillMount() {
        //---------------为你推荐的数据-----------------
        //需要城市绑定功能，所以不可以放在redux中
        Axios.get(`https://api.juooo.com/Show/Search/getShowList?city_id=${this.props.match.params.cityid}&category=&keywords=&venue_id=&start_time=&page=1&referer_type=index&version=6.0.9&referer=2`)
            .then(res => {
                // console.log(res.data.data.list)    
                // console.log(this.props.match.params.cityid) 
                if (this.props.match.params.cityid === '0') {
                    // console.log('quanguo')
                    this.setState({
                        cityname: '全国',
                        datalist: res.data.data.list,
                    })
                } else {
                    this.setState({
                        cityname: res.data.data.list[0].city_name,
                        datalist: res.data.data.list
                    })
                }
                // console.log(this.state.datalist)
            })

        //---------------banner和nav的数据-----------------
        // console.log(this.props.match.params.cityid)
        Axios.get(`https://api.juooo.com/home/index/getClassifyHome?city_id=${this.props.match.params.cityid}&abbreviation=&version=6.0.9&referer=2`)
            .then(res => {
                // console.log(res.data.data.ad_list.float_ad)
                this.setState({
                    looplist: res.data.data.slide_list,
                    navlist: res.data.data.classify_list.slice(0, 5),
                    navlist2: res.data.data.classify_list.slice(5, 10),
                    iconlist: res.data.data.ad_list.float_ad
                })
            })

        //---------------首页热门推荐数据-----------------
        Axios.get(`https://api.juooo.com/home/index/getHotsRecommendList?city_id=${this.props.match.params.cityid}&version=6.0.9&referer=2`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    hotlist: res.data.data.hots_show_list
                })
            })

        //---------------首页热门巡回演出数据-----------------
        Axios.get(`https://api.juooo.com/home/index/getTourRecommendList?version=6.0.9&referer=2`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    showlist: res.data.data.tour_show_list
                })
            })

        //---------------首页分类推荐数据-----------------
        Axios.get(`https://api.juooo.com/home/index/getFloorShow?city_id=${this.props.match.params.cityid}&version=6.0.9&referer=2`)
            .then(res => {
                // console.log(res.data.data)
                if (Object.keys(res.data.data).length === 0) {
                    // console.log('找不到对象')
                    this.setState({
                        sepfirstlist: []
                    })
                } else {
                    this.setState({
                        separationlist: res.data.data,
                        sepfirstlist: res.data.data[0].list
                    })
                }
            })
            window.removeEventListener('scroll', this.getnewdatalist)
    }

    render() {
        const childElements = this.state.datalist.map((item,index) =>
            <li className={style.foryoulist} key={index} onClick={() => {
                this.handleClick(item.schedular_id)
            }}>
                <img src={item.pic} alt="" />
                <span className={style.city}>{item.city_name}</span>
                <h3>
                    {
                        item.method_icon === '' ? null :
                            <img src={item.method_icon} alt="" />
                    }
                    {item.name}
                </h3>
                <p className={style.date}>{item.start_show_time}<i>{item.show_time_bottom}</i></p>
                <p className={style.pic}>¥{item.min_price}<i>起</i></p>
                {
                    item.support_desc.map((item,index)=>
                    <p key={index} className={style.type}>{item}</p>
                    )
                }
            </li>

        );
        return <div>
            <div className={style.home_icon}>
                {
                    this.state.iconlist.map(item=>
                        <img src={item.pic} alt="" key={item.ad_id}/>
                    )
                }
            </div>
            <Navbar myCity={this.state.cityname}></Navbar>
            <div className={style.banner_box}>
                {/* 这里是首页banner */}
                <MySwiper
                    key={this.state.looplist.length}
                    swiperAddClassName={'bannerStyle'}
                    swiperStyle={{
                        bottom: '52px'
                    }}
                >
                    {
                        this.state.looplist.map((item, index) =>
                            <div className="swiper-slide" key={index}><img src={item.image_url} alt="" className={style.banner_img} /></div>
                        )
                    }
                </MySwiper>
            </div>
            {/* 这里是首页金刚区导航 */}
            <ul className={style.nav}>
                {
                    this.state.navlist.map(item =>
                        <li key={item.id} onClick={() => {
                            this.toshowsLibrary(item.category_id)
                        }}>
                            <img src={item.pic} alt="" />
                            <span>{item.name}</span>
                        </li>
                    )
                }
            </ul>
            <ul className={style.nav}>
                {
                    this.state.navlist2.map(item =>
                        <li key={item.id}>
                            <img src={item.pic} alt="" />
                            <span>{item.name}</span>
                        </li>
                    )
                }
            </ul>
            {/* 这里是第一个会员 */}
            <div className={style.Vip1}>
                <i className="iconfont icon-icon_sketch_fill"></i>
                <p>VIP+会员尊享权益</p>
                <div className={style.Vip_cost}>
                    <p>99元/年</p>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
            </div>
            {/* 这里是首页热门推荐 */}
            <div className={style.hot_list}>
                <div className={style.hot_list_title}>
                    <h2>热门演出</h2>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
                <div className={style.hot_list_item}>
                    <HotSwiper key={this.state.hotlist.length} >
                        {
                            this.state.hotlist.map((item, index) =>
                                <div className="swiper-slide" key={index}>
                                    <a href={item.schedular_url}>
                                        <div className={style.swiper_box}>
                                            <div className={style.swiper_box_img}>
                                                <img src={item.pic} alt="" />
                                            </div>
                                            <h3>{item.show_name}</h3>
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                    </HotSwiper>
                </div>
            </div>
            {/* 这里是首页巡回演出 */}
            <div className={style.show_list}>
                <div className={style.show_list_title}>
                    <h2>巡回演出</h2>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
                <div className={style.show_list_item}>
                    <ShowSwiper key={this.state.showlist.length}>
                        {
                            this.state.showlist.map((item, index) =>
                                <div className="swiper-slide" key={index}>
                                    <a href={item.tour_show_url}>
                                        <div className={style.show_box}>
                                            <div className={style.show_box_img}>
                                                <img src={item.pic} alt="" />
                                            </div>
                                            <h3>{item.show_name}</h3>
                                            <p><span>{item.schedular_num}</span>场巡演</p>
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                    </ShowSwiper>
                </div>
            </div>
            {/* 这里是第二个会员 */}
            <div className={style.Vip2}>
                <i className="iconfont icon-icon_sketch_fill"></i>
                <p>VIP+会员尊享权益</p>
                <div className={style.Vip_cost}>
                    <p>99元/年</p>
                    <i className="iconfont icon-icon_next_arrow"></i>
                </div>
            </div>
            {/* 这里是首页分类推荐 */}
            {
                this.state.sepfirstlist.length === 0 ? null :
                    <ul>
                        {
                            this.state.separationlist.map((item, index) =>
                                <li key={item.cat_id} className={style.sep_box}>
                                    <div className={style.sep_title}>
                                        <h2>{item.title}</h2>
                                        <i className="iconfont icon-icon_next_arrow"></i>
                                    </div>
                                    {
                                        this.state.separationlist[index].list.map((item, index) =>
                                            index === 0 ?
                                                <div key={item.sche_id} className={style.sep_first} onClick={()=>{
                                                    this.handleClick(item.sche_id)    
                                                }}>
                                                    <div className={style.img_box}>
                                                        <img src={item.pic} alt="" className={style.img_imp} />
                                                    </div>
                                                    <div className={style.black}></div>
                                                    <img src={item.pic} alt="" className={style.img_bg} />
                                                    <div className={style.sep_font}>
                                                        <div className={style.sep_data}>
                                                            <p>{item.display_show_time}</p>
                                                            <span>{item.week}</span>
                                                        </div>
                                                        <h3>{item.schedular_name}</h3>
                                                        <span>{item.venue_name}</span>
                                                    </div>
                                                </div> : null
                                        )
                                    }
                                    <div className={style.sep_lt_box}>
                                        <HotSwiper key={this.state.separationlist.length}>
                                            {
                                                this.state.separationlist[index].list.map((item, index) =>
                                                    index !== 0 ?
                                                        <div key={item.sche_id} className="swiper-slide"
                                                            onClick={()=>{
                                                                this.handleClick(item.sche_id)    
                                                            }}
                                                        >
                                                            <div className={style.swiper_box}>
                                                                <div className={style.swiper_box_img}>
                                                                    <img src={item.pic} alt="" />
                                                                </div>
                                                                <h3>{item.schedular_name}</h3>
                                                                <p><span>{item.low_price}</span>起</p>
                                                            </div>
                                                        </div>
                                                        : null
                                                )
                                            }
                                        </HotSwiper>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
            }
            <h2 className={style.foryoutitle}>为你推荐</h2>
            <Masonry
                className={style.Masonry_box} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {childElements}
            </Masonry>
            <div className={style.navbarheight}></div>
        </div>;
    }

    handleClick = (id) => {
        // console.log(this.props)
        this.props.history.push(`/detail/${id}`)
    }

    toshowsLibrary = (id) => {
        this.props.history.push(`/showsLibrary`)
    }
}

export default withRouter(Home)