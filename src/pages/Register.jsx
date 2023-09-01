import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, DividerWithText, Layout } from '../components'
import { Button, Center, FormControl, FormLabel, Heading, Input, Stack, chakra, useToast } from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmiting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const { register, signInWithGoogle } = useAuth()

    const mounted = useMounted()

    const handleRegister = async (e) => {
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
        try {
            await register(email, password)
            navigate('/quan-ly-tai-khoan')
        } catch (e) {
            console.log(e.message)
            toast({
                description: e.message,
                status: 'error',
                duration: 9000,
                isClosable: true
            })
        }
        finally {
            mounted.current && setIsSubmitting(false)
        }
    }
    const goLogin = () => {
        navigate('/dang-nhap')
    }
    const handleSigninGoogle = async () => {
        try {
            await signInWithGoogle()
            navigate('/quan-ly-tai-khoan')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Heading textAlign='center' my={12}>
                ĐĂNG KÝ
            </Heading>
            <Card maxW='lg' mx='auto' mt={4} >
                <chakra.form
                    onSubmit={handleRegister}
                >
                    <Stack spacing='6'>
                        <FormControl className='email'>
                            <FormLabel>EMAIL</FormLabel>
                            <Input
                                name='email'
                                onChange={e => setEmail(e.target.value)}
                                type='email'
                                // autoComplete='off'
                                required
                            />
                        </FormControl>
                        <FormControl className='password'>
                            <FormLabel>MẬT KHẨU</FormLabel>
                            <Input
                                name='password'
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                // autoComplete='off'
                                required />
                        </FormControl>
                        <Button
                            isLoading={isSubmiting}
                            type='submit'
                            colorScheme='primary'
                            size='lg'
                            fontSize='md'
                        >
                            Đăng ký
                        </Button>
                    </Stack>
                </chakra.form>
                <Center my={4}>
                    <Button variant='link' onClick={goLogin}>Bạn đã có tài khoản?</Button>
                </Center>
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
        </Layout >

    )
}

export default Register