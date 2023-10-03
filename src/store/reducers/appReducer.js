const appReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'GET_CATEGORIES':
            return { ...state, categories: action.payload }
        case 'GET_PRICES':
            return { ...state, prices: action.payload }
        case 'GET_AREAS':
            return { ...state, areas: action.payload }

        default:
            return state
    }
}

export default appReducer