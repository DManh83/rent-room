import { getNumbersArea, getNumbersPrice } from "./getNumbers"

// export const getCodePrice = (totals, min, max) => {
//     // let arr = []
//     return totals?.map(item => {
//         let arrMinMax = getNumbersPrice(item.value)
//         // console.log(arrMinMax)
//         // if (arrMinMax.length === 1) arr.push(arrMinMax[0])
//         // let sortedArr = arr.sort()
//         // console.log(sortedArr.indexOf(arrMinMax[0]))
//         return ({
//             ...item,
//             min: arrMinMax.length === 2 ? arrMinMax[0] : arrMinMax[0] === min ? 0 : arrMinMax[0],
//             max: arrMinMax.length === 2 ? arrMinMax[1] : arrMinMax[0] === max ? 9999999 : arrMinMax[0],
//         })
//     })
// }

// export const getCodeArea = (totals, min, max) => {
//     // let arr = []
//     return totals?.map(item => {
//         let arrMinMax = getNumbersArea(item.value)
//         return ({
//             ...item,
//             min: arrMinMax.length === 2 ? arrMinMax[0] : arrMinMax[0] === min ? 0 : arrMinMax[0],
//             max: arrMinMax.length === 2 ? arrMinMax[1] : arrMinMax[0] === max ? 9999999 : arrMinMax[0],
//         })
//     })
// }

// export const getCodes = (entry, prices, min, max) => {
//     const pricesWithMinMax = getCodePrice(prices, min, max)
//     return pricesWithMinMax.filter(item => item.min <= entry && entry < item.max)
// }

export const getCodePrice = (totals) => {
    let arr = []
    return totals?.map(item => {
        let arrMaxMin = getNumbersPrice(item.value)
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortedArr = arr.sort()
        return ({
            ...item,
            min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1]
        })
    })
}
export const getCodeArea = (totals) => {
    let arr = []
    return totals?.map(item => {
        let arrMaxMin = getNumbersArea(item.value)
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortedArr = arr.sort()
        return ({
            ...item,
            min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortedArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortedArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1]
        })
    })
}

export const getCodes = (arrMinMax, prices) => {
    const pricesWithMinMax = getCodePrice(prices)
    return pricesWithMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
}

export const getCodesArea = (arrMinMax, areas) => {
    const areasWithMinMax = getCodeArea(areas)
    return areasWithMinMax.filter(item => (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) || (item.max >= arrMinMax[0] && item.max <= arrMinMax[1]))
}