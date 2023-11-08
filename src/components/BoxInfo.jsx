import { Avatar, Box, Button, Flex, Link, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import avatarDefault from '../assets/avatar-default.png'
import icons from '../ultils/icons'

const { MdCall } = icons

const BoxInfo = ({ userData }) => {
    return (
        <Flex direction='column' align='center' p={4} w='full' bg='yellow.300' rounded='md'>
            <Avatar src={userData?.avatar || avatarDefault} name='avatar' size='xl' borderRadius='full' bg='gray.200' cursor='pointer' />
            <chakra.h3 fontWeight='medium' fontSize='xl'>{userData?.name}</chakra.h3>
            <Flex w='full' p={4} direction='column' gap={2}>
                <Link bg='green.300' display='flex' alignItems='center' justifyContent='center' gap={2} w='full' h='35px' rounded='md' href={`tel: ${userData?.phone}`}>
                    <MdCall /> {userData?.phone}
                </Link>

                {/* <Button leftIcon={<MdCall />} w='full' bg='green.300'><a href={`tel:${userData?.phone}`}>{userData?.phone}</a></Button> */}
            </Flex>
        </Flex>
    )
}

export default memo(BoxInfo)