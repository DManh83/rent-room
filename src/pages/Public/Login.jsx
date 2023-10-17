import React, { useState } from 'react'
import { Card, DividerWithText } from '../../components'
import { Box, Button, FormControl, FormLabel, HStack, Heading, Input, Stack, chakra, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import icons from '../../ultils/icons'
import useMounted from '../../hooks/useMounted'
import { path } from '../../ultils/constant'
import { useAuthentication } from '../../hooks/useAuthentication'

const { FaGoogle } = icons

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmiting, setIsSubmitting] = useState(false)
    const { login, signInWithGoogle } = useAuthentication()
    const toast = useToast()

    const navigate = useNavigate()
    const mounted = useMounted()

    const handleLogin = (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast({
                description: 'Credentials not valid.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        setIsSubmitting(true)
        login(email, password)
        navigate(path.HOME)
        mounted.current && setIsSubmitting(false)
    }
    const goRegister = () => {
        navigate(path.REGISTER)
    }
    const handleSigninGoogle = () => {
        signInWithGoogle()

        navigate(path.HOME)
    }

    return (
        <Box w='full'>
            <Heading textAlign='center' my={12}>
                ĐĂNG NHẬP
            </Heading>
            <Card maxW='lg' mx='auto' mt={4}>
                <chakra.form
                    onSubmit={handleLogin}
                >
                    <Stack spacing={6}>
                        <FormControl className='email'>
                            <FormLabel>EMAIL</FormLabel>
                            <Input
                                name='email'
                                onChange={e => setEmail(e.target.value)}
                                type='email'
                                autoComplete='email'
                                required />
                        </FormControl>
                        <FormControl className='password'>
                            <FormLabel>MẬT KHẨU</FormLabel>
                            <Input
                                name='password'
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                autoComplete='current-password'
                                required />
                        </FormControl>
                        <Button
                            type='submit'
                            isLoading={isSubmiting}
                            colorScheme='primary'
                            size='lg'
                            fontSize='md'
                        >
                            Đăng nhập
                        </Button>

                    </Stack>
                </chakra.form>
                <HStack justifyContent='space-between' my={4}>
                    <Button variant='link'>
                        <Link to={`/${path.FORGOTPASSWORD}`}>Quên mật khẩu?</Link>
                    </Button>
                    <Button variant='link' onClick={goRegister}>
                        Bạn chưa có tài khoản?
                    </Button>
                </HStack>
                <DividerWithText my={6}>HOẶC</DividerWithText>
                <Button
                    variant='outline'
                    width={{ base: '100%' }}
                    colorScheme='red'
                    leftIcon={<FaGoogle />}
                    onClick={handleSigninGoogle}
                >
                    Đăng nhập với Google
                </Button>

            </Card>
        </Box>
    )
}

export default Login