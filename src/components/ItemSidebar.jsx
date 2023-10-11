import { Box, Flex, Heading, List, ListItem, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import { GrNext } from 'react-icons/gr'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/common/formatVietnameseToString'


const ItemSidebar = ({ title, content, isDouble, type }) => {
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location)
    const formatContent = () => {
        const oddEl = content?.filter((item, index) => index % 2 !== 0)
        const evenEl = content?.filter((item, index) => index % 2 === 0)
        const formatContent = oddEl?.map((item, index) => {
            return {
                right: item,
                left: evenEl?.find((item2, index2) => index2 === index)
            }
        })

        return formatContent
    }

    const handleFilterPosts = (code) => {
        navigate({
            pathname: location?.pathname,
            search: createSearchParams({
                [type]: code
            }).toString()
        })
        console.log('code: ', code)
    }

    return (
        <Box w='full' p={4} rounded='md' shadow='md' >
            <Heading fontSize='lg' fontWeight='bold' my='1' mb={4}>{title} </Heading>
            {!isDouble && <Flex direction='column' gap={2}>
                {content?.length > 0 && content.map(item => {
                    return (
                        <Link
                            to={`${formatVietnameseToString(item.value)}`}
                            key={item.id}
                        >
                            <Flex gap={2} align='center' cursor='pointer' _hover={{ textColor: 'orange.500' }} borderBottom='1px' borderColor='gray.200' borderStyle='dashed' paddingBottom='1px'>
                                <GrNext size={10} />
                                <chakra.p>{item.value}</chakra.p>
                            </Flex>
                        </Link>
                    )
                })}
            </Flex>}
            {isDouble && <Flex direction='column' gap={2}>
                {content?.length > 0 && formatContent(content).map((item, index) => {
                    return (
                        <Box key={index} >
                            <Flex align='center' justify='space-around'>
                                <Flex
                                    onClick={() => handleFilterPosts(item.left.id)}
                                    flex={1} gap={2} align='center' cursor='pointer' _hover={{ textColor: 'orange.500' }} borderBottom='1px' borderColor='gray.200' borderStyle='dashed' paddingBottom='1px'>
                                    <GrNext size={10} />
                                    <chakra.p fontSize='1rem'>{item.left.value}</chakra.p>
                                </Flex>
                                <Flex
                                    onClick={() => handleFilterPosts(item.right.id)}
                                    flex={1} gap={2} align='center' cursor='pointer' _hover={{ textColor: 'orange.500' }} borderBottom='1px' borderColor='gray.200' borderStyle='dashed' paddingBottom='1px' >
                                    <GrNext size={10} />
                                    <chakra.p fontSize='1rem'>{item.right.value}</chakra.p>
                                </Flex>
                            </Flex>
                        </Box>
                    )
                })}
            </Flex>}
        </Box>
    )
}

export default memo(ItemSidebar)