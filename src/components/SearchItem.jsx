import { Flex, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'

const SearchItem = ({ text, leftIcon, rightIcon, fontWeight, defaultText }) => {
    return (
        <Flex bg='white' py={2} px={4} rounded='md' textColor='gray.400' w='full' alignItems='center' justifyContent='space-between' fontSize='13px'>
            <Flex alignItems='center' gap={1} w='full'>
                {leftIcon}
                <chakra.span fontWeight={(fontWeight || text) ? 'medium' : ''} textColor='black' w='full' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{text || defaultText}</chakra.span>
            </Flex>
            {rightIcon}
        </Flex>
    )
}

export default memo(SearchItem)