import { Box, Button, Flex, Image, Wrap, chakra } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'
import avatarDefault from '../assets/avatar-default.jpg'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'
import { formatVietnameseToString } from '../ultils/formatVietnameseToString'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { data } from 'autoprefixer'

const indexs = [0, 1, 2, 3]

const Item = ({ post }) => {
    const navigate = useNavigate()

    // useEffect(async () => {
    //     if (post.userId) {
    //         const userRef = doc(db, 'users', post?.userId)
    //         const userDoc = await getDoc(userRef)
    //         console.log(userDoc.data())
    //     }
    //     else console.log('userId notfound')

    // }, [])

    const handleClick = () => {
        navigate(`/${path.DETAIL}/${formatVietnameseToString(post.title)}/${post.id}`, { state: post })
    }
    // console.log('post: ', post)
    return (
        <Flex w='full' borderTop='1px' borderTopColor='orange.600' py={4} onClick={handleClick}>
            <Wrap w='40%' spacing='2px' align='center' position='relative' cursor='pointer'>
                {post?.images.length > 0 && post?.images.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <Image key={index} src={i} alt='preview' w='47%' h='140px' objectFit='cover' />

                    )
                })}
                <chakra.span bg='rgba(0, 0, 0, 0.5)' textColor='white' px={2} rounded='md' position='absolute' left={1} bottom={2}>{`${post?.images?.length} ảnh`}</chakra.span>
            </Wrap>
            <Box w='60%'>
                <Flex justify='space-between' gap={4} w='full'>
                    <Box fontWeight='medium' textColor='orange.600'>
                        {post?.title}
                    </Box>
                </Flex>
                <Flex my={2} align='center' justify='space-between' gap={2}>
                    <chakra.span fontWeight='bold' textColor='green' flex={2} textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' >{post?.attribute?.price}</chakra.span>
                    <chakra.span flex={1}>{post?.attribute?.area}</chakra.span>
                    <chakra.span flex={3} textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap' fontSize='sm'>{`${post?.address.split(',')[post?.address.split(',').length - 2]}${post?.address.split(',')[post?.address.split(',').length - 1]}`}</chakra.span>
                </Flex>
                <chakra.p textColor='gray.500' w='full' h='100px' textOverflow='ellipsis' overflow='hidden'>
                    {post?.description}
                </chakra.p>
                <Flex align='center' my={6} justify='space-between'>
                    <Flex align='center' >
                        <Image src={avatarDefault} alt='avatar' w='30px' h='30px' objectFit='cover' />
                        <chakra.p>{post?.user?.name}</chakra.p>
                    </Flex>
                    <Flex align='center' gap={1}>
                        <Button bg='blue.300' textColor='white' p={1} variant='solid' colorScheme='blue'>{`Goi ${post?.user?.phone}`}</Button>
                        <Button textColor='blue.300' variant='outline' colorScheme='blue' px={1}>Nhan Zalo</Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default memo(Item)