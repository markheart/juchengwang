import React, { Component } from 'react'
import Axios from 'axios'

class Detail extends Component {  
   
    state = {
        detailinfo:null
    }

    componentDidMount() {
        // console.log(this.props.match.params.myid)
        Axios.get(`https://api.juooo.com/Schedule/Schedule/getScheduleInfo?schedular_id=${this.props.match.params.myid}&version=6.0.9&referer=2`)
        .then(res=>{
            console.log(res.data.data.static_data)
            this.setState({
                detailinfo: res.data.data.static_data
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.detailinfo?
                    <div>
                        <h3>{this.state.detailinfo.show_name}</h3>
                        <img src={this.state.detailinfo.pic}/>
                    </div>
                    :null
                }
            </div>
        )
    }
}


export default Detail