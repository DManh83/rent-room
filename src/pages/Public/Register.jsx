import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, DividerWithText } from '../../components'
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Stack, chakra, useToast } from '@chakra-ui/react'
import useMounted from '../../hooks/useMounted'
import { path } from '../../ultils/constant'
import { icons } from '../../ultils/icons'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [isSubmiting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const { register, signInWithGoogle } = useAuthentication()


    const mounted = useMounted()

    const handleRegister = (e) => {
        e.preventDefault()
        if (!email || !password || !name || !phone) {
            toast({
                description: 'Thông tin không hợp lệ',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        setIsSubmitting(true)
        register(email, password, name, phone)

        navigate(path.HOME)
        mounted.current && setIsSubmitting(false)
    }
    const goLogin = () => {
        navigate(`/${path.LOGIN}`)
    }
    const handleSigninGoogle = async () => {
        signInWithGoogle()
        navigate(path.HOME)
    }

    return (
        <Box w='full'>
            <Heading textAlign='center' my={12}>
                ĐĂNG KÝ
            </Heading>
            <Card maxW='lg' mx='auto' mt={4} >
                <chakra.form
                    onSubmit={handleRegister}
                >
                    <Stack spacing='6'>
                        <FormControl className='name'>
                            <FormLabel>FULL NAME</FormLabel>
                            <Input
                                name='name'
                                onChange={e => setName(e.target.value)}
                                type='text'
                                autoComplete='name'
                                required
                            />
                        </FormControl>
                        <FormControl className='name'>
                            <FormLabel>PHONE</FormLabel>
                            <Input
                                name='phone'
                                onChange={e => setPhone(e.target.value)}
                                type='text'
                                autoComplete='phone'
                                required
                            />
                        </FormControl>
                        <FormControl className='email'>
                            <FormLabel>EMAIL</FormLabel>
                            <Input
                                name='email'
                                onChange={e => setEmail(e.target.value)}
                                type='email'
                                autoComplete='email'
                                required
                            />
                        </FormControl>
                        <FormControl className='password'>
                            <FormLabel>MẬT KHẨU</FormLabel>
                            <Input
                                name='password'
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                autoComplete='new-password'
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
                    leftIcon={<icons.FaGoogle />}
                    onClick={handleSigninGoogle}
                >
                    Đăng nhập với Google
                </Button>
            </Card>
        </Box >

    )
}

export default Register