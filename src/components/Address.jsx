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
        setProvince(0)
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200)
                setProvinces(response?.data)
        }
        fetchPublicProvince()
    }, [])
    useEffect(() => {
        setDistrict(0)
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200)
                setDistricts(response?.data?.districts)
        }
        +province > 0 && fetchPublicDistrict()
            + province === 0 ? setReset(true) : setReset(false)
            + province === 0 && setDistricts([])
    }, [province])

    useEffect(() => {
        setWard(0)
        const fetchPublicWard = async () => {
            const response = await apiGetPublicWard(district)
            if (response.status === 200)
                setWards(response?.data?.wards)
        }
        +district > 0 && fetchPublicWard()
            + district === 0 ? setReset(true) : setReset(false)
            + district === 0 && setWards([])
    }, [district])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            let foundProvince = provinces?.length > 0 && provinces?.find(item => item.name === addressArr[addressArr.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.code : 0)
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.name === addressArr[addressArr.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.code : 0)
        }
    }, [districts, dataEdit])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            let foundWard = wards?.length > 0 && wards?.find(item => item.name === addressArr[addressArr.length - 3]?.trim())
            setWard(foundWard ? foundWard.code : 0)
        }
    }, [wards, dataEdit])

    useEffect(() => {
        if (isEdit && dataEdit) {
            let addressArr = dataEdit?.address?.split(', ')
            // let street = addressArr[addressArr.length - 4]
            addressArr.length === 4 ? setDetailAddress(addressArr[0]) : addressArr.length === 5 ? setDetailAddress(`${addressArr[0]}, ${addressArr[1]}`) : setDetailAddress('')
        }
    }, [dataEdit])

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${detailAddress ? `${detailAddress}, ` : ''}${+ward > 0 ? `${wards?.find(item => item.code === +ward)?.name}, ` : ''}${+district > 0 ? `${districts?.find(item => item.code === +district)?.name}, ` : ''}${+province > 0 ? provinces?.find(item => item.code === +province)?.name : ''}`
        }))
    }, [province, district, ward, detailAddress])

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
                        options={districts}
                        label='Quận/Huyện'
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
                        `${detailAddress ? `${detailAddress}, ` : ''}${+ward > 0 ? `${wards?.find(item => item.code === +ward)?.name}, ` : ''}${+district > 0 ? `${districts?.find(item => item.code === +district)?.name}, ` : ''}${+province > 0 ? provinces?.find(item => item.code === +province)?.name : ''}`
                    }
                />
            </Flex>
        </Box>
    )
}

export default memo(Address)