import axiosDefault from 'axios'

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'https://provinces.open-api.vn/api/p'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicDistrict = (provinceCode) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicWard = (districtCode) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetCoordsMap = (address) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_MAP_API}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})