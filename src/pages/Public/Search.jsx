import { Button, Flex, chakra, useStatStyles } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Modal, SearchItem } from '../../components'
import icons from '../../ultils/icons'
import { useApp } from '../../hooks/useReducerContext'
import { fetchAreas, fetchCategories, fetchPrices, fetchProvinces } from '../../store/fetch/app'

const { MdOutlineHouseSiding, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, BsChevronRight, FiSearch } = icons

const Search = () => {

  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { categories, areas, prices, provinces, dispatchApp } = useApp()

  useEffect(() => {
    fetchAreas(dispatchApp)
    fetchCategories(dispatchApp)
    fetchPrices(dispatchApp)
    fetchProvinces(dispatchApp)
  }, [dispatchApp])


  const handleShowModal = (content, name) => {
    setContent(content)
    setName(name)
    setIsShowModal(true)
  }

  return (
    <>
      <Flex maxW='1100px' w='full' p={4} bg='yellow.300' rounded='lg' alignItems='center' justifyContent='space-around' gap={2}>
        <chakra.span onClick={() => handleShowModal(categories, 'category')} flex={1} cursor='pointer'>
          <SearchItem leftIcon={<MdOutlineHouseSiding />} rightIcon={<BsChevronRight />} fontWeight text='Phòng trọ, nhà trọ' />
        </chakra.span>
        <chakra.span onClick={() => handleShowModal(provinces, 'province')} flex={1} cursor='pointer' >
          <SearchItem leftIcon={<HiOutlineLocationMarker />} rightIcon={<BsChevronRight />} text='Toàn quốc' />
        </chakra.span>
        <chakra.span onClick={() => handleShowModal(prices, 'price')} flex={1} cursor='pointer' >
          <SearchItem leftIcon={<TbReportMoney />} rightIcon={<BsChevronRight />} text='Chọn giá' />
        </chakra.span>
        <chakra.span onClick={() => handleShowModal(areas, 'area')} flex={1} cursor='pointer' >
          <SearchItem leftIcon={<RiCrop2Line />} rightIcon={<BsChevronRight />} text='Chọn diện tích' />
        </chakra.span>
        <Button flex={1} leftIcon={<FiSearch />} py={2} px={4}>Tìm kiếm</Button>
      </Flex>
      {isShowModal && <Modal name={name} content={content} setIsShowModal={setIsShowModal} />}
    </>
  )
}

export default Search