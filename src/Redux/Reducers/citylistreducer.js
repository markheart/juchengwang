const CitylistReducer = (prevState = [] , action) => {

    let { type, payload } = action
    switch (type) {
        case "GET_CityListDate":
            return [...prevState, ...payload]
        default:
            return prevState
    }

}

export default CitylistReducer
 
