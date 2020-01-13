import React, { Component } from 'react'

import {connect} from 'react-redux'
import {showTabbar,hideTabbar} from '../../Redux/Actions/login'
import {showTitle} from '../../Redux/Actions/showTitle'
import style from './detail.module.scss'
import DetailHead from './Detail_head/detailHead'
import {getData} from '../../Redux/Actions/getData'

class Detail extends Component {  
   
    state={
        bgUrl:'',
        is_real_name_certification:1,
        is_eticket:0,
        myid:''
    }
    componentDidMount() {
        this.props.hideTabbar()
        
        
        if(this.props.detailinfo && this.props.match.params.myid == this.state.myid){
            console.log('缓存')
          }else{
            
            this.props.getData(this.props.match.params.myid).then(res=>
                
                this.setState({
                    bgUrl:res.payload.static_data.pic,
                    is_real_name_certification:res.payload.static_data.real_name.is_real_name_certification,
                    is_eticket:res.payload.static_data.is_eticket,
                    myid:this.props.match.params.myid
                })
            )
          }
    }
    
    

    render() {
        
        const bg = {
            background:`url(${this.state.bgUrl})`
        }
        const detailinfo = this.props.detailinfo
       
        return (
                <div>
                    <div id={style.detail_head} >
                    <div className={style.bg} style={bg}></div>
                    <div className={style.head_content}>
                        <DetailHead/>
                        {
                            detailinfo?
                            <div className={style.imgTitle}>
                                <div className={style.img}>
                                    <img src={detailinfo.static_data.pic} alt='详情图片' className={style.bigImg}/>
                                    <img src='./juooo.f698448.png' className={style.smallImg}/>
                                </div>
                                
                                <div className={style.right}>
                                    <p>{detailinfo.static_data.show_name}</p>
                                {
                                    this.state.is_real_name_certification=== 1 ?
                                    <div className={'iconfont '+style.realName}>&#xeb94;实名认证</div> : null 
                                }
                                {
                                    this.state.is_eticket === 1?
                                    <div className={style.eticket}>退票险</div>:null
                                }
                                    <h4>￥{detailinfo.static_data.price_range}</h4>
                                </div>
                            
                            </div>
                            :null
                        }
                        
                    </div>
                    
                </div>
                {detailinfo?
                            
                    <div>{detailinfo.static_data.show_time_data.show_time_start_display.slice(0,10)}</div> 
                :null
                }
            </div>
        )
    }
    componentWillUnmount() {
        this.props.showTabbar()
    }
    
}

const mapStateToProps=(data)=>{
    return{
        detailinfo:data.DetailReducer
    }
}
const mapDispatchToProps={
  showTabbar,
  hideTabbar,
  showTitle,
  getData
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail)