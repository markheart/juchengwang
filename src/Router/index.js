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
import MyDate from '../Views/Date/mydate'
import ShowsLibrary from '../Views/ShowsLibrary/showsLibrary'
import Cinema from '../Views/Cinema/cinema'
import MyCenter from '../Views/MyCenter/mycenter'
import Login from '../Views/Login/login'
import Eticket from '../Views/Eticket/eticket'
import {Provider} from 'react-redux'
import Store from '../Redux/store'
import CinemaList from '../Views/CinemaList/CinemaList'
const router = (
  <Provider store={Store}>
    <HashRouter>
      <App>
        <Switch>
          <Route path='/home/:cityid' render={()=>
              <Home></Home>
          }/>
          <Route path='/showsLibrary' render={()=>
              <ShowsLibrary></ShowsLibrary>
          } exact/>
          <Route path='/cinema' component={Cinema}/>
          <Route path='/center' component={MyCenter}/>
          <Route path='/login' component={Login}/>
          <Route path='/city' component={City}/>
          <Route path='/date' component={MyDate}/>
          <Route path='/cinemalist/:cinemaid' component={CinemaList} exact/>
          <Route path='/detail/:myid' component={Detail} exact/>
          <Route path='/eticket' render={()=>
            localStorage.getItem('token')?<Eticket/>:<Redirect to='/login'/>
          }/>
          <Redirect from='/*' to='/home/0' exact></Redirect>
          <Redirect to='/error'></Redirect>
        </Switch>
      </App>
    </HashRouter>
  </Provider>
)
export default router;