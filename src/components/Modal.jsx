import { Box, Button, Flex, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Wrap, chakra } from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import icons from '../ultils/icons'

const { GrLinkPrevious } = icons

const Modal = ({ setIsShowModal, content, name }) => {

    const [sliderValue, setSliderValue] = useState([0, 100])

    const [activeEl, setActiveEl] = useState()

    const convert100toTarget = (percent) => {
        return (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
    }

    const convertTargetto100 = (percent) => {
        return Math.floor((percent / 15) * 100)
    }

    const getNumbers = string => string.split(' ').map(item => +item).filter(item => !item === false)

    const handleActive = (code, value) => {
        setActiveEl(code)
        let arrMaxMin = getNumbers(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setSliderValue([0, convertTargetto100(1)])
            }
            if (arrMaxMin[0] === 15) {
                setSliderValue([100, 100])
            }
        }
        if (arrMaxMin.length === 2) {
            setSliderValue([convertTargetto100(arrMaxMin[0]), convertTargetto100(arrMaxMin[1])])
        }
    }

    return (
        <Flex onClick={() => { setIsShowModal(false) }}
            position='fixed' top={0} right={0} left={0} bottom={0} backgroundColor='rgba(0,0,0,0.3)' zIndex={2} justify='center' align='center'>
            <Box
                onClick={(e) => {
                    e.stopPropagation()
                    setIsShowModal(true)
                }}
                w='40%' bg='white' rounded='md'>
                <Flex h='45px' px={4} align='center' borderBottom='1px' borderBottomColor='gray.100'>
                    <chakra.span
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowModal(false)
                        }}
                        cursor='pointer'
                    >
                        <GrLinkPrevious size={24} />
                    </chakra.span>
                </Flex>
                {(name === 'category' || name === 'province')
                    && <RadioGroup p={4} >
                        {content?.map(item => {
                            return (
                                <Stack key={item.id} py={2} borderBottom='1px' borderBottomColor='gray.100'>
                                    <Radio value={item.id} name={name}>{item.value}</Radio>
                                </Stack>
                            )
                        })}
                    </RadioGroup>
                }

                {(name === 'price' || name === 'area') &&
                    <Flex direction='column' align='center' justify='center' p={12} py={20} position='relative'>
                        <Flex zIndex={30} top='8' position='absolute' fontWeight='bold' fontSize='xl' textColor='orange.600'>
                            {`Từ ${convert100toTarget(sliderValue[0])} - ${convert100toTarget(sliderValue[1])} triệu`}
                        </Flex>
                        <RangeSlider position='absolute' w='90%' defaultValue={[5, 10]} min={0} max={100} step={1}
                            value={sliderValue} onChange={value => {
                                setSliderValue(value)
                                activeEl && setActiveEl('')
                            }}
                        >
                            <RangeSliderTrack bg='gray.200'>
                                <RangeSliderFilledTrack bg='orange.600' gridTemplate='auto' />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0} />
                            <RangeSliderThumb boxSize={6} index={1} />
                        </RangeSlider>
                        <Flex position='absolute' zIndex={30} top={28} left={0} right={0} justify='space-between' align='center'>
                            <chakra.span px='16' cursor='pointer'
                                onClick={() => setSliderValue([0, sliderValue[1]])}
                            >0</chakra.span>
                            <chakra.span mr='10' cursor='pointer'
                                onClick={() => setSliderValue([sliderValue[0], 100])}
                            >15 triệu +</chakra.span>
                        </Flex>
                        <Box mt={16} px={4}>
                            <chakra.h4 fontWeight='medium' mb={4}>Chọn nhanh</chakra.h4>
                            <Wrap spacing='3' align='center' w='full'>
                                {content?.map(item => {
                                    return (
                                        <chakra.span key={item.id} px={4}
                                            bgColor={`${item.id === activeEl ? 'orange.400' : 'gray.200'}`}
                                            textColor={`${item.id === activeEl ? 'white' : ''}`}
                                            rounded='md' cursor='pointer'
                                            onClick={() => handleActive(item.id, item.value)}
                                        >
                                            {item.value}
                                        </chakra.span>
                                    )
                                })}
                            </Wrap>
                        </Box>
                    </Flex>}
            </Box >
        </Flex >
    )
}

export default memo(Modal)