const cinemaReducer=(prevState=[],action)=>{
  let {type,payload} = action
    switch(type){
      case "GET_Cinema":
        return [...prevState,...payload]
      default :
        return prevState
    }
}

export default cinemaReducer