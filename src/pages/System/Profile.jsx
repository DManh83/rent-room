import { Avatar, AvatarBadge, Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useReducerContext'
import { InputReadOnly } from '../../components'
import avatarDefault from '../../assets/avatar-default.png'
import { RiImageAddFill } from 'react-icons/ri'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import { storage } from '../../config/firebase'
import { updateUser } from '../../services'
import { getUser } from '../../store/fetch/user'


const Profile = () => {
    const { user, dispatchUser } = useAuth()
    // console.log(user)
    const toast = useToast()
    const [payload, setPayload] = useState({
        avatar: user?.avatar,
        name: user?.name || user?.displayName || '',
        phone: user?.phone || '',
        zalo: user?.zalo || ''
    })

    const [userCurrent, setUserCurrent] = useState({
        ...user
    })

    useEffect(() => {
        getUser(dispatchUser, userCurrent)
    }, [userCurrent])


    const handleUploadFile = async (e) => {
        const file = e.target.files[0]
        const name = Date.now() + file.name
        const storageRef = ref(storage, `avatars/${name}`)
        const uploadTask = await uploadBytesResumable(storageRef, file)
        const avatar = await getDownloadURL(uploadTask.ref)

        setPayload(prev => ({ ...prev, avatar: avatar }))
    }

    const handleSubmit = () => {
        updateUser(payload, user.uid)
        toast({
            description: 'Cập nhật thông tin tài khoản thành công',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
        setUserCurrent({ ...user, ...payload })
        getUser(dispatchUser, userCurrent)
    }
    return (
        <Flex px={6} direction='column' gap={4}>
            <Heading borderBottom='1px' borderColor='gray.200' py={4} fontWeight='medium' size='2xl'>
                Thông tin tài khoản
            </Heading>
            <Flex align='center' justify='center'>
                <Flex maxW='1000px' gap={4} align='center'>
                    <Flex py={4} direction='column' gap={4} flex='auto'>
                        <InputReadOnly value={`#${user?.uid?.match(/\d/g).join('').slice(0, 6)}` || ''} label='Mã thành viên' />
                        <Flex gap={4} py={2}>
                            <InputReadOnly value={user?.email || ''} label='Email' />
                            <FormControl className='name'>
                                <FormLabel>Tên hiển thị</FormLabel>
                                <Input
                                    name='name'
                                    value={payload.name}
                                    onChange={(e) => setPayload(prev => ({ ...prev, name: e.target.value }))}
                                    type='name'
                                    autoComplete='name'
                                    required />
                            </FormControl>
                        </Flex>
                        <Flex gap={4} py={2}>
                            <FormControl className='phone'>
                                <FormLabel>Số điện thoại</FormLabel>
                                <Input
                                    name='phone'
                                    value={payload.phone}
                                    onChange={(e) => setPayload(prev => ({ ...prev, phone: e.target.value }))}
                                    type='text'
                                    autoComplete='phone'
                                    required
                                />
                            </FormControl>
                            <FormControl className='zalo'>
                                <FormLabel>Zalo</FormLabel>
                                <Input
                                    name='Zalo'
                                    value={payload.zalo}
                                    onChange={(e) => setPayload(prev => ({ ...prev, zalo: e.target.value }))}
                                    type='text'
                                    autoComplete='Zalo'
                                    required
                                />
                            </FormControl>
                        </Flex>
                    </Flex>
                    <Box py={10} px={6} w='30%' h='30%' >
                        <FormControl>
                            <FormLabel htmlFor="file">
                                <Avatar src={payload.avatar || avatarDefault} name='avatar' boxSize='200px' borderRadius='full' bg='gray.200' cursor='pointer'>
                                    <AvatarBadge cursor="pointer"
                                        borderColor="gray.300"
                                        bgColor="gray.200"
                                        my={3} mx={3}
                                        w='30%' h='30%'
                                    >
                                        <RiImageAddFill color="black" fontSize='50px' />
                                    </AvatarBadge>
                                </Avatar>
                            </FormLabel>
                            <Input
                                type="file"
                                id="file"
                                onChange={handleUploadFile}
                                display="none"
                            />
                        </FormControl>
                    </Box>

                </Flex>
            </Flex>
            <Flex justify='center' py='100px'>
                <Button w='50%' bg='pink.400' flex='none'
                    onClick={() => handleSubmit()}
                >
                    Cập nhật
                </Button>

            </Flex>
        </Flex >
    )
}

export default Profile