import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchPosts = async (dispatch) => {
    try {
        const postSnapshots = await getDocs(collection(db, 'posts'));

        const allPosts = [];

        for (const post of postSnapshots.docs) {
            const postData = post.data();

            const userDoc = await getDoc(doc(db, 'users', postData.userId));
            const categoryDoc = await getDoc(doc(db, 'categorys', postData.categoryCode))
            const labelDoc = await getDoc(doc(db, 'posts', post.id, 'label', postData.labelCode))
            const attributeDoc = await getDoc(doc(db, 'posts', post.id, 'attribute', postData.attributeCode))
            const overviewDoc = await getDoc(doc(db, 'posts', post.id, 'overview', postData.overviewCode))
            const priceDoc = await getDoc(doc(db, 'prices', postData.priceCode))
            const areaDoc = await getDoc(doc(db, 'areas', postData.areaCode))

            const userData = userDoc.data();
            const categoryData = categoryDoc.data()
            const labelData = labelDoc.data()
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
                areaData: areaData ?? null
            };

            allPosts.push(postWithUser);
        }

        dispatch({ type: 'SET_POSTS', payload: allPosts })
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
    }
};