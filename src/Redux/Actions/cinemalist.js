import Axios from "axios"

export const getcinema=()=>{
  return Axios({
    url:"https://api.juooo.com/theatre/index/getTheatreList?page=1&version=6.0.9&referer=2",
  }).then(res=>{
    return{
      type:"GET_Cinema",
      payload:res.data.data.theatre_list
    }
  })
}


