import React, { useState } from 'react'
import { Card, DividerWithText } from '../../components'
import { Button, Center, FormControl, FormLabel, Heading, Input, Stack, useToast, chakra, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { path } from '../../ultis/constant'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const { forgotPassword } = useAuth()
    const toast = useToast()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await forgotPassword(email)
            toast({
                description: 'Email đã gửi, kiểm tra email.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
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
                Forgot Password
            </Heading>
            <Card maxW='lg' mx='auto' mt={4}>
                <chakra.form onSubmit={handleSubmit}>
                    <Stack spacing={6}>
                        <FormControl className='email'>
                            <FormLabel>
                                EMAIL
                            </FormLabel>
                            <Input
                                name='email'
                                type='email'
                                onChange={e => setEmail(e.target.value)}
                                autoComplete='email'
                                required />

                        </FormControl>
                        <Button
                            type='submit'
                            colorScheme='primary'
                            size='lg'
                            fontSize='md'
                        >
                            Xác nhận email
                        </Button>
                    </Stack>
                </chakra.form>
                <DividerWithText my={6}>HOẶC</DividerWithText>
                <Center>
                    <Button variant='link' onClick={() => { navigate(path.LOGIN) }}>
                        Đăng nhập
                    </Button>
                </Center>

            </Card>
        </Box>
    )
}

export default ForgotPassword
