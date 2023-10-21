import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


// export const fetchPosts = async (dispatch) => {
//     try {
//         const batch = db.batch();
//         const postDocs = await getDocs(collection(db, 'posts'));

//         const allPosts = [];

//         for (const post of postDocs.docs) {
//             const postData = post.data();
//             const userDoc = await getDoc(doc(db, 'users', postData.userId))
//             const attributeDoc = await getDoc(doc(db, 'attributes', postData.attributeId))

//             const attributeData = attributeDoc.data()
//             const userData = userDoc.data()
//             const postObj = {
//                 id: post.id,
//                 ...postData,
//                 attribute: attributeData ?? null,
//                 user: userData ?? null,
//             }

//             allPosts.push(postObj)
//         }

//         dispatch({ type: 'SET_POSTS', payload: allPosts })
//     } catch (error) {
//         console.error('Lỗi truy vấn:', error)
//     }
// };

export const fetchPostsLimit = async (dispatch, params) => {
    try {
        const postDocs = await getDocs(collection(db, 'posts'));

        const postDocFilter = filterPosts(postDocs.docs, params)

        const postFetchPromises = postDocFilter.map(async (post) => {
            const postData = post.data();
            const userId = postData.userId;
            const attributeId = postData.attributeId;

            const [userDocSnapshot, attributeDocSnapshot] = await Promise.all([
                getDoc(doc(db, 'users', userId)),
                getDoc(doc(db, 'attributes', attributeId)),
            ]);

            const attributeData = attributeDocSnapshot.exists() ? attributeDocSnapshot.data() : null;
            const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : null;

            return {
                id: post.id,
                ...postData,
                attribute: attributeData,
                user: userData,
            };
        });

        const allPosts = await Promise.all(postFetchPromises);


        dispatch({ type: 'SET_POSTS', payload: allPosts })
    } catch (error) {
        console.error('Lỗi truy vấn:', error)
    }
}

export const fetchAllDataWithPost = async (dispatch, post) => {
    try {
        const categoryDocRef = doc(db, 'categorys', post.categoryCode);
        const labelDocRef = doc(db, 'labels', post.labelCode);
        const overviewDocRef = doc(db, 'overviews', post.overviewId);
        const priceDocRef = doc(db, 'prices', post.priceCode);
        const areaDocRef = doc(db, 'areas', post.areaCode);
        const provinceDocRef = doc(db, 'provinces', post.provinceCode);

        const [categoryDoc, labelDoc, overviewDoc, priceDoc, areaDoc, provinceDoc] = await Promise.all([
            getDoc(categoryDocRef),
            getDoc(labelDocRef),
            getDoc(overviewDocRef),
            getDoc(priceDocRef),
            getDoc(areaDocRef),
            getDoc(provinceDocRef)
        ]);

        const categoryData = categoryDoc.exists() ? categoryDoc.data() : null;
        const labelData = labelDoc.exists() ? labelDoc.data() : null;
        const overviewData = overviewDoc.exists() ? overviewDoc.data() : null;
        const priceData = priceDoc.exists() ? priceDoc.data() : null;
        const provinceData = provinceDoc.exists() ? provinceDoc.data() : null;
        const areaData = areaDoc.exists() ? areaDoc.data() : null;

        const postWithAllData = {
            ...post,
            category: categoryData,
            label: labelData,
            overview: overviewData,
            priceData: priceData,
            province: provinceData,
            areaData: areaData
        };

        dispatch({ type: 'GET_POST', payload: postWithAllData })

    } catch (error) {
        console.error('Lỗi truy vấn:', error)
    }
}

export const filterPosts = (posts, filterParams) => {
    const { categoryCode, provinceCode, priceCode, areaCode, priceNumber, areaNumber } = filterParams
    return posts.filter(p =>
        (!categoryCode || categoryCode.toString() === p.data().categoryCode) &&
        (!provinceCode || provinceCode.toString() === p.data().provinceCode) &&
        (!priceCode || priceCode.toString() === p.data().priceCode) &&
        (!areaCode || areaCode.toString() === p.data().areaCode) &&
        (!priceNumber || (priceNumber[0] <= p.data().priceNumber && priceNumber[1] >= p.data().priceNumber)) &&
        (!areaNumber || (areaNumber[0] <= p.data().areaNumber && areaNumber[1] >= p.data().areaNumber))
    )
}