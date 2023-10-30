const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null, isLoggedIn: false }
        case 'ISLOGGEDIN':
            return { ...state, user: action.payload, isLoggedIn: true }
        default:
            return state
    }
}

export default userReducer