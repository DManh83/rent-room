import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useToast } from '@chakra-ui/react'
import { useAuth } from './useAuthContext'
import { GoogleAuthProvider, confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth'

export const useAuthentication = () => {
    // const [error, setError] = useState(null)
    // const [isSubmiting, setIsSubmitting] = useState(false)
    const toast = useToast()
    // const mounted = useMounted()

    const { dispatch } = useAuth()

    const register = (email, password, name, phone) => {
        // setError(null)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user
                const docRef = doc(db, 'users', user.uid)
                setDoc(docRef, { email, name, phone, zalo: phone })
                dispatch({ type: 'LOGIN', payload: user })
            })
            .catch((error) => {
                // setError(error.message)
                toast({
                    description: error.message === 'Firebase: Error (auth/invalid-email).' ? 'Email không đúng' : error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ? 'Mật khẩu phải có 6 ký tự' : 'Tài khoản đã tồn tại',
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            })
    }

    const login = (email, password) => {
        // setError(null)
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user
                dispatch({ type: 'LOGIN', payload: user })
            })
            .catch((error) => {
                toast({
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            })
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
            .then((res) => {
                const user = res.user
                const docRef = doc(db, 'users', user.uid)
                console.log(user)
                setDoc(docRef, { email: user.email, name: user.displayName, phone: user.phoneNumber, zalo: user.phoneNumber })
                dispatch({ type: 'LOGIN', payload: user })
            })
            .catch((error) => {
                toast({
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                })
            })
    }

    // const updateProfileUser = () => { 
    //     updateProfile(auth.currentUser, {})
    //  }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
    }

    const resetPassword = (oobCode, newPassword) => {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    const logout = () => {
        signOut(auth)
            .then((res) => {
                console.log('Successfully Logout')
                dispatch({ type: 'LOGOUT' })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    return { register, login, signInWithGoogle, forgotPassword, resetPassword, logout }
}
