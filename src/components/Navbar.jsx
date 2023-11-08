import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Navlink from './Navlink'
import { useApp } from '../hooks/useReducerContext'
import { formatVietnameseToString } from '../ultils/common/formatVietnameseToString'

const Navbar = () => {
    const { categories, dispatchApp } = useApp()

    useEffect(() => {
        dispatchApp('GET_CATEGORIES')
    }, [dispatchApp])

    return (

        <Box
            backgroundColor={useColorModeValue('pink.200')}
            borderBottom='2px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        // mb={4}
        >
            <HStack py={2} justifyContent='space-between' maxW='1100px' mx='auto'>
                <Navlink to={`/`} name={'Trang chủ'} />

                {categories?.length > 0 && categories.map((item) => {
                    return (
                        <Navlink key={item.id} to={`/${formatVietnameseToString(item.value)}?categoryCode=${item.id}`} name={item.value} />
                    )
                })}
            </HStack>
        </Box>

    )
}

export default Navbar