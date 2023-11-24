import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Spinner, chakra, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Address, Map, Overview } from '../../components'
import { storage } from '../../config/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import icons from '../../ultils/icons'
import { useAuth, usePost } from '../../hooks/useReducerContext'
import { createDocPost, setHiddenPost, updateDocPost } from '../../services'
import { validate } from '../../ultils/common/validateField'
import { editData, fetchPostsLimitUser, resetDataEdit } from '../../store/fetch/post'

const { ImBin, BsCameraFill } = icons

const CreatePost = ({ isEdit, setIsEdit }) => {
    const { user } = useAuth()
    const { dataEdit, dispatchPost } = usePost()

    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryCode: dataEdit?.categoryCode || '',
            title: dataEdit?.title || '',
            priceNumber: dataEdit?.priceNumber * 1000000 || 0,
            areaNumber: dataEdit?.areaNumber || 0,
            images: dataEdit?.images || '',
            address: dataEdit?.address || '',
            description: dataEdit?.description || '',
            target: dataEdit?.target || '',
            kitchen: dataEdit?.kitchen || '',
            bathroom: dataEdit?.bathroom || '',
            parking: dataEdit?.parking || '',
            furniture: dataEdit?.furniture || '',
            userId: user.uid
        }
        return initData
    })

    const [phone, setPhone] = useState(user.phone ? user.phone : '')
    const [name, setName] = useState(user.name ? user.name : user.displayName ? user.displayName : '')
    const [imagesPreview, setImagesPreview] = useState([])
    const [postId, setPostId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const [invalidFields, setInvalidFields] = useState([])
    const [province, setProvince] = useState(0)
    const [district, setDistrict] = useState(0)
    const [ward, setWard] = useState(0)
    const [detailAddress, setDetailAddress] = useState('')
    const [dataEditTemp, setDataEditTemp] = useState(dataEdit)

    useEffect(() => {
        if (dataEdit) {
            dataEdit?.images && setImagesPreview(dataEdit?.images)
            setPostId(dataEdit?.id)
        }
    }, [dataEdit])

    useEffect(() => {
        dataEditTemp && editData(dataEditTemp, dispatchPost)
    }, [dataEditTemp])

    useEffect(() => {
        if (!isEdit) {
            setPayload({
                categoryCode: '',
                title: '',
                priceNumber: 0,
                areaNumber: 0,
                images: '',
                address: '',
                description: '',
                target: '',
                kitchen: '',
                bathroom: '',
                parking: '',
                furniture: '',
                userId: user.uid
            })
            setImagesPreview([])
            setProvince(0)
            setDistrict(0)
            setWard(0)
            setDetailAddress('')
        }
    }, [isEdit])


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

    const handleSubmit = (e) => {
        e.preventDefault()
        const finalPayload = {
            ...payload,
            name,
            phone
        }
        const result = validate(finalPayload, setInvalidFields)
        if (result === 0) {
            if (dataEdit && isEdit) {
                updateDocPost(payload, postId, name, phone)
                setIsEdit(false)
                resetDataEdit(dispatchPost)
                toast({
                    description: 'Cập nhật tin đăng thành công',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                resetPayload()

            } else {
                createDocPost(payload, name, phone)
                toast({
                    description: 'Tạo tin đăng thành công',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                resetPayload()

            }
        }
    }

    const resetPayload = () => {
        setPayload({
            categoryCode: '',
            title: '',
            priceNumber: 0,
            areaNumber: 0,
            images: '',
            // videos: '',
            address: '',
            description: '',
            target: '',
            kitchen: '',
            bathroom: '',
            parking: '',
            furniture: '',
            userId: user.uid
        })
        setImagesPreview([])
        setProvince(0)
        setDistrict(0)
        setWard(0)
        setDetailAddress('')
        // setInvalidFields([])
    }

    const handleHiddenPost = async (id, hidden) => {
        setHiddenPost(id, hidden)
        console.log(hidden)
        setDataEditTemp(prev => ({ ...prev, hidden: !hidden }))
        fetchPostsLimitUser(dispatchPost, user.uid)
    }

    return (
        <Flex px={6} direction='column' gap={4}>
            <Flex py={4} align='center' justify='space-between' borderBottom='1px' borderColor='gray.200'>
                <Heading fontWeight='medium' size='2xl'>
                    {isEdit ? 'Chỉnh sửa tin đăng' : 'Đăng tin mới'}
                </Heading>
                {isEdit && <Button onClick={() => handleHiddenPost(dataEdit.id, dataEdit.hidden)}>
                    {dataEdit?.hidden ? 'Hiện tin đăng' : 'Ẩn tin đăng'}
                </Button>}
            </Flex>
            <Flex gap={4}>
                <Flex py={4} direction='column' gap={4} flex='auto'>
                    <Address isEdit={isEdit} invalidFields={invalidFields} setInvalidFields={setInvalidFields} setPayload={setPayload} detailAddress={detailAddress} setDetailAddress={setDetailAddress} province={province} setProvince={setProvince} district={district} setDistrict={setDistrict} ward={ward} setWard={setWard} />
                    <Overview invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload} phone={phone} setPhone={setPhone} name={name} setName={setName} />
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
                                h='100px'
                                my={4}
                                htmlFor='image'
                                w='30%'
                            >
                                {isLoading ? <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl' /> : <BsCameraFill size={50} />}

                            </FormLabel>
                            <Input
                                onChange={handleFiles}
                                hidden
                                type='file'
                                id='image'
                                multiple
                                onClick={() => setInvalidFields([])}
                            />
                            <chakra.small textColor='red.500' display='block'>
                                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.message}
                            </chakra.small>
                            <Box>
                                <Heading size='md' py={4}>
                                    Ảnh đã chọn
                                </Heading>
                                <Flex gap={4} alignItems='center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <Box key={item} w='20%' h='20%' position='relative'>
                                                <Button
                                                    title='Xóa'
                                                    // variant='ghost'
                                                    position='absolute'
                                                    right={0} rounded='full' p={2} _hover={{
                                                        textColor: 'red.400'
                                                    }}
                                                    onClick={() => handleDeleteImage(item)}
                                                >
                                                    <ImBin />
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

                    <Button onClick={handleSubmit} mt={10} bgColor='pink.400'>{isEdit ? 'Cập nhật' : 'Lưu'}</Button>
                    <Box h='200px'>

                    </Box>
                </Flex>
                <Flex w='30%' flex='none' pt={12}>
                    <Map address={payload.address} />
                </Flex>
            </Flex>

        </Flex>
    )
}

export default CreatePost