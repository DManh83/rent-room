import { Box, Button, Center, Flex, Wrap, WrapItem, chakra } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Item } from '../../components'
// import { collection, collectionGroup, getDocs } from 'firebase/firestore'
import { collectionGroup, get, doc, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const List = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        // const collectionPosts = collection(db, 'posts')

        // getDocs(collectionPosts)
        //     .then((snapshot) => {
        //         let results = []
        //         snapshot.docs.forEach(async (postDoc) => {
        //             results.push({ ...postDoc.data(), id: postDoc.id })
        //         })
        //         setPosts(results)
        //     })
        //     .catch(error => console.log(error))

        const fetchPosts = async () => {
            try {
                const postSnapshots = await getDocs(collection(db, 'posts'));

                const allPosts = [];

                for (const post of postSnapshots.docs) {
                    const postData = post.data();

                    // Truy vấn thông tin user dựa trên userId
                    const userDoc = await getDoc(doc(db, 'users', postData.userId));
                    const categoryDoc = await getDoc(doc(db, 'categorys', postData.categoryCode))
                    const labelDoc = await getDoc(doc(db, 'posts', post.id, 'label', postData.labelCode))
                    const attributeDoc = await getDoc(doc(db, 'posts', post.id, 'attribute', postData.attributeCode))
                    const overviewDoc = await getDoc(doc(db, 'posts', post.id, 'overview', postData.overviewCode))


                    const userData = userDoc.data();
                    const categoryData = categoryDoc.data()
                    const labelData = labelDoc.data()
                    const attributeData = attributeDoc.data()
                    const overviewData = overviewDoc.data()

                    const postWithUser = {
                        id: post.id,
                        ...postData,
                        user: userData ?? null,
                        category: categoryData ?? null,
                        label: labelData ?? null,
                        attribute: attributeData ?? null,
                        overview: overviewData ?? null,

                        // label: `${categoryData?.value} ${postData?.address?.split(',')[0]}`
                    };

                    allPosts.push(postWithUser);
                }

                setPosts(allPosts);
            } catch (error) {
                console.error('Lỗi truy vấn:', error);
            }
        };
        fetchPosts();
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
                    return (
                        post && post.user && post.id && <Item post={post} key={post.id} />
                    )
                })}

            </Box>

        </Box>
    )
}

export default List