import { Box, Button, Flex, Image, Wrap, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import avatarDefault from '../assets/avatar-default.jpg'
import { useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'

const indexs = [1, 2, 3, 4]

const Item = ({ post }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/${path.DETAIL}/${post.id}`, { state: post })
    }
    console.log(post.images[0])

    return (
        <Flex w='full' borderTop='1px' borderTopColor='orange.600' p={4} onClick={handleClick}>
            <Wrap w='40%' spacing='2px' align='center' position='relative' cursor='pointer'>
                {post?.images?.length > 0 && post?.images?.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
                    return (
                        <Image key={index} src={i} alt='preview' w='120px' h='120px' objectFit='cover' />

                    )
                })}
                <chakra.span bg='rgba(0, 0, 0, 0.5)' textColor='white' px={2} rounded='md' position='absolute' left={1} bottom={1}>{`${post?.images?.length} ảnh`}</chakra.span>
            </Wrap>
            <Box w='60%'>
                <Flex justify='space-between' gap={4} w='full'>
                    <Box fontWeight='medium' textColor='orange.600'>
                        {post?.title}
                    </Box>
                </Flex>
                <Flex my={2} align='center' justify='space-between'>
                    <chakra.span fontWeight='bold' textColor='green'>{post?.priceNumber}</chakra.span>
                    <chakra.span>{post?.areaNumber}</chakra.span>
                    <chakra.span>{post?.province}</chakra.span>
                </Flex>
                <chakra.p textColor='gray.500' w='full' h='100px' textOverflow='ellipsis' overflow='hidden'>
                    {post?.description}
                </chakra.p>
                <Flex align='center' my={6} justify='space-between'>
                    <Flex align='center' >
                        <Image src={avatarDefault} alt='avatar' w='30px' h='30px' objectFit='cover' />
                        <chakra.p>Tue Thu</chakra.p>
                    </Flex>
                    <Flex align='center' gap={1}>
                        <Button bg='blue.300' textColor='white' p={1} variant='solid' colorScheme='blue'>Goi 1234445665</Button>
                        <Button textColor='blue.300' variant='outline' colorScheme='blue' px={1}>Nhan Zalo</Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default memo(Item)