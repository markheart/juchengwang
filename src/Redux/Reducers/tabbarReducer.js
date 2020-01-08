const tabbarReducer =(prevState=true,action)=>{
  
  let {type,payload} = action
  
  switch(type){
    case "SHOW_Tabbar":
      return payload
    case "HIDE_Tabbar":
      return payload
    default:
      return prevState
  }
  
}
export default tabbarReducer