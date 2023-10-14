import { Box, Button, Flex, Input, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Wrap, chakra } from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { getNumbersArea, getNumbersPrice } from '../ultils/common/getNumbers'
import { getCodes, getCodesArea } from '../ultils/common/getCodes'

const { GrLinkPrevious } = icons

const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {

    const [sliderValue, setSliderValue] = useState([
        name === 'price' && arrMinMax?.priceArr
            ? arrMinMax?.priceArr[0]
            : name === 'area' && arrMinMax?.areaArr
                ? arrMinMax?.areaArr[0]
                : 0,
        name === 'price' && arrMinMax?.priceArr
            ? arrMinMax?.priceArr[1]
            : name === 'area' && arrMinMax?.areaArr
                ? arrMinMax?.areaArr[1]
                : 100
    ])

    const [activeEl, setActiveEl] = useState('')

    const convert100toTarget = percent => {
        return name === 'price'
            ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
            : name === 'area'
                ? (Math.ceil(Math.round((percent * 0.9)) / 5) * 5)
                : 0
    }

    const convertto100 = percent => {
        let target = name === 'price' ? 15 : name === 'area' ? 90 : 1
        return Math.floor((percent / target) * 100)
    }

    const handleActive = (code, value) => {
        setActiveEl(code)
        let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setSliderValue([0, convertto100(1)])
            }
            if (arrMaxMin[0] === 20) {
                setSliderValue([0, convertto100(20)])
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setSliderValue([100, 100])
            }
        }
        if (arrMaxMin.length === 2) {
            setSliderValue([convertto100(arrMaxMin[0]), convertto100(arrMaxMin[1])])
        }
    }

    const handleBeforeSubmit = (e) => {
        let arrMinMax = [convert100toTarget(sliderValue[0]), convert100toTarget(sliderValue[1])]

        handleSubmit(e, {
            [`${name}Number`]: arrMinMax,
            [name]: `Từ ${convert100toTarget(sliderValue[0])} - ${convert100toTarget(sliderValue[1])} ${name === 'price' ? 'triệu' : 'm²'}`
        }, {
            [`${name}Arr`]: sliderValue
        })
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
                        <Stack
                            py={2} borderBottom='1px' borderBottomColor='gray.100'
                            onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                        >
                            <Radio
                                id='default'
                                name={name}
                                isChecked={!queries[`${name}Code`] ? true : false}
                            >
                                {defaultText}
                            </Radio>
                        </Stack>
                        {content?.map(item => {
                            return (
                                <Stack key={item.id}
                                    py={2} borderBottom='1px' borderBottomColor='gray.100'
                                    onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.id })}
                                >
                                    <Radio
                                        id={item.id}
                                        name={name}
                                        isChecked={(item.id === queries[`${name}Code`]) ? true : false}
                                    >
                                        {item.value}
                                    </Radio>
                                </Stack>
                            )
                        })}
                    </RadioGroup>
                }



                {(name === 'price' || name === 'area') &&
                    <Flex direction='column' align='center' justify='center' p={12} py={20} position='relative'>
                        <Flex zIndex={30} top='8' position='absolute' fontWeight='bold' fontSize='xl' textColor='orange.600'>
                            {(sliderValue[0] === 100 && sliderValue[1] === 100)
                                ? `Trên ${convert100toTarget(sliderValue[0])} ${name === 'price' ? 'triệu' : 'm²'}`
                                : `Từ ${convert100toTarget(sliderValue[0])} - ${convert100toTarget(sliderValue[1])} ${name === 'price' ? 'triệu' : 'm²'}`
                            }
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
                            >
                                {name === 'price' ? '15 triệu +' : name === 'area' ? '90 m² +' : ''}
                            </chakra.span>
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
                {(name === 'price' || name === 'area') &&
                    <Button
                        type='button'
                        w='full' bg='yellow.300' fontWeight='medium' roundedBottomLeft='md' roundedBottomRight='md'
                        onClick={handleBeforeSubmit}
                    >
                        ÁP DỤNG
                    </Button>
                }
            </Box >
        </Flex >
    )
}

export default memo(Modal)