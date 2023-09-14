import React from 'react'
import ProvinceBtn from './ProvinceBtn'
import { Flex } from '@chakra-ui/react'
import { location } from '../ultils/constant'

const Province = () => {
    return (
        <Flex alignItems='center' gap={5} justifyContent='center' py={5}>
            {location.map(item => {
                return (
                    <ProvinceBtn key={item.id} name={item.name} image={item.image} />
                )
            })}
        </Flex>
    )
}

export default Province