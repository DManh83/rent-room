import React from 'react'
import { Badge, Box, Container, Heading } from '@chakra-ui/react'

const Protected = () => {
    return (
        <Box>
            <Heading>
                Protected
                <Badge colorScheme='green' fontSize='lg' mx={4}>
                    Protected Page
                </Badge>
            </Heading>
            <Container maxW='container.lg' overflowX='auto' py={4} />
        </Box>
    )
}

export default Protected