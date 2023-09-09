import React from 'react'
import { Layout } from '../../components'
import { Outlet } from 'react-router-dom'
import HomePage from './HomePage'

const Home = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default Home