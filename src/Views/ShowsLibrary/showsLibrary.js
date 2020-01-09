import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    Route,
    Switch
} from 'react-router-dom'
import Shows from './Shows/shows'
import Axios from 'axios'

class ShowsLibrary extends Component {
  state = {
    navlist:[]
  }

  componentWillMount(){
    // console.log(this.props)
    Axios.get('https://api.juooo.com/Show/Index/getShowCategoryList?version=6.0.9&referer=2')
    .then(res=>{
      // console.log(res.data)
      this.setState({
        navlist:res.data.data
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <ul>
            {
              this.state.navlist.map(item=>
                <li key={item.id}>{item.name}</li>
              )
            }
          </ul>
        </div>
        <Switch>
          <Route path="/showsLibrary/shows" component={Shows} exact/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(ShowsLibrary)