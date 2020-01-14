import Axios from 'axios'
export let getData=(id)=>{
 return Axios.get(`https://api.juooo.com/Schedule/Schedule/getScheduleInfo?schedular_id=${id}&version=6.0.9&referer=2`).then(res=>{
    
    return {
      type:'DETAIL_getData',
      payload:res.data.data
    }
  })
}