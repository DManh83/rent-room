import { Box, Flex, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import SelectOptions from './SelectOptions'
import optionsCategory from '../ultils/optionsCategory'
import InputForm from './InputForm'
import { useAuth } from '../hooks/useReducerContext'

const targets = [
    { code: 'Tất cả', value: 'Tất cả' },
    { code: 'Nam', value: 'Nam' },
    { code: 'Nữ', value: 'Nữ' }
]
const optionKitchen = [
    { code: 'Riêng', value: 'Bếp riêng' },
    { code: 'Chung', value: 'Bếp chung' }
]
const optionBathroom = [
    { code: 'Riêng', value: 'Nhà vệ sinh riêng' },
    { code: 'Chung', value: 'Nhà vệ sinh chung' }
]
const optionParking = [
    { code: 'Có', value: 'Có' },
    { code: 'Không', value: 'Không' }
]

const Overview = ({ payload, setPayload }) => {
    const { user } = useAuth()
    return (
        <Box>
            <Heading size='lg' py={4}>
                Thông tin mô tả
            </Heading>
            <Flex direction='column' gap={4}>
                <SelectOptions
                    w='50%'
                    options={optionsCategory}
                    label='Loại chuyên mục'
                    value={payload.categoryCode}
                    setValue={setPayload}
                    name='categoryCode'
                />
                <InputForm
                    value={payload.title}
                    setValue={setPayload}
                    name='title'
                    type='text'
                    id='title'
                    label='Tiêu đề' />
                <FormControl>
                    <FormLabel htmlFor='desc'>Nội dung mô tả</FormLabel>
                    <Textarea
                        id='desc'
                        cols={30}
                        rows={10}
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                    />
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
                    />
                    <InputForm
                        type='number'
                        id='area'
                        label='Diện tích'
                        unit='m²'
                        name='areaNumber'
                        value={payload.areaNumber}
                        setValue={setPayload}
                    />
                    <InputForm
                        type='text'
                        id='furniture'
                        label='Nội thất'
                        name='furniture'
                        value={payload.furniture}
                        setValue={setPayload}
                    />
                    <SelectOptions
                        value={payload.kitchen}
                        setValue={setPayload}
                        name='kitchen'
                        options={optionKitchen}
                        label='Bếp'
                    />
                    <SelectOptions
                        value={payload.bathroom}
                        setValue={setPayload}
                        name='bathroom'
                        options={optionBathroom}
                        label='Tolet'
                    />
                    <SelectOptions
                        value={payload.parking}
                        setValue={setPayload}
                        name='parking'
                        options={optionParking}
                        label='Chỗ để xe'
                    />
                    <SelectOptions
                        value={payload.target}
                        setValue={setPayload}
                        name='target'
                        options={targets}
                        label='Đối tượng cho thuê'
                    />
                    <FormControl>
                        <FormLabel htmlFor='name'>Thông tin liên hệ</FormLabel>
                        <Input type='text' id='name' defaultValue={user?.displayName} />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='phone'>Số điện thoại</FormLabel>
                        <Input type='text' id='phone' defaultValue={user?.phone} />
                    </FormControl>
                </Flex>

            </Flex>
            <Box>

            </Box>

        </Box>
    )
}

export default Overview