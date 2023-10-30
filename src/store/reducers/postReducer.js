const postReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
        case 'GET_POSTS_LIMIT':
            return { ...state, posts: action.payload }
        case 'GET_POSTS_USER':
            return { ...state, postOfCurrent: action.payload }
        case 'GET_POST':
            return { ...state, post: action.payload }
        case 'EDIT_DATA':
            return { ...state, dataEdit: action.payload }
        case 'RESET_DATAEDIT':
            return { ...state, dataEdit: null }
        default:
            return state
    }
}

export default postReducer