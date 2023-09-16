import React from 'react'
import { HStack, Image, chakra } from '@chakra-ui/react'
import avatarDefault from '../assets/avatar-default.jpg'
import { useAuth } from '../hooks/useAuthContext'


const User = () => {

    const { user } = useAuth()

    console.log(user)
    return (
        <HStack justifyContent={'flex-end'}>
            <Image src={user?.photoURL || avatarDefault} alt='avatar' borderRadius='full' boxSize='45px' />
            <chakra.span> Xin chào! <chakra.span fontWeight='semibold'>{user?.displayName}</chakra.span></chakra.span>
        </HStack>
    )
}

export default User