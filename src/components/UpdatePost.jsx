import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { CreatePost } from '../pages/System'

const UpdatePost = ({ setIsEdit }) => {
    return (
        <Flex
            top={0} left={0} right={0} bottom={0} bg='rgba(0,0,0,0.7)'
            position='absolute'
            justify='center'
            onClick={e => {
                e.stopPropagation()
                setIsEdit(false)
            }}
        >
            <Box
                bg='white' maxW='70%' w='full' overflowY='auto'
                onClick={e => e.stopPropagation()}
            >
                <CreatePost isEdit setIsEdit={setIsEdit} />
            </Box>
        </Flex>
    )
}

export default UpdatePost