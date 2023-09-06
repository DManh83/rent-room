import { GoogleAuthProvider, confirmPasswordReset, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser ? currentUser : null)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithRedirect(auth, provider)
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
    }

    const resetPassword = (oobCode, newPassword) => {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    const logout = () => {
        return signOut(auth)
    }


    return (
        <UserContext.Provider value={{ register, login, logout, signInWithGoogle, forgotPassword, resetPassword, user }}>
            {children}
        </UserContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(UserContext)
}