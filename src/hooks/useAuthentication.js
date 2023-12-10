import { useEffect } from 'react'

import { auth, db } from '../config/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useToast } from '@chakra-ui/react'
import { useAuth } from './useReducerContext'
import { GoogleAuthProvider, confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, signInWithPopup } from 'firebase/auth'

export const useAuthentication = () => {
    const toast = useToast()
    const { dispatchUser } = useAuth()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid)
                    const docSnap = await getDoc(docRef)
                    const userData = docSnap.data()

                    setDoc(docRef, { ...userData, email: user.email })

                    dispatchUser({ type: 'ISLOGGEDIN', payload: { ...user, ...userData } })
                } catch (error) {
                    console.error('Lỗi tải thông tin người dùng:', error)
                }
            } else {
                dispatchUser({ type: 'LOGOUT' })
            }
        })
    }, [dispatchUser])

    const register = (email, password, name, phone) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user
                updateProfile(user, {
                    displayName: name,
                })
                const docRef = doc(db, 'users', user.uid)
                setDoc(docRef, {
                    email,
                    name,
                    phone,
                    zalo: phone,
                })

                dispatchUser({ type: 'LOGIN', payload: user })
            })
            .catch((error) => {
                toast({
                    description: error.message === 'Firebase: Error (auth/invalid-email).' ? 'Email không đúng' : error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ? 'Mật khẩu phải có 6 ký tự' : 'Tài khoản đã tồn tại',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            })
    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user
                dispatchUser({ type: 'LOGIN', payload: user })
            })
            .catch((error) => {
                toast({
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            })
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                const user = res.user
                dispatchUser({ type: 'LOGIN', payload: user })
            })
            .catch((error) => {
                toast({
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            })
    }


    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, { url: process.env.REACT_APP_URL_LOGIN })
    }

    const resetPassword = (oobCode, newPassword) => {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    const logout = () => {
        signOut(auth)
            .then((res) => {
                toast({
                    description: 'Bạn đã đăng xuất',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                dispatchUser({ type: 'LOGOUT' })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    return { register, login, signInWithGoogle, forgotPassword, resetPassword, logout }
}
