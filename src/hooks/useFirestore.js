import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useState } from "react"

export const useFirestore = (collectionName) => {
    const [document, setDocument] = useState(null)

    const collectionRef = collection(db, collectionName)

    const addDocument = async (document) => {
        try {
            const doc = await addDoc(collectionRef, { ...document, createAt: serverTimestamp() })
            setDocument(doc)
        } catch (error) {
            console.log(error.message)
        }
    }

    const addDocumentUser = async (document) => {
        try {
            const doc = await addDoc(collectionRef, { ...document, createAt: serverTimestamp() })
            setDocument(doc)
        } catch (error) {
            console.log(error.message)
        }
    }
    const getDocuments = async () => {
        try {
            const docs = await getDocs(collectionRef)
            let results = []
            docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            });

        } catch (error) {
            console.log(error.message)
        }
    }

    const delDocument = async (id) => {
        const docRef = doc(db, collectionName, id)
        try {
            await deleteDoc(docRef)
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateDocument = async (id, document) => {
        const docRef = doc(db, collectionName, id)
        try {
            await updateDoc(docRef, { ...document, createAt: serverTimestamp() })
        } catch (error) {
            console.log(error.message)
        }
    }

    return { document, addDocument, addDocumentUser, delDocument, updateDocument, getDocuments, setDocPost }
}
