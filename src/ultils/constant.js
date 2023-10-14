import locationHCM from '../assets/location_hcm.jpg'
import locationHN from '../assets/location_hn.jpg'
import locationDN from '../assets/location_dn.jpg'

export const path = {
    HOME: '/*',
    LOGIN: 'dang-nhap',
    REGISTER: 'dang-ky',
    PROFILE: 'thong-tin-tai-khoan',
    RESETPASSWORD: 'tao-lai-mat-khau',
    FORGOTPASSWORD: 'quen-mat-khau',
    CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    NHA_CHO_THUE: 'nha-cho-thue',
    CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
    TIM_NGUOI_O_GHEP: 'tim-nguoi-o-ghep',
    DETAIL_POST_TITLE_POSTID: 'chi-tiet/:title/:postId',
    DETAIL: 'chi-tiet',
    DETAIL_ALL: 'chi-tiet/*',
    SEARCH: 'tim-kiem',

    // NOTFOUND: '*',

    SYSTEM: '/he-thong',
    CREATE_POST: 'tao-tin-dang',

}

export const location = [
    {
        id: 'hcm',
        name: 'Phòng trọ Hồ Chí Minh',
        image: locationHCM,
    },
    {
        id: 'hn',
        name: 'Phòng trọ Hà Nội',
        image: locationHN,
    },
    {
        id: 'dn',
        name: 'Phòng trọ Đà Nẵng',
        image: locationDN,
    },
]