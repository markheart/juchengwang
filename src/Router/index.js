import React from 'react'
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import App from '../App'
import Home from '../Views/Home/home'
import Detail from '../Views/Detail/detail'
import City from '../Views/City/city'
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
          <Route path='/home/:cityid' render={()=>
              <Home></Home>
          }/>
          <Route path='/cinema' component={Cinema}/>
          <Route path='/center' component={MyCenter}/>
          <Route path='/login' component={Login}/>
          <Route path='/city' component={City}/>
          <Route path='/detail/:myid' component={Detail} exact/>
          <Route path='/eticket' render={()=>
            localStorage.getItem('token')?<Eticket/>:<Redirect to='/login'/>
          }/>
          <Redirect from='/*' to='/home/5' exact></Redirect>
          <Redirect to='/error'></Redirect>
        </Switch>
      </App>
    </HashRouter>
  </Provider>
)
export default router;