import React from 'react'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
  
} from 'react-router-dom'
import App from '../App'
import Home from '../Views/Index/home'
import Cinema from '../Views/Cinema/cinema'
import MyCenter from '../Views/MyCenter/mycenter'
import Login from '../Views/Login/login'
import Eticket from '../Views/Eticket/eticket'
import {Provider} from 'react-redux'
import Store from '../Redux/store'
const router = (
  <Provider store={Store}>
    <HashRouter>
      <App>
        <Switch>
          <Route path='/home' render={()=>
              <Home></Home>
          }/>
          <Route path='/cinema' component={Cinema}/>
          <Route path='/center' component={MyCenter}/>
          <Route path='/login' component={Login}/>
          <Route path='/eticket' render={()=>
            localStorage.getItem('token')?<Eticket/>:<Redirect to='/login'/>
          }/>
          {/* <Route path='/detail/:myid' component={Detail} exact/> */}
          <Redirect from='/' to='/home' exact></Redirect>
            <Redirect to='/error'></Redirect>

        </Switch>
      </App>
    </HashRouter>
  </Provider>
)
export default router;