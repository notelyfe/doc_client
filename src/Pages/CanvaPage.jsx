import React, { useState } from 'react'
import Header from '../Components/Home/Header'
import { useParams } from 'react-router-dom'
import Canva from '../Components/Home/Canva'

const CanvaPage = () => {

    let { name } = useParams()
    const [docName, setDocName] = useState(name)

    return (
        <>
            <Header
                docName={docName}
                setDocName={setDocName}
            />
            <Canva
                docName={docName}
                setDocName={setDocName}
            />
        </>
    )
}

export default CanvaPage