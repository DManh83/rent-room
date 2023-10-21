const postReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
        case 'SET_POSTS_LIMIT':
            return { ...state, posts: action.payload }
        case 'GET_POST':
            return { ...state, post: action.payload }
        default:
            return state
    }
}

export default postReducer