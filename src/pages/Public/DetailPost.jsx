import React from 'react'
import { useParams } from 'react-router-dom'
import { SliderCustom } from '../../components'
import { Box, Flex, Heading, Table, Tbody, Td, Tr, chakra } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { icons } from '../../ultis/icons'


const docPostsRef = doc(db, 'posts', '')
const postDatas = await getDoc(docPostsRef)
console.log(postDatas)


const DetailPost = () => {

    return (
        <Flex gap={4} >
            <Box w='70%' >
                <SliderCustom images={postDatas?.data()?.images} />
                <Flex direction='column' gap={2}>
                    <Heading textColor='red.400'>
                        {postDatas?.data()?.title}
                    </Heading>
                    <Flex alignItems='center' gap={2}>
                        <chakra.span> Chuyên mục: </chakra.span>
                        <chakra.span
                            textColor='blue.400' textDecorationLine='underline'
                            fontWeight='medium'
                            _hover={{
                                textColor: 'orange.400'
                            }}>
                            {postDatas?.data()?.categoryCode}
                        </chakra.span>
                    </Flex>
                    <Flex alignItems='center' gap={2}>
                        <icons.HiLocationMarker color='blue' />
                        <chakra.span>Địa chỉ:</chakra.span>
                        <chakra.span>{postDatas?.data()?.address}</chakra.span>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <chakra.span fontWeight='semibold' fontSize='18px' lineHeight='28px' textColor='green.400'>{postDatas?.data()?.priceNumber}</chakra.span>
                        <chakra.span>{postDatas?.data()?.areaNumber}</chakra.span>
                        <chakra.span>{postDatas?.data()?.priceNumber}</chakra.span>
                        <chakra.span>{postDatas?.data()?.priceNumber}</chakra.span>
                    </Flex>
                </Flex>
                <Box mt={8}>
                    <Heading my={4}>
                        Thông tin mô tả
                    </Heading>
                    <Box >
                        {postDatas?.data()?.description}
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
                                <Td>{postDatas?.data()?.priceNumber}</Td>
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