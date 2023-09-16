import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Navlink from './Navlink'
import menuManage from '../ultils/menuManage'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'
import { icons } from '../ultils/icons'
import User from './User'
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuth } from '../hooks/useAuthContext'

const Header = () => {
    const { toggleColorMode } = useColorMode()

    const { logout } = useAuthentication()
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <Box
            borderBottom='2px'
            borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
        >
            <HStack py={4} justifyContent='flex-end' maxW='1100px' mx='auto'>
                <Navlink to={path.HOME} name='LOGO' size='lg' />
                <Spacer />
                {!user && <Navlink to={path.LOGIN} name='Đăng nhập' />}
                {!user && <Navlink to={path.REGISTER} name='Đăng ký' />}
                {user &&
                    <User />
                }
                {user &&
                    <Menu>
                        <MenuButton
                            as={Button} rightIcon={<icons.ChevronDownIcon />}
                            variant='ghost'
                            colorScheme='gray'
                        >
                            Quản lý tài khoản
                        </MenuButton>
                        <MenuList>
                            {menuManage.map(item => {
                                return (
                                    <MenuItem
                                        alignItems='center'
                                        _hover={{
                                            textColor: 'orange.500'
                                        }}
                                        borderBottom='1px'
                                        borderColor='gray.200'
                                        py={2}
                                        flex
                                        gap={2}
                                        key={item.id} onClick={() => navigate(item.path)}
                                    >
                                        {item?.icon}{item.text}
                                    </MenuItem>
                                )
                            })}
                            <MenuItem
                                _hover={{
                                    textColor: 'orange.500'
                                }}
                                flex
                                gap={2}
                                alignItems='center'
                                // className=' hover:text-orange-500 flex items-center gap-2'
                                onClick={handleLogout}
                            >
                                <icons.AiOutlineLogout /> Đăng xuất
                            </MenuItem>
                        </MenuList>
                    </Menu>
                }
                {user &&
                    <Navlink to={'/he-thong/tao-tin-dang'} name='Đăng tin mới' />
                }
                <IconButton
                    variant='outline'
                    icon={useColorModeValue(<icons.FaSun />, <icons.FaMoon />)}
                    onClick={toggleColorMode}
                    aria-label='toggle-dark-mode'
                />
            </HStack>
        </Box>


    )
}

export default Header