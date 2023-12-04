import { Box, Flex, FormControl, FormLabel, Heading, Input, Textarea, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import SelectOptions from './SelectOptions'
import InputForm from './InputForm'
import { useApp } from '../hooks/useReducerContext'

const targets = [
    { id: 'Tất cả', value: 'Tất cả' },
    { id: 'Nam', value: 'Nam' },
    { id: 'Nữ', value: 'Nữ' }
]
const optionKitchen = [
    { id: 'Riêng', value: 'Bếp riêng' },
    { id: 'Chung', value: 'Bếp chung' }
]
const optionBathroom = [
    { id: 'Riêng', value: 'Khép kín' },
    { id: 'Chung', value: 'Chung' }
]
const optionParking = [
    { id: 'Có', value: 'Có' },
    { id: 'Không', value: 'Không' }
]

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields, phone, setPhone, name, setName, date, setDate }) => {
    const { categories } = useApp()
    return (
        <Box>
            <Heading size='lg' py={4}>
                Thông tin mô tả
            </Heading>
            <Flex direction='column' gap={4}>
                <SelectOptions
                    w='50%'
                    options={categories}
                    label='Loại chuyên mục'
                    value={payload.categoryCode}
                    setValue={setPayload}
                    name='categoryCode'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <InputForm
                    value={payload.title}
                    setValue={setPayload}
                    name='title'
                    type='text'
                    id='title'
                    label='Tiêu đề'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                />
                <FormControl>
                    <FormLabel htmlFor='desc'>Nội dung mô tả</FormLabel>
                    <Textarea
                        id='desc'
                        cols={30}
                        rows={10}
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                        onFocus={() => setInvalidFields([])}
                    />
                    <chakra.small textColor='red.500' display='block'>
                        {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
                    </chakra.small>
                </FormControl>
                <Flex w='50%' direction='column' gap={2}>
                    <InputForm
                        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
                        type='number'
                        id='price'
                        label='Giá cho thuê'
                        unit='đồng'
                        name='priceNumber'
                        value={payload.priceNumber}
                        setValue={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputForm
                        type='number'
                        id='area'
                        label='Diện tích'
                        unit='m²'
                        name='areaNumber'
                        value={payload.areaNumber}
                        setValue={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                </Flex>
                <Flex direction='column' gap={4}>
                    <Flex
                        alignItems='center'
                        gap={4}
                    >
                        <SelectOptions
                            value={payload.kitchen}
                            setValue={setPayload}
                            name='kitchen'
                            options={optionKitchen}
                            label='Bếp'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />

                        <SelectOptions
                            value={payload.bathroom}
                            setValue={setPayload}
                            name='bathroom'
                            options={optionBathroom}
                            label='Nhà tắm/vệ sinh'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    </Flex>
                </Flex>

                <Flex direction='column' gap={4}>
                    <Flex
                        alignItems='center'
                        gap={4}
                    >
                        <SelectOptions
                            value={payload.parking}
                            setValue={setPayload}
                            name='parking'
                            options={optionParking}
                            label='Chỗ để xe'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />

                        <SelectOptions
                            value={payload.target}
                            setValue={setPayload}
                            name='target'
                            options={targets}
                            label='Đối tượng cho thuê'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    </Flex>
                </Flex>

                <Flex direction='column' gap={4}>
                    <Flex
                        alignItems='center'
                        gap={4}
                    >
                        <InputForm
                            type='text'
                            id='furniture'
                            label='Nội thất'
                            name='furniture'
                            value={payload.furniture}
                            setValue={setPayload}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <FormControl>
                            <FormLabel htmlFor='date'>Ngày hết hạn tin đăng</FormLabel>
                            <Input
                                type='datetime-local'
                                id='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                onFocus={() => setInvalidFields([])}
                            />
                            <chakra.small textColor='red.500' display='block'>
                                {invalidFields?.some(item => item.name === 'date') && invalidFields?.find(item => item.name === 'date')?.message}
                            </chakra.small>
                        </FormControl>
                    </Flex>
                </Flex>

                <Flex w='50%' direction='column' gap={2}>
                    <FormControl>
                        <FormLabel htmlFor='name'>Thông tin liên hệ</FormLabel>
                        <Input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            // defaultValue={user?.phone || ''}
                            onFocus={() => setInvalidFields([])}
                        />
                        <chakra.small textColor='red.500' display='block'>
                            {invalidFields?.some(item => item.name === 'name') && invalidFields?.find(item => item.name === 'name')?.message}
                        </chakra.small>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='phone'>Số điện thoại</FormLabel>
                        <Input
                            type='text'
                            id='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            // defaultValue={user?.phone || ''}
                            onFocus={() => setInvalidFields([])}
                        />
                        <chakra.small textColor='red.500' display='block'>
                            {invalidFields?.some(item => item.name === 'phone') && invalidFields?.find(item => item.name === 'phone')?.message}
                        </chakra.small>
                    </FormControl>

                </Flex>

            </Flex>
            <Box>

            </Box>

        </Box >
    )
}

export default memo(Overview)