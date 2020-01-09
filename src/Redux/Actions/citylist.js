import Axios from 'axios'
// 获取城市信息数据
export let getCityList = () => {
    return Axios.get(`https://api.juooo.com/city/city/getHotCityList?version=6.0.9&referer=2`)
        .then(res=>{
            console.log(res.data)
            return {
                type: 'GET_CityListDate',
                payload: res.data.data.hot_city_List
            }
        })

}

// export let getAllCityList = () => {
//     return Axios.get(`https://api.juooo.com/city/city/getSortedCityList?version=6.0.9&referer=2`)
//         .then(res=>{
//             // console.log(res.data)
//             return {
//                 type: 'GET_AllCityListDate',
//                 payload: res.data.data
//             }
//         })

// }

