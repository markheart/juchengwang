const pageTitleReducer = (prevState='聚橙网',action)=>{
  let {type,payload} = action
  switch(type){
    case 'PAGE_title':
      return payload
    default :
      return prevState
  }
}
export default pageTitleReducer