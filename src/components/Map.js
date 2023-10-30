import { Box, Flex } from '@chakra-ui/react'
import React, { memo } from 'react'
import GoogleMapReact from 'google-map-react'
import { HiLocationMarker } from 'react-icons/hi'

const Position = ({ icon }) => <Flex>{icon}</Flex>

const Map = ({ coords, address }) => {
    return (
        <Box h='300px' w='full' position='relative'>
            <Box position='absolute' top={0} bg='white' shadow='md' p={2} fontSize='sm' rounded='md'>{address}</Box>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={coords}
                defaultZoom={11}
                center={coords}
            >
                <Position
                    lat={coords?.lat}
                    lng={coords?.lng}
                    icon={<HiLocationMarker color='red' size={24} />}
                />
            </GoogleMapReact>
        </Box>
    )
}

export default memo(Map) 