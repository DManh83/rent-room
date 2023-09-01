import React, { useState } from 'react'
import { Card, DividerWithText, Layout } from '../components'
import { Button, FormControl, FormLabel, HStack, Heading, Input, Stack, chakra, useToast } from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmiting, setIsSubmitting] = useState(false)
    const { login, signInWithGoogle } = useAuth()
    const toast = useToast()

    const navigate = useNavigate()
    const mounted = useMounted()

    const location = useLocation()
    console.log(location)

    const handleRedirectToOrBack = () => {
        navigate(location.state?.from ?? '/quan-ly-tai-khoan')
    }

    const handleLogin = async (e) => {
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
        // try {
        //     await login(email, password)
        //     handleRedirectToOrBack()
        // } catch (e) {
        //     console.log(e.message)
        //     toast({
        //         description: e.message,
        //         status: 'error',
        //         duration: 9000,
        //         isClosable: true
        //     })
        // }
        // finally {
        //     mounted.current && setIsSubmitting(false)
        // }
        login(email, password)
            .then(res => {
                handleRedirectToOrBack()
            })
            .catch(error => {
                console.log(error.message)
                toast({
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .finally(() => {
                // setTimeout(() => {
                //   mounted.current && setIsSubmitting(false)
                //   console.log(mounted.current)
                // }, 1000)
                mounted.current && setIsSubmitting(false)
            })
    }
    const goRegister = () => {
        navigate('/dang-ky')
    }
    const handleSigninGoogle = async () => {
        try {
            await signInWithGoogle()
            handleRedirectToOrBack()
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     setValue(localStorage.getItem('email'))
    // })

    return (
        <Layout>
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
                                // autoComplete='email'
                                required />
                        </FormControl>
                        <FormControl className='password'>
                            <FormLabel>MẬT KHẨU</FormLabel>
                            <Input
                                name='password'
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                // autoComplete='password'
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
                        <Link to='/quen-mat-khau'>Quên mật khẩu?</Link>
                    </Button>
                    <Button variant='link' onClick={goRegister}>
                        Bạn chưa có tài khoản?
                    </Button>
                </HStack>
                <DividerWithText my={6}>HOẶC</DividerWithText>
                {/* {value ? <Home /> : */}
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
        </Layout >
    )
}

export default Login