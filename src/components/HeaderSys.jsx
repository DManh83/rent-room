import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

const HeaderSys = () => {
    return (
        <Box className='w-full flex flex-none'>
            <Box className='flex-auto'>
                <Navbar />
            </Box>
        </Box>
    )
}

export default HeaderSys