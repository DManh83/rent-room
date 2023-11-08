import React from 'react'
import { HStack, Image, chakra } from '@chakra-ui/react'
import avatarDefault from '../assets/avatar-default.png'
import { useAuth } from '../hooks/useReducerContext'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'


const User = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleClick = () => {
        navigate(`${path.SYSTEM}/${path.PROFILE}`)
    }

    // console.log(user)
    return (
        <HStack justifyContent={'flex-end'}>
            <Image onClick={handleClick} src={user?.avatar || avatarDefault} alt='avatar' borderRadius='full' boxSize='45px' cursor='pointer' />
            <chakra.span onClick={handleClick} cursor='pointer'> Xin chào! <chakra.span fontWeight='semibold'>{user?.name || user?.displayName}</chakra.span></chakra.span>
        </HStack>
    )
}

export default User