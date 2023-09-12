import React, { useState } from 'react'
import { Card } from '../../components'
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, chakra, useToast } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { path } from '../../ultis/constant'

const useQuery = () => {
    const location = useLocation()
    return new URLSearchParams(location.search)
}

const ResetPassword = () => {
    const navigate = useNavigate()
    const { resetPassword } = useAuth()
    const query = useQuery()
    const [newPassword, setNewpassword] = useState('')
    const toast = useToast()
    console.log(query.get('mode'))
    console.log(query.get('oobCode'))
    console.log(query.get('continueUrl'))
    const handleResetPassword = async (e) => {
        e.preventDefault()

        try {
            await resetPassword(query.get('oobCode'), newPassword)
            toast({
                description: 'Mật khẩu đã thay đổi!!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate(path.LOGIN)
        } catch (e) {
            console.log(e.message)
            toast({
                description: e.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    return (
        <Box>
            <Heading textAlign='center' my={12}>
                TẠO LẠI MẬT KHẨU
            </Heading>
            <Card maxW='lg' mx='auto' mt='4'>
                <chakra.form onSubmit={handleResetPassword}>
                    <Stack spacing={6}>
                        <FormControl className='password'>
                            <FormLabel>
                                MẬT KHẨU MỚI
                            </FormLabel>
                            <Input
                                type='password'
                                name='password'
                                onChange={e => setNewpassword(e.target.value)}
                                autoComplete='new-password'
                                required />
                        </FormControl>
                        <Button type='submit' colorScheme='primary' size='lg' fontSize='md'>
                            XÁC NHẬN
                        </Button>
                    </Stack>
                </chakra.form>
            </Card>
        </Box>
    )
}

export default ResetPassword