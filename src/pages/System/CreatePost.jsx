import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { Address, Overview } from '../../components'

const CreatePost = () => {
    return (
        <Flex
            px={6}
            direction='column'
            gap={4}
        >
            <Heading
                borderBottom='1px'
                borderColor='gray.200'
                py={4}
                fontWeight='medium'
                size='2xl'
            >
                Đăng tin mới
            </Heading>
            <Flex gap={4}>
                <Flex
                    py={4}
                    direction='column'
                    gap={4}
                    flex='auto'
                >
                    <Address />
                    <Overview />
                </Flex>
                <Flex
                    w='30%'
                    flex='none'
                >
                    Maps
                </Flex>
            </Flex>

        </Flex>
    )
}

export default CreatePost