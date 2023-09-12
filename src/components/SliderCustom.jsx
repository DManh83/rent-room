import { Box, Flex, Image } from '@chakra-ui/react'
import React, { memo } from 'react'
import Slider from 'react-slick'

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidersToShow: 1,
    sliderToScroll: 1
}

const SliderCustom = ({ images }) => {


    return (
        <Box>
            <Slider {...settings}>
                {images?.length > 0 && images?.map((item, index) => {
                    return (
                        <Box key={index} bg='black' flex h='320px' justifyContent='center'>
                            <Image h='full' objectFit='contain' m='auto' src={item} alt='slider' />
                        </Box>
                    )
                })}

            </Slider>
        </Box>
    )
}

export default memo(SliderCustom)