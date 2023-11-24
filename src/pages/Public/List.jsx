import { Box, Button, Flex, Heading, chakra } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Item } from '../../components'
import { usePost } from '../../hooks/useReducerContext'
import { fetchPostsLimit } from '../../store/fetch/post'
import { useSearchParams } from 'react-router-dom'

const List = () => {
    const { posts, dispatchPost } = usePost()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry)
        }

        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        fetchPostsLimit(dispatchPost, searchParamsObject)

    }, [dispatchPost, searchParams])
    // console.log('posts: ', posts)


    return (
        <Box w='full' p={1} shadow='md' rounded='md'>
            <Flex alignItems='center' justifyContent='space-between'>
                <Heading fontSize='lg' fontWeight='bold' my='1'>Danh sách tin đăng</Heading>
            </Flex>
            <Flex alignItems='center' gap={2} my={2}>
                <chakra.span>Sắp xếp:</chakra.span>
                {/* <Button variant='ghost' fontWeight='normal'>Mặc định</Button> */}
                <Button variant='ghost' fontWeight='normal'>Mới nhất</Button>
            </Flex>
            <Box >
                {posts && posts.map((post) => {
                    return (
                        post && post.userId && post.id && <Item post={post} key={post.id} />
                    )
                })}

            </Box>

        </Box>
    )
}

export default List