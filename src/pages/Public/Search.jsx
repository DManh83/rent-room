import { Button, Flex, chakra } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { Modal, SearchItem } from '../../components'
import icons from '../../ultils/icons'
import { useApp } from '../../hooks/useReducerContext'
import { fetchAreas, fetchCategories, fetchPrices, fetchProvinces } from '../../store/fetch/app'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'

const { MdOutlineHouseSiding, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, BsChevronRight, FiSearch } = icons

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isShowModal, setIsShowModal] = useState(false)
  const [content, setContent] = useState([])
  const [name, setName] = useState('')
  const { categories, areas, prices, provinces, dispatchApp } = useApp()
  const [queries, setQueries] = useState({})
  const [arrMinMax, setArrMinMax] = useState({})
  const [defaultText, setDefaultText] = useState('')
  // console.log(getCodes([3.5, 9], prices))

  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({})
      setQueries({})
    }
  }, [location])

  useEffect(() => {
    fetchAreas(dispatchApp)
    fetchCategories(dispatchApp)
    fetchPrices(dispatchApp)
    fetchProvinces(dispatchApp)
  }, [dispatchApp])


  const handleShowModal = (content, name, defaultText) => {
    setContent(content)
    setName(name)
    setDefaultText(defaultText)
    setIsShowModal(true)
  }

  const handleSubmit = useCallback((e, query, arrMaxMin) => {
    e.stopPropagation()
    setQueries(prev => ({ ...prev, ...query }))
    setIsShowModal(false)
    arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
  }, [isShowModal, queries])

  const handleSearch = () => {
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
    let queryCodesObj = {}
    queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
    // console.log(queryCodesObj)
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))

    let queryTextObj = {}

    queryText.forEach(item => { queryTextObj[item[0]] = item[1] })

    let titleSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê tất cả'} 
                        ${queryTextObj.province ? `${queryTextObj.province.toLowerCase()}` : ''} 
                        ${queryTextObj.price ? `giá ${queryTextObj.price.toLowerCase()}` : ''} 
                        ${queryTextObj.area ? `diện tích ${queryTextObj.area.toLowerCase()}` : ''} `
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(queryCodesObj).toString(),
    }, { state: { titleSearch } })

  }

  return (
    <>
      <Flex maxW='1100px' w='full' p={4} bg='yellow.300' rounded='lg' alignItems='center' justifyContent='space-around' gap={2}>
        <chakra.span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} flex={1} cursor='pointer'>
          <SearchItem leftIcon={<MdOutlineHouseSiding />} rightIcon={<BsChevronRight />} fontWeight text={queries.category} defaultText={'Tìm tất cả'} />
        </chakra.span>
        <chakra.span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} flex={1} cursor='pointer' >
          <SearchItem leftIcon={<HiOutlineLocationMarker />} rightIcon={<BsChevronRight />} text={queries.province} defaultText={'Toàn quốc'} />
        </chakra.span>
        <chakra.span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} flex={1} cursor='pointer' >
          <SearchItem leftIcon={<TbReportMoney />} rightIcon={<BsChevronRight />} text={queries.price} defaultText={'Chọn giá'} />
        </chakra.span>
        <chakra.span onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')} flex={1} cursor='pointer' >
          <SearchItem leftIcon={<RiCrop2Line />} rightIcon={<BsChevronRight />} text={queries.area} defaultText={'Chọn diện tích'} />
        </chakra.span>
        <Button flex={1} leftIcon={<FiSearch />} py={2} px={4} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Flex>
      {isShowModal && <Modal
        handleSubmit={handleSubmit}
        queries={queries}
        name={name}
        content={content}
        arrMinMax={arrMinMax}
        setIsShowModal={setIsShowModal}
        defaultText={defaultText}
      />}
    </>
  )
}

export default Search