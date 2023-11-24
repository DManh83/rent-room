import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { dataArea, dataPrice } from "../ultils/data"
import { db } from "../config/firebase"
import generateDate from "../ultils/common/generateDate"
import generateCode from "../ultils/common/generateCode"
import { v4 } from "uuid"

export const createDocPost = async (payload, name, phone) => {

    try {
        const [userDoc, categoryDoc] = await Promise.all([
            getDoc(doc(db, 'users', payload.userId)),
            getDoc(doc(db, 'categorys', payload.categoryCode))
        ])
        const userData = userDoc.data()
        const categoryData = categoryDoc.data()

        let addressArr = payload?.address?.split(', ')
        let currentPrice = payload.priceNumber / 1000000
        let currentArea = payload.areaNumber / 1
        let tempId = v4()
        let code = tempId.replace(/-/g, '').substr(0, 10).match(/\d/g).join('')

        const finalPayload = {
            ...payload,
            // overviewId: tempId,
            overviewId: tempId,
            labelCode: generateCode(`${categoryData.value} ${addressArr[addressArr.length - 2]}`).trim(),
            provinceCode: generateCode(addressArr?.slice(-1)[0]).trim(),
            areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
            priceCode: dataPrice.find(area => area.max > currentPrice && area.min <= currentPrice)?.code,
            areaNumber: currentArea,
            priceNumber: currentPrice
        }

        // const postsRef = doc(db, 'posts', postId)
        const userRef = doc(db, 'users', finalPayload.userId)
        const labelRef = doc(db, 'labels', finalPayload.labelCode)
        const provinceRef = doc(db, 'provinces', finalPayload.provinceCode)
        // const overviewRef = doc(db, 'overviews', finalPayload.overviewId)
        const overviewRef = doc(db, 'overviews', finalPayload.overviewId)

        //add post
        const addPostPromise = addDoc(collection(db, 'posts'), { ...finalPayload, hidden: false, createAt: serverTimestamp() })

        //add user
        const addUserPromise = setDoc(userRef, {
            ...userData,
            name,
            phone,
            zalo: phone
        })

        //add subcollection label
        const labelPromise = setDoc(labelRef, {
            value: `${categoryData.value} ${addressArr[addressArr.length - 2]}`,
            createAt: serverTimestamp()
        })

        //add sbcollection overview
        const overviewPromise = setDoc(overviewRef, {
            area: `${categoryData.value} ${addressArr[addressArr.length - 1]}`,
            type: categoryData.value,
            price: currentPrice + ' triệu/tháng',
            acreage: currentArea + ' m²',
            code: code,
            target: payload.target,
            created: generateDate().today,
            expired: generateDate().expireDay,
            createAt: serverTimestamp()
        })

        //add subcollection province
        const provincePromise = setDoc(provinceRef, {
            value: `${addressArr[addressArr.length - 1]}`,
            createAt: serverTimestamp()
        })

        await Promise.all([addPostPromise, addUserPromise, labelPromise, overviewPromise, provincePromise])

    } catch (error) {
        console.log('Lỗi tạo post: ', error)
    }
}

export const updateDocPost = async (payload, postId, name, phone) => {

    try {
        const postsRef = doc(db, 'posts', postId)
        const userRef = doc(db, 'users', payload.userId)

        const [postDoc, categoryDoc] = await Promise.all([
            getDoc(postsRef),
            getDoc(doc(db, 'categorys', payload.categoryCode)),
        ])
        const postData = postDoc.data()
        const categoryData = categoryDoc.data()

        let addressArr = payload?.address?.split(', ')
        let currentPrice = payload.priceNumber / 1000000
        let currentArea = payload.areaNumber / 1
        let code = postData.overviewId.replace(/-/g, '').substr(0, 10).match(/\d/g).join('')

        const finalPayload = {
            ...payload,
            overviewId: postData.overviewId,
            labelCode: generateCode(`${categoryData.value} ${addressArr[addressArr.length - 2]}`).trim(),
            provinceCode: generateCode(addressArr?.slice(-1)[0]).trim(),
            areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
            priceCode: dataPrice.find(area => area.max > currentPrice && area.min <= currentPrice)?.code,
            areaNumber: currentArea,
            priceNumber: currentPrice
        }
        // console.log(finalPayload)

        const labelRef = doc(db, 'labels', finalPayload.labelCode)
        const overviewRef = doc(db, 'overviews', finalPayload.overviewId)
        const provinceRef = doc(db, 'provinces', finalPayload.provinceCode)

        //add post
        const postPromise = updateDoc(postsRef, { ...finalPayload })

        //add user
        const userPromise = updateDoc(userRef, {
            name: name,
            phone: phone,
            zalo: phone
        })

        //add subcollection label
        const labelPromise = setDoc(labelRef, {
            value: `${categoryData.value} ${addressArr[addressArr.length - 2]}`,
            createAt: serverTimestamp()
        })

        //add sbcollection overview
        const overviewPromise = updateDoc(overviewRef, {
            area: `${categoryData.value} ${addressArr[addressArr.length - 1]}`,
            price: currentPrice + ' triệu/tháng',
            acreage: currentArea + ' m²',
            type: categoryData.value,
            code: code,
            target: payload.target,
        })

        //add subcollection province
        const provincePromise = setDoc(provinceRef, {
            value: `${addressArr[addressArr.length - 1]}`,
            createAt: serverTimestamp()
        })

        await Promise.all([postPromise, userPromise, labelPromise, overviewPromise, provincePromise])

    } catch (error) {
        console.log('Lỗi update post: ', error)
    }
}

export const setHiddenPost = async (postId, hidden) => {
    try {
        const postsRef = doc(db, 'posts', postId)
        await updateDoc(postsRef, { hidden: !hidden })
    } catch (error) {
        console.log('Lỗi set hiddent post: ', error)
    }
}

export const deletePost = async (postId) => {
    try {
        const postRef = doc(db, 'posts', postId)
        await deleteDoc(postRef)
    } catch (error) {
        console.log('Lỗi delete post: ', error)
    }
}

export const createPricesAndAreas = () => {
    try {
        dataPrice.forEach(async (item, index) => {
            const priceRef = doc(db, 'prices', item.code)
            await setDoc(priceRef, {
                value: item.value,
                order: index + 1
            })
        })
        dataArea.forEach(async (item, index) => {
            const areaRef = doc(db, 'areas', item.code)
            await setDoc(areaRef, {
                value: item.value,
                order: index + 1
            })
        })
    } catch (error) {
        console.log(error)
    }
}