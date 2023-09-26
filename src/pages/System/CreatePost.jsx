import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Spinner, Toast, chakra, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Address, Overview } from '../../components'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { icons } from '../../ultils/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useAuth } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { formatVietnameseToString } from '../../ultils/formatVietnameseToString'
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { v4 } from 'uuid'

const CreatePost = () => {
    const { user } = useAuth()
    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        price: 0,
        area: 0,
        images: '',
        address: '',
        description: '',
        target: '',
        province: '',
        kitchen: '',
        wc: '',
        parking: '',
        furniture: '',
        labelCode: '',
        attributeCode: '',
        overviewCode: '',
        userId: user.uid
    })
    const [postId, setPostId] = useState('')
    useEffect(() => {
        setPostId(v4().replace(/-/g, '').substr(0, 10))
        // const fetchData = async () => {
        //     const docRef = doc(db, 'posts', postId)
        //     await setDoc(docRef, { ...payload })
        // }
        // fetchData()
    }, [])

    // const { addDocument, document } = useFirestore('posts')
    // const { addDocumentUser } = useFirestore(`users/${user.uid}/posts`)
    const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const categoryDoc = await getDoc(doc(db, 'categorys', payload.categoryCode))
        const finalPayload = {
            ...payload,
            // price: payload.price / 1000000 + ' triệu/tháng',
            // area: payload.area + ' m²',
            labelCode: postId?.match(/\d/g)?.join(''),
            attributeCode: postId?.match(/\d/g)?.join(''),
            overviewCode: postId?.match(/\d/g)?.join(''),

        }
        const postsRef = doc(db, 'posts', postId)
        const labelRef = doc(db, 'posts', postId, 'label', postId?.match(/\d/g)?.join(''))
        const attributeRef = doc(db, 'posts', postId, 'attribute', postId?.match(/\d/g)?.join(''))
        const overviewRef = doc(db, 'posts', postId, 'overview', postId?.match(/\d/g)?.join(''))

        //add post
        await setDoc(postsRef, { ...finalPayload, createAt: serverTimestamp() })

        //add subcollection label
        await setDoc(labelRef, {
            label: `${categoryDoc?.data().value} ${payload?.address?.split(', ')[1]}`,
            createAt: serverTimestamp()
        })

        //add subcollection attribute   
        await setDoc(attributeRef, {
            price: payload.price / 1000000 + ' triệu/tháng',
            area: payload.area + ' m²',
            published: serverTimestamp(),
            createAt: serverTimestamp()
        })

        //add sbcollection overview
        await setDoc(overviewRef, {
            area: `${categoryDoc?.data().value} ${payload?.address?.split(', ')[2]}`,
            type: categoryDoc?.data().value,
            target: payload.target,
            create: serverTimestamp(),
            expire: serverTimestamp(),
            createAt: serverTimestamp()
        })

        // console.log(docRef)
        // addDoc(collection())
        // addDocument({ ...finalPayload, userId: user.uid })
        // addDocumentUser({ ...finalPayload })
        // navigate(`/${path.DETAIL}/${formatVietnameseToString(payload.title)}/${postId}`)
        toast({
            description: 'Tạo tin đăng thành công',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })

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