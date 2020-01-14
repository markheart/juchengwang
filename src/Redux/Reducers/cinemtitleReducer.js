
const Cinemalisttitle=(prve=0,action)=>{
  let {type,payload}=action
  switch(type){
    case "GET_Cinematitle":
      return payload
    default:
      return prve
  }
}

export default Cinemalisttitle