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
    })

    const [appData, dispatchApp] = useReducer(appReducer, {
        categories: null,
        prices: null,
        areas: null,
        provinces: null
    })

    // console.log('Auth state is', state)

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (!user) {
    //             dispatch({ type: 'LOGOUT' })
    //         }
    //         else {
    //             const docRef = doc(db, 'users', user.uid)
    //             setDoc(docRef, { email: user.email, name: user.displayName, phone: user.phoneNumber, zalo: user.phoneNumber })
    //             dispatch({ type: 'ISLOGGEDIN', payload: user })
    //         }
    //     })
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [])

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
