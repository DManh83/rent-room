import React from 'react'
import { useParams } from 'react-router-dom'

const DetailPost = () => {
    const { postId } = useParams()


    return (
        <div>DetailPost</div>
    )
}

export default DetailPost