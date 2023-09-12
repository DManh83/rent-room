import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Search from './Search'
import { ProvinceBtn } from '../../components'
import { location } from '../../ultils/constant'

const HomePage = () => {
    return (
        <Flex direction='column' gap={3} w='full' >
            <Flex alignItems='center' gap={5} justifyContent='center' py={5} shadow='md'>
                {location.map(item => {
                    return (
                        <ProvinceBtn key={item.id} name={item.name} image={item.image} />
                    )
                })}
            </Flex>
        </Flex>
    )
}

export default HomePage