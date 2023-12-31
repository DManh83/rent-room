import { Box, Button, Flex, Image, Wrap, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import avatarDefault from '../assets/avatar-default.png'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'
import { formatVietnameseToString } from '../ultils/common/formatVietnameseToString'
import moment from 'moment'

const indexs = [0, 1, 2, 3]

const Item = ({ post }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${path.DETAIL}/${formatVietnameseToString(post.title)}/${post.id}`, { state: post })
    }
    return (
        <Flex w='full' borderTop='1px' borderTopColor='orange.600' py={4} >
            <Wrap w='40%' spacing='2px' align='center' position='relative' cursor='pointer' onClick={handleClick}>
                {post?.images.length > 0 && post?.images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <Image key={index} src={i} alt='preview' w='47%' h='140px' objectFit='cover' />

                    )
                })}
                <chakra.span bg='rgba(0, 0, 0, 0.5)' textColor='white' px={2} rounded='md' position='absolute' left={1} bottom={2}>{`${post?.images?.length} ảnh`}</chakra.span>
            </Wrap>
            <Box w='60%'>
                <Flex justify='space-between' gap={4} w='full' cursor='pointer' onClick={handleClick}>
                    <Box fontWeight='medium' textColor='orange.600'>
                        {post?.title}
                    </Box>
                    <chakra.span fontSize='13px'>{moment.unix(post?.createAt?.seconds).fromNow()}</chakra.span>
                </Flex>
                <Flex my={2} align='center' justify='space-between' gap={2} onClick={handleClick}>
                    <chakra.span fontWeight='bold' textColor='green' flex={2} textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' >{post?.overview?.price}</chakra.span>
                    <chakra.span flex={1}>{post?.overview?.acreage}</chakra.span>
                    <chakra.span flex={3} textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' fontSize='sm'>{`${post?.address.split(',')[post?.address.split(',').length - 2]}${post?.address.split(',')[post?.address.split(',').length - 1]}`}</chakra.span>
                </Flex>
                <chakra.p textColor='gray.500' w='full' h='100px' textOverflow='ellipsis' overflow='hidden'>
                    {post?.description}
                </chakra.p>
                <Flex align='center' my={6} justify='space-between'>
                    <Flex align='center' gap={1}>
                        <Image src={post?.user?.avatar || avatarDefault} alt='avatar' w='30px' h='30px' objectFit='cover' backgroundColor='transparent' rounded='full' />
                        <chakra.p>{post?.user?.name}</chakra.p>
                    </Flex>
                    <Flex align='center' gap={1}>
                        <Button bg='blue.300' textColor='white' p={1} variant='solid' colorScheme='blue'>{`Gọi ${post?.user?.phone}`}</Button>
                        <Button as='a' textColor='blue.300' variant='outline' colorScheme='blue' px={1} href={`https://zalo.me/${post?.user?.zalo || post?.user?.phone}`}>Nhắn Zalo</Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default memo(Item)