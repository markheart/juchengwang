const DetailReducer = (prevState = null , action) => {

  let { type, payload } = action
  switch (type) {
      case "DETAIL_getData":
          return {...prevState, ...payload}
      default:
          return prevState
  }

}

export default DetailReducer