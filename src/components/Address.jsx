import { Box, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'
import SelectOptions from './SelectOptions'
import { apiGetPublicDistrict, apiGetPublicProvinces, apiGetPublicWard } from '../services'
import InputReadOnly from './InputReadOnly'
import { usePost } from '../hooks/useReducerContext'

const Address = ({ isEdit, setPayload, invalidFields, setInvalidFields, province, setProvince, district, setDistrict, ward, setWard, detailAddress, setDetailAddress }) => {

    const { dataEdit } = usePost()
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [reset, setReset] = useState()

    useEffect(() => {
        setProvince('')
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200)
                setProvinces(response?.data.results)
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict('')
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200)
                setDistricts(response?.data.results)
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setWard('')
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district)
            if (response.status === 200)
                setWards(response?.data.results)
        }
        district && fetchPublicWard()
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    }, [district])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts, dataEdit])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundWard = wards?.length > 0 && wards?.find(item => item.ward_name === addressArr[addressArr.length - 3]?.trim())
            setWard(foundWard ? foundWard.ward_id : '')
        }
    }, [wards, dataEdit])

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${detailAddress ? `${detailAddress}, ` : ''}${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`
            // province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
        }))
    }, [province, district, ward, detailAddress])

    // console.log({ province, district })
    return (
        <Box>
            <Heading size='lg' py={4}>
                Địa chỉ cho thuê
            </Heading>
            <Flex direction='column' gap={4}>
                <Flex
                    alignItems='center'
                    gap={4}
                >
                    <SelectOptions invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        type='province'
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label='Tỉnh/Thành phố'
                    />
                    <SelectOptions invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        reset={reset}
                        type='district'
                        value={district}
                        setValue={setDistrict}
                        options={districts} label='Quận/Huyện'
                    />
                </Flex>

                <Flex
                    alignItems='center'
                    gap={4}
                >
                    <SelectOptions invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        reset={reset}
                        type='ward'
                        value={ward}
                        setValue={setWard}
                        options={wards}
                        label='Phường/Xã'
                    />
                    <FormControl className='detailAddress'>
                        <FormLabel>Đường/Phố, số nhà</FormLabel>
                        <Input
                            name='detailAddress'
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                            type='detailAddress'
                            autoComplete='detailAddress'
                            required />
                    </FormControl>
                </Flex>
                <InputReadOnly
                    id='exactly-address'
                    label={'Địa chỉ chính xác'}
                    value={
                        `${detailAddress ? `${detailAddress}, ` : ''}${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`
                    }
                />
            </Flex>
        </Box>
    )
}

export default memo(Address)