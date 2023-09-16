import { Box, Button, Center, Flex, Wrap, WrapItem, chakra } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Item } from '../../components'
// import { collection, collectionGroup, getDocs } from 'firebase/firestore'
import { collectionGroup, get, doc, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const List = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, 'posts')

        getDocs(collectionRef)
            .then((snapshot) => {
                let results = []
                snapshot.docs.forEach((postDoc) => {
                    results.push({ ...postDoc.data(), id: postDoc.id })
                })
                setPosts(results)
            })
            .catch(error => console.log(error))

        // const setPostState = async () => {
        //     const queryPost = collection(db, 'posts');
        //     await getDocs(queryPost).then((querySnapshot) => {
        //         querySnapshot.forEach(async (postDoc) => {
        //             const postData = postDoc.data();
        //             const userId = postData?.uId;
        //             const queryUser = query(collection(db, "user"), where("userId", "==", userId));

        //             await getDocs(queryUser).then((userDoc) => {
        //                 const userData = userDoc.data();

        //                 console.log({
        //                     post: postData,
        //                     user: userData,
        //                 });
        //             });
        //         });
        //     });
        // }

        // setPostState()

    }, [])
    console.log(posts)
    return (
        <Box w='full' p={1} bg='white' shadow='md' rounded='md'>
            <Flex alignItems='center' justifyContent='space-between'>
                <chakra.h4 fontSize='xl' fontWeight='semibold' my='1'>Danh sách tin đăng</chakra.h4>
                <chakra.span fontSize='sm'>Cập nhật: 12:00 13/09/2023</chakra.span>
            </Flex>
            <Flex alignItems='center' gap={2} my={2}>
                <chakra.span>Sắp xếp:</chakra.span>
                <Button variant='ghost' fontWeight='normal'>Mặc định</Button>
                <Button variant='ghost' fontWeight='normal'>Mới nhất</Button>
            </Flex>
            <Box >
                {posts && posts.map((post) => {
                    return <Item post={post} key={post?.id} />
                })}

            </Box>

        </Box>
    )
}

export default List