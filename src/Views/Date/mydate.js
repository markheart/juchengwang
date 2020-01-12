import React, { Component } from 'react'
import Calendar from 'rc-calendar'

class MyDate extends Component {

    render(){
        return <div>
            date页面
            <Calendar
                showDateInput={true}
            ></Calendar>
        </div>
    }

}

export default MyDate