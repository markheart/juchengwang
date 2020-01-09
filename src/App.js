import React,{Component} from 'react';
import Tabbar from './Components/Tabbar/tabbar'
import {connect} from 'react-redux'

class App extends Component{
  
  render(){
    return <div>
      <title>{this.props.showTitle}</title>
      {
        this.props.isShow?<Tabbar/>:null
      }
      {/* 一级路由 */}
      {this.props.children}
      {/* 路由容器 */}
    </div>
  }
 
}
const mapStateToProps = (state)=>{
  return{
    isShow:state.tabbarReducer,
    showTitle:state.pageTitleReducer
  }
}
export default connect(mapStateToProps)(App);
