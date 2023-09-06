import { Box, Flex, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import SelectOptions from './SelectOptions'
import optionsCategory from '../ultis/optionsCategory'
import { useAuth } from '../contexts/AuthContext'

const Overview = () => {
    const { user } = useAuth()
    return (
        <Box>
            <Heading size='lg' py={4}>
                Thông tin mô tả
            </Heading>
            <Flex direction='column' gap={4}>
                <Box w='lg'>
                    <SelectOptions options={optionsCategory} label='Loại chuyên mục' />
                </Box>
                <FormControl>
                    <FormLabel htmlFor='title'>Tiêu đề</FormLabel>
                    <Input type='text' id='title' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='desc'>Nội dung mô tả</FormLabel>
                    <Textarea id='desc' cols={30} rows={10} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='name'>Thông tin liên hệ</FormLabel>
                    <Input type='text' id='name' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='phone'>Điện thoại</FormLabel>
                    <Input type='tel' id='phone' />
                </FormControl>
            </Flex>

        </Box>
    )
}

export default Overview