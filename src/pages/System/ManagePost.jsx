import { Box, Button, Flex, Heading, Image, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth, usePost } from '../../hooks/useReducerContext'
import { editData, fetchPostsLimitUser } from '../../store/fetch/post'
import moment from 'moment'
import 'moment/locale/vi'
import { UpdatePost } from '../../components'

const formatDate = 'DD-MM-YYYY'

const ManagePost = () => {
    const { user } = useAuth()
    const [isEdit, setIsEdit] = useState(false)
    const { postOfCurrent, dataEdit, dispatchPost } = usePost()
    useEffect(() => {
        fetchPostsLimitUser(dispatchPost, user.uid)
    }, [dispatchPost])

    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    const checkStatus = (datetime) => moment(datetime, formatDate).isAfter(new Date().toDateString())

    return (
        <Flex direction='column' gap={6} >
            <Flex align='center' justify='space-between' py={4} borderBottom='1px' borderColor='gray.200'>
                <Heading fontWeight='medium' size='2xl'>
                    Quản lý tin đăng
                </Heading>
                <Select outline='none' border='1px' p={2} borderColor='gray.100' rounded='md' w='20%'>
                    <option value=''>Lọc theo trạng thái</option>
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
                    {!postOfCurrent
                        ? <Tr>
                            <Td>dfhajhfjafk</Td>
                        </Tr>
                        : postOfCurrent?.map(item => {
                            return (
                                <Tr key={item.id}>
                                    <Td border='1px' textAlign='center' p={2}>#{item?.overview?.code}</Td>
                                    <Td border='1px' textAlign='center' p={2}>
                                        <Flex align='center' justify='center'>
                                            <Image src={item.images[0] || ''} alt='avatar-post' w={10} h={10} objectFit='cover' rounded='md' />
                                        </Flex>
                                    </Td>
                                    <Td border='1px' textAlign='center' p={2}>{item?.title}</Td>
                                    <Td border='1px' textAlign='center' p={2}>{item?.priceNumber} Triệu/Tháng</Td>
                                    <Td border='1px' textAlign='center' p={2}>{item?.overview?.created}</Td>
                                    <Td border='1px' textAlign='center' p={2}>{item?.overview?.expired}</Td>
                                    <Td border='1px' textAlign='center' p={2}>{checkStatus(item?.overview?.expired?.split(' ')[3]) ? 'Đang hoạt động' : 'Đã hết hạn'}</Td>
                                    <Td border='1px' textAlign='center' p={2}>
                                        <Button bg='green.500'
                                            onClick={() => {
                                                editData(item, dispatchPost)
                                                setIsEdit(true)
                                            }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button bg='red.500'

                                        >
                                            Xóa
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