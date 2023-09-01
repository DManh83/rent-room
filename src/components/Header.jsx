import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Navlink from './Navlink'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import menuManage from '../ultis/menuManage'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Header = () => {
    const { toggleColorMode } = useColorMode()

    const { logout, user } = useAuth()

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <Box
            borderBottom='2px'
            borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
            mb={4}
        >
            <HStack py={4} justifyContent='flex-end' maxW='container.lg' mx='auto'>
                <Navlink to='/' name='LOGO' size='lg' />
                <Spacer />
                {!user && <Navlink to='/dang-nhap' name='Đăng nhập' />}
                {!user && <Navlink to='/dang-ky' name='Đăng ký' />}
                {user &&
                    <Menu>
                        <MenuButton
                            as={Button} rightIcon={<ChevronDownIcon />}
                        >
                            Quản lý tài khoản
                        </MenuButton>
                        <MenuList>
                            {menuManage.map(item => {
                                return (
                                    <MenuItem className='hover:text-orange-500 border-b border-gray-200 py-2' key={item.id}>
                                        <Link className='flex items-center gap-2' to={item.path}>
                                            {item?.icon}{item.text}
                                        </Link>
                                    </MenuItem>
                                )
                            })}
                            <MenuItem> Đăng xuất </MenuItem>
                        </MenuList>
                    </Menu>
                }
                {/* {user && <Navlink to='/protected-page' name='Protected' />} */}
                {/* {user && <Navlink
                    to='/dang-xuat'
                    name='Đăng xuất'
                    onClick={handleLogout}
                />} */}
                {user &&
                    <Button
                        variant='outline'
                    >
                        Đăng tin mới
                    </Button>
                }
                <IconButton
                    variant='outline'
                    icon={useColorModeValue(<FaSun />, <FaMoon />)}
                    onClick={toggleColorMode}
                    aria-label='toggle-dark-mode'
                />
            </HStack>
        </Box>


    )
}

export default Header