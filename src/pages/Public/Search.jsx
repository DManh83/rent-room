import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { SearchItem } from '../../components'
import icons from '../../ultils/icons'

const { MdOutlineHouseSiding, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, BsChevronRight, FiSearch } = icons

const Search = () => {
  return (
    <Flex maxW='1100px' w='full' p={4} bg='yellow.300' rounded='lg' alignItems='center' justifyContent='space-around' gap={2}>
      <SearchItem leftIcon={<MdOutlineHouseSiding />} rightIcon={<BsChevronRight />} text='Phòng trọ, nhà trọ' />
      <SearchItem leftIcon={<HiOutlineLocationMarker />} rightIcon={<BsChevronRight />} text='Toàn quốc' />
      <SearchItem leftIcon={<TbReportMoney />} rightIcon={<BsChevronRight />} text='Chọn giá' />
      <SearchItem leftIcon={<RiCrop2Line />} rightIcon={<BsChevronRight />} text='Chọn diện tích' />
      <Button leftIcon={<FiSearch />} w='full' py={2} px={4}>Tìm kiếm</Button>
    </Flex>
  )
}

export default Search