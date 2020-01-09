import React,{Component} from 'react'
import {withRouter} from 'react-router'
import style from './home.module.scss'
import Axios from 'axios'
import MySwiper from '../../Components/Swiper/swiper'
import Navbar from '../../Components/Navbar/navbar'

class Home extends Component {

    state = {
        datalist:[],
        looplist:[],
        navlist:[],
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
        Axios.get(`https://api.juooo.com/home/index/getClassifyHome?city_id=${this.props.match.params.cityid}&abbreviation=BJ&version=6.0.9&referer=2`)
        .then(res=>{
            // console.log(res.data.data.slide_list)
            this.setState({
                looplist:res.data.data.slide_list,
                navlist:res.data.data.classify_list
            })
        })
    }

    render() {
        return <div>
            <Navbar myCity={this.state.cityname}></Navbar>
            <MySwiper key={this.state.looplist.length} homeSwiper={
                {
                    loop:true,
                    autoplay:true,
                }
            }>
                {
                    this.state.looplist.map((item,index)=>
                        <div className="swiper-slide" key={index}><img src={item.image_url} alt="" className={style.banner_img}/></div>
                    )
                }
            </MySwiper>
            <ul>
                {
                    this.state.navlist.map(item=>
                        <li key={item.id}>
                            <img src={item.pic} alt=""/>
                            <span>{item.name}</span>
                        </li>
                    )
                }
            </ul>
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
        console.log(this.props)
        this.props.history.push(`/detail/${id}`)
    }
}

export default withRouter(Home)