import React from 'react'
import { Layout } from '../components'
import { Badge, Container, Heading } from '@chakra-ui/react'

const Protected = () => {
    return (
        <Layout>
            <Heading>
                Protected
                <Badge colorScheme='green' fontSize='lg' mx={4}>
                    Protected Page
                </Badge>
            </Heading>
            <Container maxW='container.lg' overflowX='auto' py={4} />
        </Layout>
    )
}

export default Protected