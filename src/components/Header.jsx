import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Navlink from './Navlink'
import { useAuth } from '../contexts/AuthContext'
import menuManage from '../ultis/menuManage'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultis/constant'
import { icons } from '../ultis/icons'

const Header = () => {
    const { toggleColorMode } = useColorMode()

    const { logout, user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <Box
            borderBottom='2px'
            borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
        >
            <HStack py={4} justifyContent='flex-end' maxW='container.lg' mx='auto'>
                <Navlink to={path.HOME} name='LOGO' size='lg' />
                <Spacer />
                {!user && <Navlink to={path.LOGIN} name='Đăng nhập' />}
                {!user && <Navlink to={path.REGISTER} name='Đăng ký' />}
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
                                    <MenuItem className='hover:text-orange-500 border-b border-gray-200 py-2 flex items-center gap-2' key={item.id} onClick={() => navigate(item.path)}>
                                        {item?.icon}{item.text}
                                    </MenuItem>
                                )
                            })}
                            <MenuItem className=' hover:text-orange-500 flex items-center gap-2' onClick={handleLogout}> <icons.AiOutlineLogout /> Đăng xuất </MenuItem>
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