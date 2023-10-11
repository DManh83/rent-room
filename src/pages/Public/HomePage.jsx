import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { ItemSidebar, Province } from '../../components'
import List from './List'
import { useApp } from '../../hooks/useReducerContext'
import { fetchAreas, fetchCategories, fetchPrices } from '../../store/fetch/app'

const HomePage = () => {
    const { categories, prices, areas, dispatchApp } = useApp()
    useEffect(() => {
        fetchCategories(dispatchApp)
        fetchPrices(dispatchApp)
        fetchAreas(dispatchApp)
    }, [dispatchApp])

    return (
        <Flex direction='column' gap={3} w='1100px' justify='space-between' alignItems='center'>
            <Province />
            <Flex w='full' gap={4}>
                <Box w='70%'>
                    <List />
                </Box>
                <Flex direction='column' w='30%' gap={4} justify='start' align='center'>
                    <ItemSidebar title='Danh sách cho thuê' content={categories} />
                    <ItemSidebar isDouble={true} type='priceCode' title='Xem theo giá' content={prices} />
                    <ItemSidebar isDouble={true} type='areaCode' title='Xem theo diện tích' content={areas} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default HomePage