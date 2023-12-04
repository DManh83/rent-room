import moment from "moment"


export const formatDate = (timeObj) => {
    let day = timeObj.getDay() === 0 ? 'Chủ nhật' : `Thứ ${timeObj.getDay() + 1}`
    let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`
    let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`
    return `${day}, ${time} ${date}`
}

export const generateDate = () => {
    // let gapExpire = Math.floor(Math.random() * 29) + 1
    let gapExpire = process.env.REACT_APP_GAP_EXPIRE
    let today = new Date()
    let expireDay = moment(today).add(gapExpire, 'd').toDate()

    return {
        today: formatDate(today),
        expireDay: formatDate(expireDay)
    }
}
