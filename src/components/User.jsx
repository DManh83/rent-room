import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { HStack, Image, chakra } from '@chakra-ui/react'
import avatarDefault from '../assets/avatar-default.jpg'


const User = () => {

    const { user } = useAuth()
    // console.log(user?.photoURL)
    return (
        <HStack justifyContent={'flex-end'}>
            <Image src={user?.photoURL || avatarDefault} alt='avatar' borderRadius='full' boxSize='45px' />
            <chakra.span> Xin chào! <chakra.span fontWeight='semibold'>{user?.displayName}</chakra.span></chakra.span>
        </HStack>
    )
}

export default User