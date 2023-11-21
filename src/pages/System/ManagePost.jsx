import { Button, Flex, Heading, Image, Select, Table, Tbody, Td, Th, Thead, Tr, useToast, chakra } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth, usePost } from '../../hooks/useReducerContext'
import { editData, fetchPostsLimitUser } from '../../store/fetch/post'
import moment from 'moment'
import 'moment/locale/vi'
import { UpdatePost } from '../../components'
import { deletePost, setHiddenPost } from '../../services'

const formatDate = 'DD-MM-YYYY'

const ManagePost = () => {
    const { user } = useAuth()
    const [isEdit, setIsEdit] = useState(false)
    const [updateData, setUpdateDate] = useState(false)
    const [posts, setPosts] = useState([])
    const { postOfCurrent, dataEdit, dispatchPost } = usePost()
    const toast = useToast()

    useEffect(() => {
        !dataEdit && fetchPostsLimitUser(dispatchPost, user.uid)
    }, [dataEdit, updateData])

    useEffect(() => {
        setPosts(postOfCurrent)
    }, [postOfCurrent])


    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    const checkStatus = (datetime) => moment(datetime, formatDate).isAfter(new Date().toDateString())

    const handleEditPost = (item) => {
        editData(item, dispatchPost)
        setIsEdit(true)
    }

    const handleHiddenPost = async (id, hidden) => {
        setHiddenPost(id, hidden)
        fetchPostsLimitUser(dispatchPost, user.uid)

        if (!hidden) {
            toast({
                description: 'Bạn đã ẩn tin đăng',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                description: 'Bạn đã hiện tin đăng',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }

    }

    const handleDeletePost = (postId) => {
        deletePost(postId)
        setUpdateDate(prev => !prev)
    }

    const handleFilterByStatus = (statusCode) => {
        if (statusCode === 1) {
            const activePost = postOfCurrent?.filter(item => checkStatus(item?.overview?.expired?.split(' ')[3]))
            setPosts(activePost)
        } else if (statusCode === 2) {
            const expiredPost = postOfCurrent?.filter(item => !checkStatus(item?.overview?.expired?.split(' ')[3]))
            setPosts(expiredPost)
        } else setPosts(postOfCurrent)
    }

    return (
        <Flex direction='column'>
            <Flex align='center' justify='space-between' py={4} mb={10} borderBottom='1px' borderColor='gray.200'>
                <Heading py={4} fontWeight='medium' size='2xl'>
                    Quản lý tin đăng
                </Heading>
                <Select
                    outline='none' rounded='md' w='20%'
                    onChange={e => handleFilterByStatus(+e.target.value)}
                >
                    <option value=''>Tất cả</option>
                    <option value='1'>Đang hoạt động</option>
                    <option value='2'>Đã hết hạn</option>
                </Select>
            </Flex>
            <Table w='full'>
                <Thead>
                    <Tr>
                        <Th border='1px' textAlign='center' p={2}>Mã tin</Th>
                        <Th border='1px' textAlign='center' p={2}>Ảnh đại diện</Th>
                        <Th border='1px' textAlign='center' p={2}>Tiêu đề</Th>
                        <Th border='1px' textAlign='center' p={2}>Giá</Th>
                        <Th border='1px' textAlign='center' p={2}>Ngày bắt đầu</Th>
                        <Th border='1px' textAlign='center' p={2}>Ngày hết hạn</Th>
                        <Th border='1px' textAlign='center' p={2}>Trạng thái</Th>
                        <Th border='1px' textAlign='center' p={2}>Tùy chọn</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!posts
                        ? <Tr>
                            <Td>Bạn chưa có tin đăng nào.</Td>
                        </Tr>
                        : posts?.map(item => {
                            return (
                                <Tr key={item.id}>
                                    <Td border='1px' textAlign='center' p={2}><chakra.span textColor={item.hidden ? 'gray.300' : 'black'}>#{item?.overview?.code}</chakra.span></Td>
                                    <Td border='1px' textAlign='center' blur='2px' p={2}>
                                        <Flex align='center' justify='center' textColor={item.hidden ? 'gray.300' : 'black'}>
                                            <Image src={item.images[0] || ''} alt='avatar-post' w={10} h={10} objectFit='cover' rounded='md' />
                                        </Flex>
                                    </Td>
                                    <Td border='1px' textAlign='center' p={2}><chakra.span textColor={item.hidden ? 'gray.300' : 'black'}>{item?.title}</chakra.span></Td>
                                    <Td border='1px' textAlign='center' p={2}><chakra.span textColor={item.hidden ? 'gray.300' : 'black'}>{item?.priceNumber} Triệu/Tháng</chakra.span></Td>
                                    <Td border='1px' textAlign='center' p={2}><chakra.span textColor={item.hidden ? 'gray.300' : 'black'}>{item?.overview?.created}</chakra.span></Td>
                                    <Td border='1px' textAlign='center' p={2}><chakra.span textColor={item.hidden ? 'gray.300' : 'black'}>{item?.overview?.expired}</chakra.span></Td>
                                    <Td border='1px' textAlign='center' p={2}><chakra.span textColor={item.hidden ? 'gray.300' : 'black'}>{checkStatus(item?.overview?.expired?.split(' ')[3]) ? 'Đang hoạt động' : 'Đã hết hạn'}</chakra.span></Td>
                                    <Td border='1px' textAlign='center' p={2}>
                                        <Button bg='green.500'
                                            onClick={() => handleEditPost(item)}
                                        >
                                            Sửa
                                        </Button>

                                        <Button bg='red.500'
                                            onClick={() => handleDeletePost(item.id)}
                                        >
                                            Xóa
                                        </Button>

                                        <Button
                                            onClick={() => handleHiddenPost(item.id, item.hidden)}
                                        >
                                            {item.hidden ? 'Hiện' : 'Ẩn'}
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </Flex>
    )
}

export default ManagePost