import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { SearchItem } from '../../components'
import { icons } from '../../ultis/icons'

const Search = () => {
  return (
    <Flex width={['100%', '1024px']} w='full' h='55px' p={4} bg='yellow.300' rounded='lg' alignItems='center' justifyContent='space-around' gap={2}>
      <SearchItem leftIcon={<icons.MdOutlineHouseSiding />} rightIcon={<icons.BsChevronRight />} text='Phòng trọ, nhà trọ' />
      <SearchItem leftIcon={<icons.HiOutlineLocationMarker />} rightIcon={<icons.BsChevronRight />} text='Toàn quốc' />
      <SearchItem leftIcon={<icons.TbReportMoney />} rightIcon={<icons.BsChevronRight />} text='Chọn giá' />
      <SearchItem leftIcon={<icons.RiCrop2Line />} rightIcon={<icons.BsChevronRight />} text='Chọn diện tích' />
      <Button leftIcon={<icons.FiSearch />} w='full' py={2} px={4}>Tìm kiếm</Button>
    </Flex>
  )
}

export default Search