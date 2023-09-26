import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useReducer } from 'react'
import { auth, db } from '../firebase'
import userReducer from '../store/reducers/userReducer'
import { doc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, { user: null, isLoggedIn: false })

    console.log('Auth state is', state)

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
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
