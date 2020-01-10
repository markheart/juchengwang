import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {showTabbar,hideTabbar} from '../../Redux/Actions/login'
import {showTitle} from '../../Redux/Actions/showTitle'
import style from './detail.module.scss'
import DetailHead from './Detail_head/detailHead'


class Detail extends Component {  
   
    state = {
        detailinfo:null
    }

    componentDidMount() {
        
        
        this.props.hideTabbar()
        // console.log(this.props.match.params.myid)
        Axios.get(`https://api.juooo.com/Schedule/Schedule/getScheduleInfo?schedular_id=${this.props.match.params.myid}&version=6.0.9&referer=2`)
        .then(res=>{
            console.log(res.data.data.static_data)
            this.props.showTitle(res.data.data.static_data.show_name)
            this.setState({
                detailinfo: res.data.data.static_data
                
            })
        })
    }

    render() {
        return (
            <div id={style.detail_head} >
                <div className={style.bg}></div>
                <div className={style.head_content}>
                    <DetailHead/>
                    {
                        this.state.detailinfo?
                        <div>
                            <h3>{this.state.detailinfo.show_name}</h3>
                            <img src={this.state.detailinfo.pic} alt='详情图片'/>
                        </div>
                        :null
                    }
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        this.props.showTabbar()
    }
    
}

const mapStateToProps=null
const mapDispatchToProps={
  showTabbar,
  hideTabbar,
  showTitle
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail)