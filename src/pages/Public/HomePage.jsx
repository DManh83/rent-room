import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Province } from '../../components'
import List from './List'

const HomePage = () => {
    return (
        <Flex direction='column' gap={3} w='full'>
            <Province />
            <Flex w='full' gap={4}>
                <Box w='70%'>
                    <List />
                </Box>
                <Box w='30%' border='1px' borderColor='green'>
                    Sidebar
                </Box>
            </Flex>
        </Flex>
    )
}

export default HomePage