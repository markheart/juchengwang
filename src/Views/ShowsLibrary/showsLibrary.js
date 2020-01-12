import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ShowsBar from '../../Components/Showsbar/showsbar'
import LittleNavbar from '../../Components/LittleNavbar/littlenavbar'
import Axios from 'axios'
import Masonry from 'react-masonry-component';
import style from './showsLibrary.module.scss'

const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class ShowsLibrary extends Component {
  state = {
    showslist: [],
    showbar:''
  }

  componentWillMount() {
    console.log(this.state.showbar)

  }

  render() {
    const childElements = this.state.showslist.map(item=>
      <li className={style.foryoulist} key={item.schedular_id} onClick={()=>{
          this.handleClick(item.schedular_id)    
      }}>
          <img src={item.pic} alt=""/>
          <span>{item.city_name}</span>
          <p>
              {
                  item.method_icon===''?null:
                  <img src={item.method_icon} alt=""/>
              }
              {item.name}
          </p>
      </li>
  );
    return (
      <div>
        <ul>
          <LittleNavbar Lnbname={'演出'}></LittleNavbar>
          <ShowsBar onMyEvent={(data)=>{
            //console.log('子组件中定义的',data)  
            this.setState({
              showbar: data
            })
            Axios.get(`https://api.juooo.com/Show/Search/getShowList?city_id=0&category=${this.state.showbar}&keywords=&venue_id=&start_time=&page=1&referer_type=&version=6.0.9&referer=2`)
            .then(res => {
                console.log(res.data.data.list)
                this.setState({
                  showslist: res.data.data.list,
                })
            })
            // console.log(this.state.showbar)
          }}></ShowsBar>
        </ul>
        
        <Masonry
              className={style.Masonry_box} // default ''
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              imagesLoadedOptions={imagesLoadedOptions} // default {}
          >
              {childElements}
          </Masonry>
      </div>
    )
  }
}

export default withRouter(ShowsLibrary)