import React from 'react'
import { useLocation } from 'react-router-dom'
import { SliderCustom } from '../../components'
import { Box, Flex, Heading, Table, Tbody, Td, Tr, chakra } from '@chakra-ui/react'
import icons from '../../ultils/icons'
import { useSelector } from 'react-redux'
import { usePost } from '../../hooks/useReducerContext'

const { HiLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, BsStopwatch, BsHash } = icons

const DetailPost = () => {
    const location = useLocation()
    const { state: post } = location
    console.log(post)

    return (
        <Flex w='full' gap={4} >
            <Box w='70%'>
                <SliderCustom images={post?.images} />
                <Box rounded='md' shadow='md' p={4}>
                    <Flex direction='column' gap={2} >
                        <Heading fontSize='2xl' fontWeight='bold' textColor='red.400'>
                            {post?.title}
                        </Heading>
                        <Flex alignItems='center' gap={2}>
                            <chakra.span> Chuyên mục: </chakra.span>
                            <chakra.span
                                textColor='blue.400' textDecorationLine='underline'
                                fontWeight='medium'
                                _hover={{
                                    textColor: 'orange.400'
                                }}>
                                {post?.category?.value}
                            </chakra.span>
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <HiLocationMarker color='blue' />
                            <chakra.span>Địa chỉ:</chakra.span>
                            <chakra.span>{post?.address}</chakra.span>
                        </Flex>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <TbReportMoney />
                                <chakra.span fontWeight='semibold' fontSize='18px' lineHeight='28px' textColor='green.400'>{post?.attribute?.price}</chakra.span>
                            </chakra.span>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <RiCrop2Line />
                                <chakra.span>{post?.attribute?.area}</chakra.span>
                            </chakra.span>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <BsStopwatch />
                                <chakra.span>{post?.attribute?.published?.seconds}</chakra.span>
                            </chakra.span>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <BsHash />
                                <chakra.span>{post?.attributeCode}</chakra.span>
                            </chakra.span>
                        </Flex>
                    </Flex>
                    <Box mt={8}>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Thông tin mô tả
                        </Heading>
                        <Flex direction='column' gap={1}>
                            {post?.description && post?.description.split('\n').map((line, index) => (
                                <chakra.p key={index}>{line}</chakra.p>
                            ))}
                        </Flex>
                    </Box>
                    <Box mt={8}>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Đặc điểm tin đăng
                        </Heading>
                        <Table>
                            <Tbody>
                                <Tr>
                                    <Td>Mã tin</Td>
                                    <Td>#{post?.overviewCode}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>Khu vực</Td>
                                    <Td>{post?.overview?.area}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Loại tin rao</Td>
                                    <Td>{post?.overview?.type}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>Đối tượng cho thuê</Td>
                                    <Td>{post?.overview?.target}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ngày đăng</Td>
                                    <Td>{post?.overview?.created}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>Ngày hết hạn</Td>
                                    <Td>{post?.overview?.expired}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                    <Box mt={8}>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Thông tin liên hệ
                        </Heading>
                        <Table>
                            <Tbody>
                                <Tr>
                                    <Td>Liên hệ</Td>
                                    <Td>{post?.user?.name}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>Email</Td>
                                    <Td>{post?.user?.email}</Td>
                                </Tr>
                                <Tr >
                                    <Td>Điện thoại</Td>
                                    <Td>{post?.user?.phone}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td>Zalo</Td>
                                    <Td>{post?.user?.zalo}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                    <Box mt={8} h='200px'>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Bản đồ
                        </Heading>
                    </Box>
                </Box>
            </Box>
            <Box w='30%'>
                SideBar
            </Box>
        </Flex>
    )
}

export default DetailPost