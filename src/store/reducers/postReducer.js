const postReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload }

        default:
            return state
    }
}

export default postReducer