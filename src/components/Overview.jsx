import { Box, Flex, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import SelectOptions from './SelectOptions'
import optionsCategory from '../ultils/optionsCategory'
import InputForm from './InputForm'
import { useAuth } from '../hooks/useAuthContext'

const targets = [
    { code: 'All', value: 'Tất cả' },
    { code: 'Nam', value: 'Nam' },
    { code: 'Nữ', value: 'Nữ' }
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
                    <FormControl>
                        <FormLabel htmlFor='name'>Thông tin liên hệ</FormLabel>
                        <Input type='text' id='name' defaultValue={user?.displayName} />
                    </FormControl>
                    <InputForm type='tel' id='phone' label='Điện thoại' />
                    <InputForm
                        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
                        type='text'
                        id='price'
                        label='Giá cho thuê'
                        unit='đồng'
                        name='priceNumber'
                        value={payload.priceNumber}
                        setValue={setPayload}
                    />
                    <InputForm
                        type='text'
                        id='area'
                        label='Diện tích'
                        unit='m2'
                        name='areaNumber'
                        value={payload.areaNumber}
                        setValue={setPayload}
                    />
                    <SelectOptions
                        value={payload.target}
                        setValue={setPayload}
                        name='target'
                        options={targets}
                        label='Đối tượng cho thuê'
                    />
                </Flex>

            </Flex>
            <Box>

            </Box>

        </Box>
    )
}

export default Overview