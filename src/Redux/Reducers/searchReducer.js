const searchReducer = (PrveState = true, action) => {
  let { type, payload } = action
  switch (type) {
    case "SHOW_Search":
      return payload
    case "HIDE_Search":
      return payload
    default:
      return PrveState
  }
}

export default searchReducer