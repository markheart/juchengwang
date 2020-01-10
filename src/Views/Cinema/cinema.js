import React, { Component } from 'react'
import style from './cinema.module.scss'
import { connect } from 'react-redux'
import  {getcinema} from '../../Redux/Actions/cinemalist'
import Cinemaitem from '../../Components/CinemaItem/Cinemaitem'

class Cinema extends Component {
  
  componentDidMount() {
    if(this.props.cinemalist.length===0){
      //当cinemalist,中没有数据的时候,调用action中的函数,请求ajax
      this.props.getcinema()
    }else{
      //如果有什么都不做
      //do nothing
    }
  }
  render() {
    return (
      <div id={style.cinema}>
        <h2 className={style.title}>剧院</h2>
        {this.props.cinemalist.map(item=>
        item.showList.length ? <Cinemaitem data={item} key={item.id}/> : null
        )}
      </div>
    )
  }
}

const mapStateToProp=(state)=>({
  //将cinemareducer中获取到的数据,赋值给cinemalist这个prop中.state就是,整个Reducer处理后的数据
  cinemalist:state.cinemaReducer,

})

const mapReducerToProps={
  // 这个是action获取数据的函数,只要调用就会获取新数据
  getcinema,
}

export default connect(mapStateToProp,mapReducerToProps)(Cinema)