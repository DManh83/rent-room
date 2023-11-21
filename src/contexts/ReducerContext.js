import React, { createContext, useReducer } from 'react'
import userReducer from '../store/reducers/userReducer'
import postReducer from '../store/reducers/postReducer'
import appReducer from '../store/reducers/appReducer'

export const AuthContext = createContext()

export const PostContext = createContext()

export const AppContext = createContext()


export const ReducerContextProvider = ({ children }) => {

    const [userData, dispatchUser] = useReducer(userReducer, {
        user: null,
        isLoggedIn: false
    })

    const [postData, dispatchPost] = useReducer(postReducer, {
        posts: null,
        post: null,
        postOfCurrent: null,
        dataEdit: null,
    })

    const [appData, dispatchApp] = useReducer(appReducer, {
        categories: null,
        prices: null,
        areas: null,
        provinces: null
    })

    // console.log('Auth state is', state)

    return (
        <AuthContext.Provider value={{ ...userData, dispatchUser }}>
            <AppContext.Provider value={{ ...appData, dispatchApp }}>
                <PostContext.Provider value={{ ...postData, dispatchPost }}>
                    {children}
                </PostContext.Provider>
            </AppContext.Provider>
        </AuthContext.Provider>
    )
}
