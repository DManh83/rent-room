import { Avatar, Button, Flex, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import avatarDefault from '../assets/avatar-default.png'
import icons from '../ultils/icons'

const { MdCall, SiZalo } = icons

const BoxInfo = ({ userData }) => {
    return (
        <Flex direction='column' align='center' p={4} w='full' bg='yellow.300' rounded='md'>
            <Avatar src={userData?.avatar || avatarDefault} name='avatar' size='xl' borderRadius='full' bg='gray.200' cursor='pointer' />
            <chakra.h3 fontWeight='medium' fontSize='xl'>{userData?.name}</chakra.h3>
            <Flex w='full' p={4} direction='column' gap={2}>
                <Button leftIcon={<MdCall />} w='full' bg='green.300' textColor='white'>
                    {userData?.phone}
                </Button>
                <Button as='a' leftIcon={<SiZalo className='bg-blue-500 rounded-full text-3xl text-white p-1' />} w='full' href={`https://zalo.me/${userData?.phone}`}>
                    Nhắn Zalo
                </Button>
            </Flex>
        </Flex>
    )
}

export default memo(BoxInfo)