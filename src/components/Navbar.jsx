import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Navlink from './Navlink'
import optionsNav from '../ultils/optionsNav'

const Navbar = () => {

    return (

        <Box
            backgroundColor={useColorModeValue('pink.200')}
            borderBottom='2px'
            borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
        // mb={4}
        >

            <HStack py={2} justifyContent='flex-start' maxW='container.lg' mx='auto'>

                {optionsNav?.length > 0 && optionsNav.map((item) => {
                    return (
                        <Navlink key={item.id} to={`/${item.path}`} name={item.name} />
                    )
                })}
            </HStack>
        </Box>

    )
}

export default Navbar