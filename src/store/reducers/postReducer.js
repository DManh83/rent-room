const postReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_POSTS':
        case 'SET_POSTS_LIMIT':
            return { ...state, posts: action.payload }

        default:
            return state
    }
}

export default postReducer