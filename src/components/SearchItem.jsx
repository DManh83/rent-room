import { Flex, chakra } from '@chakra-ui/react'
import React, { memo } from 'react'

const SearchItem = ({ text, leftIcon, rightIcon, fontWeight, defaultText }) => {
    return (
        <Flex bg='white' py={2} px={4} rounded='md' textColor='gray.400' align='center' justify='space-between' fontSize='13px'>
            <Flex align='center' gap={1}>
                {leftIcon}
                <chakra.span fontWeight={(fontWeight || text) ? 'medium' : ''} textColor='black' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{text || defaultText}</chakra.span>
            </Flex>
            {rightIcon}
        </Flex>
    )
}

export default memo(SearchItem)