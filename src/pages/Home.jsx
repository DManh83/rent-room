import React from 'react'
import { Layout, Navbar } from '../components'
import { Badge, Heading, List, ListItem, Text, chakra } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Layout>
            <Navbar />
            {/* <Heading>Home Page</Heading> */}
            <Text my={6}></Text>

            <Heading>
                Hỗ trợ tìm phòng trọ
            </Heading>
            {/* <List>
                <ListItem>
                    <Link to='/tao-lai-mat-khau'>reset page</Link>
                </ListItem>
                <ListItem>
                    <Link to='/quen-mat-khau'>forgot page</Link>
                </ListItem>
            </List> */}
        </Layout>
    )
}

export default Home