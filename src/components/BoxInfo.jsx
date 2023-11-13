import { Avatar, Box, Button, Flex, Link, chakra } from '@chakra-ui/react'
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
                {/* <Link bg='green.300' display='flex' alignItems='center' justifyContent='center' gap={2} w='full' h='35px' rounded='md' href={`tel: ${userData?.phone}`}>
                    <MdCall /> {userData?.phone}
                </Link> */}
                <Link display='flex' gap={2}
                    alignItems='center' justifyContent='center'
                    w='full' h='40px' rounded='md'
                    bg='white'
                    _hover={{
                        bg: 'gray.100'
                    }}
                    fontWeight='bold'
                    href={`https://zalo.me/${userData?.phone}`}>
                    <SiZalo className='bg-blue-500 rounded-full text-2xl text-white' /> Nhắn Zalo
                </Link>

            </Flex>
        </Flex>
    )
}

export default memo(BoxInfo)