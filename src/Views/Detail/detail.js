import React, { Component } from 'react'
import { ActionSheet,  Button} from 'antd-mobile';
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
        myid:'',
        clicked: 'none',
        supportList:[],
        trueSupportList:[],
        eticket:false,
        item_list:[]
    }
    
    componentDidMount() {
        this.props.hideTabbar()
        
        var newList=[]
        var list=[]
        if(this.props.detailinfo && this.props.match.params.myid == this.state.myid){
            
          }else{
            
            this.props.getData(this.props.match.params.myid).then(res=>
                    {
                        this.setState({
                            bgUrl:res.payload.static_data.pic,
                            is_real_name_certification:res.payload.static_data.real_name.is_real_name_certification,
                            is_eticket:res.payload.static_data.is_eticket,
                            myid:this.props.match.params.myid,
                            supportList:res.payload.static_data.support.list
                        },()=>{
                            for(var i=0;i<this.state.supportList.length;i++){
                                if(this.state.supportList[i]!=="退票无忧"){
                                   list.push(this.state.supportList[i])
                                   this.setState({
                                     trueSupportList:list
                                   })
                                }else{
                                    this.setState({
                                        eticket:true
                                    })
                                }
                            }
                        })
                        this.props.showTitle(res.payload.share_data.share_title)
                        
                        for(var i=0;i < res.payload.item_list.length;i++){
                            for(var m = 0;m<newList.length;m++){
                                if(res.payload.item_list[i].project_time!==newList[m].project_time){
                                    newList.push(res.payload.item_list[i])
                                    this.setState({
                                        item_list:newList
                                    })
                                }
                            }
                        }
                        
                    }
                )
              }

        }
                
               
    
    

    render() {
        
        const bg = {
            background:`url(${this.state.bgUrl})`
        }
        const detailinfo = this.props.detailinfo
       
        return (
                <div style={{backgroundColor:'#f5f5f5'}}>
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
                            
                    <div>
                        <div className={style.fujia}>
                            {
                              this.state.trueSupportList.map(item=><div key={item} className={style.feituipiao}>
                                <div className={style.duihao}>√</div><p>{item}</p>
                              </div>) 
                            }
                            {
                                this.state.eticket?(<div className={style.tuipiao}>
                                    <div className={style.duihao}>√</div><p>退票无忧</p><div className={style.wenhao} onClick={this.showTuiPiao}>?</div>
                                </div>):null
                            }
                        </div>
                        <div className={style.hengxian}></div>
                        <div className={style.address}>
                            <div className={style.address_left}>
                                <p onClick={this.showActionSheet}>{detailinfo.static_data.show_time_data.show_time_start_display.slice(0,10)} 
                                    {
                                        detailinfo.static_data.show_time_data.show_time_start_display==detailinfo.static_data.show_time_data.show_time_end_display?'':' - ' 
                                    }
                                    {
                                        detailinfo.static_data.show_time_data.show_time_start_display==detailinfo.static_data.show_time_data.show_time_end_display?'':detailinfo.static_data.show_time_data.show_time_end_display.slice(5,10)
                                    }
                                    
                                </p>
                                <h4>
                                    {detailinfo.static_data.city.city_name} | {detailinfo.static_data.venue.venue_name}
                                </h4>
                                <p className={style.adress_info}>{detailinfo.static_data.venue.venue_address}</p>

                            </div>
                            <div className={'iconfont '+style.address_right}>
                                &#xec1a;
                            </div>
                        </div>
                        
                    </div> 
                :null
                }
                <div className={style.vipChengKa} onClick={()=>{this.props.history.push('#')}}>
                            
                    <p>
                        <span className={style.card}>橙PLUS卡</span>开通送￥100 最高省28元
                        <span className={'iconfont '+style.openCardRight}>立即开卡 &#xebc7;</span>
                    </p>
                    
                </div>
                
            </div>
        )
    }
    componentWillUnmount() {
        this.props.showTabbar()
    }
    
    showActionSheet = () => {
        const BUTTONS = [];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: <div>
             {
                 <div>
                    <h4 className={style.date}>选择日期</h4>
                    <ul>
                        {
                            this.state.item_list.map(item=>{
                                return <li>{item.project_time}</li>
                            })
                        }
                    </ul>
                </div>
             }
          </div>,
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps,
        },
        (buttonIndex) => {
         
        });
      }
      showTuiPiao=()=>{
   
        const BUTTONS = ['关闭'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            // title: 'title',
            message: <div>
                {
                    <div>
                        <h4 className={style.date}>退票</h4>
                        <button onClick={()=>{
                            this.setState({ clicked: 1})
                        }}>55</button>
                    </div>
                }
            </div>,
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
        (buttonIndex) => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
        });
      }
}



const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
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
                                