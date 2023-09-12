import React, { memo } from 'react'
import { Box, Image } from '@chakra-ui/react'
import locationHCM from '../assets/location_hcm.jpg'

const ProvinceBtn = ({ name, image }) => {
    return (
        <Box shadow='md' roundedBottomLeft='md' roundedBottomRight='md'>
            <Image src={image} alt='name'
                w='190px' h='110px' objectFit='cover' roundedTopLeft='md' roundedTopRight='md'
            />
            <Box textAlign='center' fontWeight='medium' p={2} textColor='blue.600'>{name}</Box>
        </Box>

    )
}

export default memo(ProvinceBtn)