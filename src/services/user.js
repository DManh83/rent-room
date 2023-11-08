import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const updateUser = async (payload, userId) => {

    try {
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            ...payload
        })
    } catch (error) {
        console.log('Lỗi update user: ', error)
    }
}