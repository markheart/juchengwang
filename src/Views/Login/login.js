import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showTabbar,hideTabbar} from '../../Redux/Actions/login'
class Login extends Component {
  render() {
    return (
      <div>
        login
      </div>
    )
  }
  componentWillUnmount(){
    this.props.showTabbar()
  }
  componentDidMount() {
    this.props.hideTabbar()
  }
  
}
const mapStateToProps=null
const mapDispatchToProps={
  showTabbar,
  hideTabbar
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)