import { collection, doc, getCountFromServer, getDoc, getDocs, query, where } from "firebase/firestore";
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

export const fetchPostsLimit = async (dispatch, param, paramValue) => {
    try {
        const coll = collection(db, 'posts');
        const postsLimit = query(coll, where(`${param}`, '==', `${paramValue}`))
        const postsLimitDoc = await getDocs(postsLimit)
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