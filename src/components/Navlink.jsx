import { Button } from '@chakra-ui/react'
import React from 'react'
import { NavLink as Link, useLocation } from 'react-router-dom'

const Navlink = ({ to, name, ...rest }) => {
    const location = useLocation()

    const isActive = location.pathname + location.search === to
    // console.log(location.pathname + location.search)

    return (
        <Link to={to}>
            <Button
                as='p'
                variant={isActive ? 'outline' : 'ghost'}
                colorScheme={isActive ? 'primary' : 'gray'}
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
                {...rest}
            >
                {name}
            </Button>
        </Link>

    )
}

export default Navlink