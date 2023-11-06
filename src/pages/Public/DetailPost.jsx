import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Map, SliderCustom } from '../../components'
import { Box, Flex, Heading, Table, Tbody, Td, Tr, chakra, layout } from '@chakra-ui/react'
import icons from '../../ultils/icons'
import { usePost } from '../../hooks/useReducerContext'
import { fetchAllDataWithPost } from '../../store/fetch/post'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import 'moment/locale/vi'
import moment from 'moment'
import generateDate from '../../ultils/common/generateDate'


const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } = icons


const DetailPost = () => {
    const location = useLocation()
    const { state: postData } = location
    const { post, dispatchPost } = usePost()
    const [coords, setCoords] = useState({})
    // const [datetime, setDatetime] = useState()

    useEffect(() => {
        fetchAllDataWithPost(dispatchPost, postData)
    }, [dispatchPost, postData])
    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        //     setCoords({ lat: latitude, lng: longitude })
        // })
        const getCoords = async () => {
            try {
                const results = await geocodeByAddress(post?.address)
                const latLng = await getLatLng(results[0])
                setCoords(latLng)
            } catch (error) {
                console.log(error)
            }
        }

        post && getCoords()
    }, [post])

    // console.log(moment.unix(postData?.createAt?.seconds).fromNow())
    // console.log(postData?.createAt.toDate())


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
                                }}
                                cursor='pointer'
                            >
                                {post?.label?.value}
                            </chakra.span>
                        </Flex>
                        <Flex alignItems='center' gap={2}>
                            <HiLocationMarker color='blue' />
                            <chakra.span>Địa chỉ:</chakra.span>
                            <chakra.span>{post?.address}</chakra.span>
                        </Flex>
                        <Flex alignItems='center' justifyContent='space-between' borderBottom='1px' height='50px' borderColor='gray.300'>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <TbReportMoney />
                                <chakra.span fontWeight='semibold' fontSize='18px' lineHeight='28px' textColor='green.400'>{post?.overview?.price}</chakra.span>
                            </chakra.span>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <RiCrop2Line />
                                <chakra.span>{post?.overview?.acreage}</chakra.span>
                            </chakra.span>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <BsStopwatch />
                                <chakra.span>{moment.unix(postData?.createAt?.seconds).fromNow()}</chakra.span>
                            </chakra.span>
                            <chakra.span display='flex' alignItems='center' gap={1}>
                                <BsHash />
                                <chakra.span>{post?.overview?.code}</chakra.span>
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

                    <Box mt={8} borderTop='1px' borderBottom='1px' borderColor='gray.300'>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Thông tin cho thuê
                        </Heading>
                        <Table variant='unstyled'>
                            <Tbody display='flex' flexWrap='wrap'>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Liên hệ</Td>
                                    <Td>{post?.user?.name}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Giá cho thuê</Td>
                                    <Td>{post?.overview?.price}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Email</Td>
                                    <Td>{post?.user?.email}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Diện tích</Td>
                                    <Td>{post?.overview?.acreage}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Điện thoại</Td>
                                    <Td>{post?.user?.phone}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Nội thất</Td>
                                    <Td>{post?.furniture}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Zalo</Td>
                                    <Td>{post?.user?.zalo}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Bếp</Td>
                                    <Td>{post?.kitchen}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Nhà vệ sinh</Td>
                                    <Td>{post?.bathroom}</Td>
                                </Tr>
                                <Tr flexBasis='50%'>
                                    <Td width='150px'>Chỗ để xe</Td>
                                    <Td>{post?.parking}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>

                    <Box mt={8}>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Đặc điểm tin đăng
                        </Heading>
                        <Table>
                            <Tbody>
                                <Tr>
                                    <Td width='150px'>Mã tin</Td>
                                    <Td>#{post?.overview?.code}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td width='150px'>Khu vực</Td>
                                    <Td>{post?.overview?.area}</Td>
                                </Tr>
                                <Tr>
                                    <Td width='150px'>Loại tin rao</Td>
                                    <Td>{post?.overview?.type}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td width='150px'>Đối tượng cho thuê</Td>
                                    <Td>{post?.overview?.target}</Td>
                                </Tr>
                                <Tr>
                                    <Td width='150px'>Ngày đăng</Td>
                                    <Td>{post?.overview?.created}</Td>
                                </Tr>
                                <Tr bg='gray.200'>
                                    <Td width='150px'>Ngày hết hạn</Td>
                                    <Td>{post?.overview?.expired}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>

                    {post && <Box mt={8}>
                        <Heading fontSize='xl' fontWeight='bold' my={4}>
                            Bản đồ
                        </Heading>
                        <Map address={post?.address} coords={coords} />
                    </Box>}
                </Box>
            </Box>
            <Box w='30%'>
                SideBar
            </Box>
        </Flex>
    )
}

export default DetailPost