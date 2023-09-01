import { Badge, Container, Heading, chakra } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
    const { user } = useAuth()
    return (
        <Layout>
            <Heading>
                Profile
                <Badge colorScheme='green' fontSize='lg' mx={4}>
                    Protected Page
                </Badge>
            </Heading>
            <Container maxW='container.lg' overflowX='auto' py={4}>
                <chakra.pre p={4}>
                    {user && <pre> {JSON.stringify(user, null, 2)}</pre>}
                </chakra.pre>
            </Container>
        </Layout>
    )
}

export default Profile