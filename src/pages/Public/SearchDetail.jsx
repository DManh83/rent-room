import React from 'react'
import { Province, ItemSidebar } from '../../components'
import { List } from './index'
import { useLocation } from 'react-router-dom'
import { useApp } from '../../hooks/useReducerContext'
import { Box, Flex, chakra } from '@chakra-ui/react'


const SearchDetail = () => {
    const { prices, areas } = useApp()
    const location = useLocation()

    return (
        <Flex direction='column' gap={3} w='full'>
            <Box>
                <chakra.h1 fontSize='28px' fontWeight='bold'>{location?.state?.titleSearch || 'Kết quả tìm kiếm'}</chakra.h1>
                <chakra.p fontSize='16px' lineHeight='24px' textColor='gray.700'>{`${location.state?.titleSearch || ''} - Kênh đăng tin cho thuê phòng: giá rẻ, chính chủ, đầy đủ tiện nghi với nhiều mức giá, diện tích khác nhau`}</chakra.p>
            </Box>
            <Province />
            <Flex gap={4} w='full'>
                <Box w='70%'>
                    <List />
                </Box>
                <Flex w='30%' direction='column' gap={4} justify='start' align='center'>
                    <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SearchDetail