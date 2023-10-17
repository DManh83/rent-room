import { and, collection, doc, getCountFromServer, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchPosts = async (dispatch) => {
    try {
        const postDocs = await getDocs(collection(db, 'posts'));

        const allPosts = [];

        for (const post of postDocs.docs) {
            const postData = post.data();

            const userDoc = await getDoc(doc(db, 'users', postData.userId));
            const categoryDoc = await getDoc(doc(db, 'categorys', postData.categoryCode))
            const labelDoc = await getDoc(doc(db, 'labels', postData.labelCode))
            const attributeDoc = await getDoc(doc(db, 'attributes', postData.attributeId))
            const overviewDoc = await getDoc(doc(db, 'overviews', postData.overviewId))
            const priceDoc = await getDoc(doc(db, 'prices', postData.priceCode))
            const areaDoc = await getDoc(doc(db, 'areas', postData.areaCode))
            const provinceDoc = await getDoc(doc(db, 'provinces', postData.provinceCode))

            const userData = userDoc.data();
            const categoryData = categoryDoc.data()
            const labelData = labelDoc.data()
            const attributeData = attributeDoc.data()
            const overviewData = overviewDoc.data()
            const priceData = priceDoc.data()
            const provinceData = provinceDoc.data()
            const areaData = areaDoc.data()

            const postWithUser = {
                id: post.id,
                ...postData,
                user: userData ?? null,
                category: categoryData ?? null,
                label: labelData ?? null,
                attribute: attributeData ?? null,
                overview: overviewData ?? null,
                priceData: priceData ?? null,
                province: provinceData ?? null,
                areaData: areaData ?? null
            };

            allPosts.push(postWithUser);
        }

        dispatch({ type: 'SET_POSTS', payload: allPosts })
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
    }
};

export const fetchPostsLimit = async (dispatch, params) => {
    try {
        const coll = collection(db, 'posts');
        const postsLimit = query(coll,
            params?.categoryCode && where('categoryCode', '==', `${params?.categoryCode}`),
            // params?.provinceCode && where('provinceCode', '==', `${params?.provinceCode}`),
            // where('priceCode', '==', `${params?.priceCode}`),
            // where('areaCode', '==', `${params?.areaCode}`),
            // params?.priceNumber && where('priceNumber', '>=', params?.priceNumber[0]), where('priceNumber', '<=', params?.priceNumber[1]),
            // params?.areaNumber && where('areaNumber', '>=', params?.areaNumber[0]), where('areaNumber', '<=', params?.areaNumber[1])
        )
        const postsLimitDoc = await getDocs(postsLimit)
        // Object.keys(searchParamsObject)?.some(item => {
        //     if (item ===)
        // })
        // const postsLimit = query(coll, Object.entries(params).forEach(([key, value]) => {
        //     if (key.includes('Code'))
        //         where(`${key}`, '==', `${value[0]}`)
        //     else {
        //         console.log(`${key} ${value[0]} ${value[1]}`)
        //         where(`${key}`, '>=', `${value[0]}`)
        //         where(`${key}`, '<=', `${value[0]}`)
        //     }
        // }))
        // console.log('post limit snapshot: ', postsLimitDoc.docs)
        const allPosts = [];

        for (const post of postsLimitDoc.docs) {
            const postData = post.data();

            const userDoc = await getDoc(doc(db, 'users', postData.userId));
            const categoryDoc = await getDoc(doc(db, 'categorys', postData.categoryCode))
            const labelDoc = await getDoc(doc(db, 'labels', postData.labelCode))
            const attributeDoc = await getDoc(doc(db, 'attributes', postData.attributeId))
            const overviewDoc = await getDoc(doc(db, 'overviews', postData.overviewId))
            const priceDoc = await getDoc(doc(db, 'prices', postData.priceCode))
            const areaDoc = await getDoc(doc(db, 'areas', postData.areaCode))
            const provinceDoc = await getDoc(doc(db, 'provinces', postData.provinceCode))

            const userData = userDoc.data();
            const categoryData = categoryDoc.data()
            const labelData = labelDoc.data()
            const provinceData = provinceDoc.data()
            const attributeData = attributeDoc.data()
            const overviewData = overviewDoc.data()
            const priceData = priceDoc.data()
            const areaData = areaDoc.data()

            const postWithUser = {
                id: post.id,
                ...postData,
                user: userData ?? null,
                category: categoryData ?? null,
                label: labelData ?? null,
                attribute: attributeData ?? null,
                overview: overviewData ?? null,
                priceData: priceData ?? null,
                areaData: areaData ?? null,
                province: provinceData ?? null
            };

            allPosts.push(postWithUser);
        }

        dispatch({ type: 'SET_POSTS_LIMIT', payload: allPosts })
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
    }
}