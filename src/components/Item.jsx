import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../ultis/constant'
import { formatVietnameseToString } from '../ultis/formatVietnameseToString'

const Item = ({ title, images }) => {
    return (
        <Box>
            <Link to={`${path.DETAIL}/${formatVietnameseToString(title)}/${id}`}
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'
            >

            </Link>
        </Box>
    )
}

export default Item