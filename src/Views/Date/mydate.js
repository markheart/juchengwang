import React, { Component } from 'react';
import style from './mydate.module.scss'
import LittleNavbar from '../../Components/LittleNavbar/littlenavbar'
import Axios from 'axios'
import { withRouter } from 'react-router'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navlist: [],
            datelist: [],
            currentDay: '',
            currentMonth: '',
            currentYear: '',
            weekList: [
                { name: '一', className: '' },
                { name: '二', className: '' },
                { name: '三', className: '' },
                { name: '四', className: '' },
                { name: '五', className: '' },
                { name: '六', className: '' },
                { name: '日', className: '' }
            ],
            dayList: [],
            current: 0,
            navId: 35,
            datecurrent: '',
            dataNewStr: ''
        }
        this.initCalendar = this.initCalendar.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.preMonth = this.preMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
    }

    componentDidMount() {
        this.initCalendar()
        Axios.get('https://api.juooo.com/Show/Index/getShowCategoryList?version=6.0.9&referer=2')
            .then(res => {
                // console.log(res.data.data)
                this.setState({
                    navlist: res.data.data
                })
            })
        Axios.get(`https://api.juooo.com/Show/Search/getShowList?category=${this.state.navId}&city_id=0&start_time=${this.state.dataNewStr}&page=1&version=6.1.1&referer=1`)
            .then(res => {
                // console.log(res.data.data.list)
                this.setState({
                    datelist: res.data.data.list
                })
            })
    }


    // 获取当前date的当月第一天的字符串形式
    getMonthFirstDate(date) {
        let nowYear = date.getFullYear(); // 获取年份
        let nowMonth = date.getMonth() + 1; // 获取月份
        return `${nowYear}-${nowMonth}-01`
    }

    // 获取当前date的字符串形式
    getDateString(date) {
        let nowYear = date.getFullYear(); // 获取年份
        let nowMonth = date.getMonth() + 1; // 获取月份
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        return `${nowYear}-${nowMonth}-${day}`
    }

    // 上个月
    preMonth() {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let preMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(0)))); // 0 是上个月最后一天
        this.initCalendar(preMonthFirstDate)
    }

    // 下个月
    nextMonth() {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let nextMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(33))));
        this.initCalendar(nextMonthFirstDate)
    }


    // 初始化日历
    initCalendar(currentDate) {

        let nowDate = currentDate ? currentDate : new Date();
        let nowMonthFirstDate = this.getMonthFirstDate(nowDate) // 获取当月1号日期
        let nowWeek = new Date(nowMonthFirstDate).getDay() ? new Date(nowMonthFirstDate).getDay() : 7; // 获取星期
        let newDateList = []; // 创建日期数组
        let startDay = 2 - nowWeek; // 开始日期的下标  以为 setDate(0)是上个月最后一天  所以是2-nowWeek

        let showDayLength = nowWeek < 6 ? 35 : 42;  // 如果5行能显示下一个月 就只显示5行
        // 循环处理 获取日历上应该显示的日期
        for (let i = startDay; i < startDay + showDayLength; i++) {
            let date = new Date(new Date(nowMonthFirstDate).setDate(i)); // 获取时间对象
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 小于9的数字前面加0
            let dayObject = {
                date: this.getDateString(date),
                day,
                className: null,
            }
            // new Date(str).toDateString() === new Date().toDateString()
            if (date.toDateString() === new Date().toDateString()) {
                console.log(date.toDateString(), new Date().toDateString())
                dayObject.className = style.today
            }
            if (date.getDate() < new Date().getDate()) {
                dayObject.className = style.notoday
            }
            if (date.getMonth() !== new Date().getMonth()) {
                dayObject.className = style.notoday
            }
            newDateList.push(dayObject)
        }

        this.setState((pre) => {
            return {
                dayList: newDateList,
                currentDay: nowDate.getDate(),
                currentMonth: nowDate.getMonth() + 1 >= 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
                currentYear: nowDate.getFullYear()
            }
        })
    }

    renderHeader() {
        return (
            <div className={style.calendar_header}>
                <div className={style.calendar_header_left}>
                    <i className='iconfont icon-icon_left' onClick={this.preMonth}></i>
                </div>
                <div className=''>
                    {this.state.currentYear}年{this.state.currentMonth}月
                </div>
                <div className={style.calendar_header_right}>
                    <i className='iconfont icon-icon_next_arrow' onClick={this.nextMonth}></i>
                </div>
            </div>
        )
    }

    renderBody() {
        return (
            <div className={style.calendar_body}>
                <div className={style.week_container}>
                    {this.state.weekList.map(week => {
                        return <div key={week.name} className={style.week}>{week.name}</div>
                    })}
                </div>
                <div className={style.day_container}>
                    {this.state.dayList.map((dayObject, index) => {
                        return <div key={index} className={`${style.day} ${dayObject.className}`}
                            id={this.state.datecurrent === index ? style.active : ''}
                            onClick={() => {
                                this.datehandleclick(index)
                            }}
                        >{dayObject.day}</div>
                    })}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <LittleNavbar Lnbname={'演出日历'}></LittleNavbar>
                <div className={style.showsbar_box}>
                    <ul className={style.showsbar_box_left}>
                        {
                            this.state.navlist.map((item, index) =>
                                <li key={item.id} onClick={() => {
                                    this.handleclick(item.id, index)
                                }}
                                    className={this.state.current === index ? style.active : ''}
                                >{item.name}</li>
                            )
                        }
                    </ul>
                    <div className={style.choose_city}>
                        <span>全国</span>
                        <i className="iconfont icon-icon_GPS"></i>
                    </div>
                </div>
                <div className='calendar'>
                    {this.renderHeader()}
                    {this.renderBody()}
                </div>
                <ul className={style.date_list}>
                    {
                        this.state.datelist.map((item, index) =>
                            <li key={index}>
                                <div className={style.img_box}>
                                    <img src={item.pic} alt="" />
                                </div>
                                <div className={style.date_list_font}>
                                    <p className={style.time}>
                                        {item.start_show_time}
                                        <span>
                                            {item.show_time_bottom}
                                        </span>
                                    </p>
                                    <h2>{item.name}</h2>
                                    <p className={style.location}>
                                        {item.city_name}
                                        <span>
                                            {item.venue_name}
                                        </span>
                                    </p>
                                    <div className={style.isOk_box}>
                                        {
                                            item.support_desc.map((item, index) =>
                                                <p key={index} className={style.isOk}>{item}</p>
                                            )
                                        }
                                    </div>
                                    <p className={style.pis}>
                                        ¥{item.min_price}
                                        <span>
                                            起
                                            </span>
                                    </p>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>)
    }

    handleclick = (id, index) => {
        // console.log(id)
        this.setState({
            current: index,
            navId: id
        }, () => {
            Axios.get(`https://api.juooo.com/Show/Search/getShowList?category=${this.state.navId}&city_id=0&start_time=${this.state.dataNewStr}&page=1&version=6.1.1&referer=1`)
                .then(res => {
                    // console.log(res.data)
                    this.setState({
                        datelist: res.data.data.list
                    })
                })
        }
        )
    }

    datehandleclick = (aIndex) => {
        var str = this.state.dayList[aIndex].date
        var NewStr = str.replace(/-/gi, '/')
        // console.log(encodeURIComponent(NewStr))
        this.setState({
            datecurrent: aIndex,
            dataNewStr: encodeURIComponent(NewStr)
        }, () => {
            Axios.get(`https://api.juooo.com/Show/Search/getShowList?category=${this.state.navId}&city_id=0&start_time=${this.state.dataNewStr}&version=6.1.1&referer=2`)
                .then(res => {
                    // console.log(res.data)
                    this.setState({
                        datelist: res.data.data.list,
                    })
                })
            }
        )
        console.log(this.state.dataNewStr)
        // console.log(this.state.dataNewStr, 'datehandleclick')
        // console.log(this.state.dayList[aIndex].date)


        //https://api.juooo.com/Show/Search/getShowList?category=0&city_id=0&start_time=2020%2F1%2F14&version=6.1.1&referer=2
        //https://api.juooo.com/Show/Search/getShowList?category=0&city_id=0&start_time=2020%2F1%2F15&page=1&version=6.1.1&referer=2
        //https://api.juooo.com/Show/Search/getShowList?category=0&city_id=0&start_time=2020%2F1%2F16&page=1&version=6.1.1&referer=2
    }
}


export default withRouter(Test)