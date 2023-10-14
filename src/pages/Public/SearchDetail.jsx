import React, { useEffect } from 'react'
import { Province, ItemSidebar } from '../../components'
import { List } from './index'
import { useLocation } from 'react-router-dom'
import { useApp } from '../../hooks/useReducerContext'
import { Box, Flex, chakra } from '@chakra-ui/react'
import { fetchAreas, fetchPrices } from '../../store/fetch/app'


const SearchDetail = () => {
    const { prices, areas, dispatchApp } = useApp()
    const location = useLocation()

    useEffect(() => {
        fetchAreas(dispatchApp)
        fetchPrices(dispatchApp)
    }, [dispatchApp])

    return (
        <Flex direction='column' gap={3} w='full'>
            <Box>
                <chakra.h1 fontSize='28px' fontWeight='bold'>{location?.state?.titleSearch || 'Kết quả tìm kiếm'}</chakra.h1>
                <chakra.p fontSize='16px' lineHeight='24px' textColor='gray.700'>{`${location.state?.titleSearch || ''} phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</chakra.p>
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