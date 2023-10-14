const userReducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'ISLOGGEDIN':
            return { ...state, user: action.payload, isLoggedIn: true }
        default:
            return state
    }
}

export default userReducer