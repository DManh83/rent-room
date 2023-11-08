import { Box, useToast } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { HiLocationMarker } from 'react-icons/hi'
import { apiGetCoordsMap } from '../services'

const Position = ({ icon }) => <Box position='absolute'>{icon}</Box>

const Map = ({ address }) => {
    const [coords, setCoords] = useState(null)
    const toast = useToast()

    useEffect(() => {
        const getResults = async () => {
            const response = await apiGetCoordsMap(address)
            // console.log(response)
            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setCoords({
                    lat: location.lat,
                    lng: location.lng,
                });
            } else {
                setCoords(null);
                // toast({
                //     description: 'Không tìm thấy địa chỉ',
                //     status: 'error',
                //     duration: 5000,
                //     isClosable: true,
                // })
            }
        }

        if (address) {
            getResults()
        } else {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                setCoords({ lat: latitude, lng: longitude })
                console.log(coords)
            })
        }
    }, [address])

    return (
        <Box h='300px' w='full' position='relative'>
            {address && <Box position='absolute' top='8px' left='8px' zIndex={50} maxW='300px' bg='white' shadow='md' p={2} fontSize='sm' rounded='md'>{address}</Box>}
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={coords}
                defaultZoom={13}
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