import React, { memo } from 'react'
import { Box, Image } from '@chakra-ui/react'

const ProvinceBtn = ({ name, image }) => {
    return (
        <Box shadow='md' roundedBottomLeft='md' roundedBottomRight='md' cursor='pointer' textColor='blue.600' _hover={{ textColor: 'orange.600' }}>
            <Image src={image} alt='name'
                w='190px' h='110px' objectFit='cover' roundedTopLeft='md' roundedTopRight='md'
            />
            <Box textAlign='center' fontWeight='medium' p={2} >{name}</Box>
        </Box>

    )
}

export default memo(ProvinceBtn)