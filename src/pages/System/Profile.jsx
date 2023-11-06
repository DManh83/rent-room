import { Badge, Box, Container, Heading, chakra } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../hooks/useReducerContext'

const Profile = () => {
    const { user } = useAuth()
    return (
        <Box>
            <Heading>
                Thông tin cá nhân

            </Heading>
            <Container maxW='container.lg' overflowX='auto' py={4}>
                <chakra.pre p={4}>
                    {user && <pre> {JSON.stringify(user, null, 2)}</pre>}
                </chakra.pre>
            </Container>
        </Box>
    )
}

export default Profile