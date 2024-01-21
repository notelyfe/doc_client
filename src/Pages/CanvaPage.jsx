import React from 'react'
import Header from '../Components/Home/Header'
import { useParams } from 'react-router-dom'
import Tools from '../Components/Home/Tools'
import Canva from '../Components/Home/Canva'

const CanvaPage = () => {

    let params = useParams()

    console.log(params?.docId)

    return (
        <>
            <Header />
            <Tools />
            <Canva />
        </>
    )
}

export default CanvaPage