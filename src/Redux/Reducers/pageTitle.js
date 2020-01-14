const pageTitleReducer = (prevState='聚橙网-票务网_演唱会门票_演出订票平台_演出资讯_订票热线400-185-8666',action)=>{
  let {type,payload} = action
  switch(type){
    case 'PAGE_title':
      return payload
    default :
      return prevState
  }
}
export default pageTitleReducer