import { Box, Button, Flex, Image, chakra } from '@chakra-ui/react'
import React from 'react'
import AvatarDefault from '../../assets/avatar-default.jpg'
import menuSidebar from '../../ultils/menuSidebar'
import icons from '../../ultils/icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useReducerContext'
import { useAuthentication } from '../../hooks/useAuthentication'

const { AiOutlineLogout } = icons

const SideBar = () => {
    const { logout } = useAuthentication()
    const { user } = useAuth()
    // console.log(user?.email)
    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }
    return (
        <Flex w='256px' p={4} direction='column' gap={6}>
            <Flex direction='column' gap={4}>
                <Flex align='center' gap={4}>
                    <Image src={user?.photoURL || AvatarDefault} alt='avatar' borderRadius='full' boxSize='45px' />
                    <Flex direction='column' justify='center'>
                        <chakra.span fontWeight='semibold'>{user?.displayName}</chakra.span>
                        <chakra.small>{user?.email}</chakra.small>
                    </Flex>
                </Flex>
                <chakra.span fontWeight='medium'>
                    Mã thành viên: <chakra.span>{user?.uid?.match(/\d/g).join('')}</chakra.span>
                </chakra.span>
            </Flex>
            <Box py={4}>
                {menuSidebar.map(item => {
                    return (
                        <Box
                            key={item.id}
                            _hover={{
                                textColor: 'orange.500'
                            }}
                            borderBottom='1px'
                            borderColor='gray.200'
                            py={2}
                        >
                            <Link
                                to={item?.path}
                                className=' flex
                                gap-2'
                            >
                                {item?.icon}
                                {item.text}
                            </Link>
                        </Box>
                        // <Navlink
                        //     key={item.id}
                        //     to={item?.path}
                        //     name={item.text}
                        //     w='full'
                        //     leftIcon={item?.icon}
                        //     align='center'
                        //     fontWeight='medium'

                        // />

                    )
                })}
                <Box paddingTop={4}>
                    <Button
                        onClick={handleLogout}
                        w='full'
                        bg='red.300'
                        leftIcon={<AiOutlineLogout />}
                    >
                        Đăng xuất
                    </Button>
                </Box>

            </Box>
        </Flex >
    )
}

export default SideBar