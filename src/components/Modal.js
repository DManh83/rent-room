import { Box, Flex, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, chakra } from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import icons from '../ultils/icons'

const { GrLinkPrevious } = icons

const Modal = ({ setIsShowModal, content, name }) => {

    const [sliderValue, setSliderValue] = useState([0, 100])
    const [percent1, setPercent1] = useState(0)
    const [percent2, setPercent2] = useState(100)

    const handleChange = (value) => {
        setSliderValue(value)
        setPercent1(sliderValue[0])
        setPercent2(sliderValue[1])
    }

    return (
        <Flex onClick={() => { setIsShowModal(false) }}
            position='fixed' top={0} right={0} left={0} bottom={0} backgroundColor='rgba(0,0,0,0.3)' zIndex={2} justify='center' align='center'>
            <Box
                onClick={(e) => {
                    e.stopPropagation()
                    setIsShowModal(true)
                }}
                w='35%' bg='white' rounded='md'>
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

                {(name === 'price' || name === 'area')
                    &&
                    <Flex direction='column' align='center' justify='center' p={12} py={20} position='relative'>
                        <Flex zIndex={30} top='8' position='absolute' fontWeight='bold' fontSize='xl' textColor='orange.600'> {`Từ ${percent1} - ${percent2} triệu`}</Flex>
                        <RangeSlider position='absolute' w='90%' defaultValue={[5, 10]} min={0} max={100} step={1}
                            value={sliderValue} onChange={handleChange}
                        >
                            <RangeSliderTrack bg='gray.200'>
                                <RangeSliderFilledTrack bg='red.400' gridTemplate='auto' />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0} />
                            <RangeSliderThumb boxSize={6} index={1} />
                        </RangeSlider>
                        <Flex position='absolute' zIndex={30} top={28} left={0} right={0} justify='space-between' align='center'>
                            <chakra.span px='16'>0</chakra.span>
                            <chakra.span mr={'10'}>15 triệu +</chakra.span>
                        </Flex>
                    </Flex>
                }
            </Box >
        </Flex >
    )
}

export default memo(Modal)