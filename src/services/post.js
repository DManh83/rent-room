import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { dataArea, dataPrice } from "../ultils/data"
import { db } from "../firebase"
import generateDate from "../ultils/common/generateDate"
import generateCode from "../ultils/common/generateCode"
import { v4 } from "uuid"

export const createDocPost = async (payload) => {

    try {
        const categoryDoc = await getDoc(doc(db, 'categorys', payload.categoryCode))

        let currentPrice = payload.priceNumber / 1000000
        let currentArea = payload.areaNumber / 1
        let attributeId = v4()
        let overviewId = v4()
        let code = v4().replace(/-/g, '').substr(0, 10).match(/\d/g).join('')

        const finalPayload = {
            ...payload,
            attributeId,
            overviewId,
            labelCode: generateCode(`${categoryDoc?.data().value} ${payload?.address?.split(', ')[1]}`).trim(),
            provinceCode: generateCode(payload.address.split(',')?.slice(-1)[0]).trim(),
            areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code,
            priceCode: dataPrice.find(area => area.max > currentPrice && area.min <= currentPrice)?.code,
            areaNumber: currentArea,
            priceNumber: currentPrice
        }

        // const postsRef = doc(db, 'posts', postId)
        const labelRef = doc(db, 'labels', finalPayload.labelCode)
        const provinceRef = doc(db, 'provinces', finalPayload.provinceCode)
        const attributeRef = doc(db, 'attributes', finalPayload.attributeId)
        const overviewRef = doc(db, 'overviews', finalPayload.overviewId)

        //add post
        await addDoc(collection(db, 'posts'), { ...finalPayload, createAt: serverTimestamp() })

        //add subcollection label
        await setDoc(labelRef, {
            value: `${categoryDoc?.data().value} ${payload?.address?.split(', ')[1]}`,
            createAt: serverTimestamp()
        })

        //add subcollection attribute   
        await setDoc(attributeRef, {
            price: currentPrice + ' triệu/tháng',
            area: currentArea + ' m²',
            hashtag: code,
            published: serverTimestamp(),
            createAt: serverTimestamp()
        })

        //add sbcollection overview
        await setDoc(overviewRef, {
            area: `${categoryDoc?.data().value} ${payload?.address?.split(', ')[2]}`,
            type: categoryDoc?.data().value,
            code: code,
            target: payload.target,
            created: generateDate().today,
            expired: generateDate().expireDay,
            createAt: serverTimestamp()
        })

        //add subcollection province
        await setDoc(provinceRef, {
            value: `${payload?.address?.split(', ')[2]}`,
            createAt: serverTimestamp()
        })

    } catch (error) {
        console.log('Lỗi tạo post', error)
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