import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchCategories = async (dispatch) => {
    try {
        const categoriesSnapshots = await getDocs(collection(db, 'categorys'));

        const allCategories = [];

        for (const category of categoriesSnapshots.docs) {
            const categoryData = {
                id: category.id,
                ...category.data()
            }
            allCategories.push(categoryData)
        }
        dispatch({ type: 'GET_CATEGORIES', payload: allCategories })
    } catch (error) {
        console.log('Lỗi fetch category: ', error)
    }
}

export const fetchPrices = async (dispatch) => {
    try {
        const pricesSnapshots = await getDocs(collection(db, 'prices'));

        const allPrices = [];

        for (const price of pricesSnapshots.docs) {
            const priceData = {
                id: price.id,
                ...price.data()
            }
            allPrices.push(priceData)
        }
        dispatch({ type: 'GET_PRICES', payload: allPrices.sort((a, b) => { return +a.order - +b.order }) })
    } catch (error) {
        console.log('Lỗi fetch price: ', error)
    }
}

export const fetchAreas = async (dispatch) => {
    try {
        const areasSnapshots = await getDocs(collection(db, 'areas'));

        const allAreas = [];

        for (const area of areasSnapshots.docs) {
            const areaData = {
                id: area.id,
                ...area.data()
            }
            allAreas.push(areaData)
        }
        dispatch({ type: 'GET_AREAS', payload: allAreas.sort((a, b) => { return +a.order - +b.order }) })
    } catch (error) {
        console.log('Lỗi fetch area: ', error)
    }
}