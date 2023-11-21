import React, { useState, useEffect } from 'react'
import { ItemSidebar } from '../../components'
import { List } from './index'
import { useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/common/formatVietnameseToString'
import { useApp } from '../../hooks/useReducerContext'
import { Box, Flex, chakra } from '@chakra-ui/react'


const Rental = () => {
    const { prices, areas, categories } = useApp()
    const [categoryCurrent, setCategoryCurrent] = useState({})
    const location = useLocation()

    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
        setCategoryCurrent(category)
    }, [location])

    return (
        <Flex direction='column' gap={3} w='full'>
            <Box>
                <chakra.h1 fontSize='28px' fontWeight='bold'>{categoryCurrent?.header}</chakra.h1>
                <chakra.p fontSize='16px' lineHeight='24px' textColor='gray.700'>{categoryCurrent?.subheader}</chakra.p>
            </Box>
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

export default Rental