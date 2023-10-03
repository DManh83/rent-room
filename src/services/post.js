import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { dataArea, dataPrice } from "../ultils/data"
import { db } from "../firebase"
import generateDate from "../ultils/common/generateDate"



export const createDocPost = async (payload, postId) => {

    try {
        let currentPrice = payload.price / 1000000
        let currentArea = payload.area
        const categoryDoc = await getDoc(doc(db, 'categorys', payload.categoryCode))
        const finalPayload = {
            ...payload,
            labelCode: postId?.match(/\d/g)?.join(''),
            attributeCode: postId?.match(/\d/g)?.join(''),
            overviewCode: postId?.match(/\d/g)?.join(''),
            areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
            priceCode: dataPrice.find(area => area.max > currentPrice && area.min <= currentPrice)?.code,

        }
        const postsRef = doc(db, 'posts', postId)
        const labelRef = doc(db, 'posts', postId, 'label', postId?.match(/\d/g)?.join(''))
        const attributeRef = doc(db, 'posts', postId, 'attribute', postId?.match(/\d/g)?.join(''))
        const overviewRef = doc(db, 'posts', postId, 'overview', postId?.match(/\d/g)?.join(''))

        //add post
        await setDoc(postsRef, { ...finalPayload, createAt: serverTimestamp() })

        //add subcollection label
        await setDoc(labelRef, {
            label: `${categoryDoc?.data().value} ${payload?.address?.split(', ')[1]}`,
            createAt: serverTimestamp()
        })

        //add subcollection attribute   
        await setDoc(attributeRef, {
            price: payload.price / 1000000 + ' triệu/tháng',
            area: payload.area + ' m²',
            published: serverTimestamp(),
            createAt: serverTimestamp()
        })

        //add sbcollection overview
        await setDoc(overviewRef, {
            area: `${categoryDoc?.data().value} ${payload?.address?.split(', ')[2]}`,
            type: categoryDoc?.data().value,
            target: payload.target,
            created: generateDate().today,
            expired: generateDate().expireDay,
            createAt: serverTimestamp()
        })
    } catch (error) {
        console.log('Lỗi tạo post', error)
    }
}

export const createPricesAndAreas = () => {
    try {
        dataPrice.forEach(async (item, index) => {
            const priceRef = doc(db, 'prices', `${index + 1}` + item.code)
            await setDoc(priceRef, {
                value: item.value,
                order: index + 1
            })
        })
        dataArea.forEach(async (item, index) => {
            const areaRef = doc(db, 'areas', `${index + 1}` + item.code)
            await setDoc(areaRef, {
                value: item.value,
                order: index + 1
            })
        })
    } catch (error) {
        console.log(error)
    }
}