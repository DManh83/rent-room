import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Spinner, chakra } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Address, Overview } from '../../components'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { icons } from '../../ultils/icons'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'

const CreatePost = () => {
    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    const { user } = useAuth()
    const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        let files = e.target.files

        for (let file of files) {
            const name = Date.now() + file.name
            const storageRef = ref(storage, `images/${name}`)
            const uploadTask = await uploadBytesResumable(storageRef, file)
            const url = await getDownloadURL(uploadTask.ref)
            images = [...images, url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }

    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }

    const handleSubmit = async () => {
        const res = await addDoc(collection(db, 'posts'), {
            ...payload,
            timeStamp: serverTimestamp(),
            uid: user?.uid
        })
        navigate(`/${path.DETAIL_ALL}`)
        // console.log(res)
    }

    return (
        <Flex px={6} direction='column' gap={4}>
            <Heading borderBottom='1px' borderColor='gray.200' py={4} fontWeight='medium' size='2xl'>
                Đăng tin mới
            </Heading>
            <Flex gap={4}>
                <Flex py={4} direction='column' gap={4} flex='auto'>
                    <Address setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <Box >
                        <Heading size='lg' py={4}> Hình ảnh </Heading>
                        <chakra.small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</chakra.small>
                        <FormControl>
                            <FormLabel
                                // as='button'
                                display='grid'
                                alignItems='center'
                                justifyItems='center'
                                border={2}
                                borderStyle='dashed'
                                rounded='lg'
                                h='200px'
                                my={4}
                                htmlFor='file'
                            >
                                {isLoading ? <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl' /> : <icons.BsCameraFill size={50} />}

                            </FormLabel>
                            <Input onChange={handleFiles} hidden type='file' id='file' multiple />
                            <Box>
                                <Heading size='md' py={4}>
                                    Ảnh đã chọn
                                </Heading>
                                <Flex gap={4} alignItems='center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <Box key={item} w='30%' h='30%' position='relative'>
                                                <Button
                                                    title='Xóa'
                                                    variant='ghost'
                                                    position='absolute'
                                                    right={0} rounded='full' p={2} _hover={{
                                                        textColor: 'red.400'
                                                    }}
                                                    onClick={() => handleDeleteImage(item)}
                                                >
                                                    <icons.ImBin />
                                                </Button>
                                                <Image src={item} alt='preview'
                                                    w='full' h='full'
                                                />
                                            </Box>
                                        )

                                    })}
                                </Flex>
                            </Box>
                        </FormControl>
                    </Box>
                    <Button onClick={handleSubmit} mt={10} bgColor='pink.400'>Tạo mới</Button>
                </Flex>
                <Flex w='30%' flex='none'>
                    Maps
                </Flex>
            </Flex>

        </Flex>
    )
}

export default CreatePost