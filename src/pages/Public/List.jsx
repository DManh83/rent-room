import { Box, Button, Flex, Heading, chakra } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Item } from '../../components'
import { usePost } from '../../hooks/useReducerContext'
import { fetchPosts } from '../../store/fetch/post'

const List = () => {
    const { posts, dispatchPost } = usePost()

    useEffect(() => {
        fetchPosts(dispatchPost);
    }, [dispatchPost])

    // console.log('postData dispatch: ', posts)

    return (
        <Box w='full' p={1} shadow='md' rounded='md'>
            <Flex alignItems='center' justifyContent='space-between'>
                <Heading fontSize='lg' fontWeight='bold' my='1'>Danh sách tin đăng</Heading>
                <chakra.span fontSize='sm'>Cập nhật: 12:00 13/09/2023</chakra.span>
            </Flex>
            <Flex alignItems='center' gap={2} my={2}>
                <chakra.span>Sắp xếp:</chakra.span>
                <Button variant='ghost' fontWeight='normal'>Mặc định</Button>
                <Button variant='ghost' fontWeight='normal'>Mới nhất</Button>
            </Flex>
            <Box >
                {posts && posts.map((post) => {
                    return (
                        post && post.user && post.id && <Item post={post} key={post.id} />
                    )
                })}

            </Box>

        </Box>
    )
}

export default List