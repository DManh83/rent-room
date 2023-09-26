import React from 'react'
import { useLocation } from 'react-router-dom'
import { SliderCustom } from '../../components'
import { Box, Flex, Heading, Table, Tbody, Td, Tr, chakra } from '@chakra-ui/react'
import { icons } from '../../ultils/icons'


const DetailPost = () => {
    const location = useLocation()
    const { state: post } = location
    console.log(post)

    return (
        <Flex w='full' gap={4} >
            <Box w='70%' >
                <SliderCustom images={post?.images} />
                <Flex direction='column' gap={2}>
                    <Heading textColor='red.400'>
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
                        <icons.HiLocationMarker color='blue' />
                        <chakra.span>Địa chỉ:</chakra.span>
                        <chakra.span>{post?.address}</chakra.span>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <chakra.span fontWeight='semibold' fontSize='18px' lineHeight='28px' textColor='green.400'>{post?.price}</chakra.span>
                        <chakra.span>{post?.area}</chakra.span>
                        <chakra.span>{post?.price}</chakra.span>
                        <chakra.span>{post?.price}</chakra.span>
                    </Flex>
                </Flex>
                <Box mt={8}>
                    <Heading my={4}>
                        Thông tin mô tả
                    </Heading>
                    <Box >
                        {post?.description.split('\n').map((line, index) => (
                            <chakra.p key={index}>{line}</chakra.p>
                        ))}
                    </Box>
                </Box>
                <Box mt={8}>
                    <Heading my={4}>
                        Đặc điểm tin đăng
                    </Heading>
                    <Table>
                        <Tbody>
                            <Tr>
                                <Td>Mã tin</Td>
                                <Td>{post?.price}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Box>
            <Box w='30%'>
                SideBar
            </Box>
        </Flex>
    )
}

export default DetailPost