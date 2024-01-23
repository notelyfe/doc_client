import React, { useContext, useState } from 'react'
import Header from '../Components/Home/Header'
import { useParams } from 'react-router-dom'
import Canva from '../Components/Home/Canva'
import Context from '../Context/Context'

const CanvaPage = () => {

    let { name } = useParams()
    const [docName, setDocName] = useState(name)
    const { allDocs, setAllDocs } = useContext(Context)

    return (
        <>
            <Header
                docName={docName}
                setDocName={setDocName}
                setAllDocs={setAllDocs}
                allDocs={allDocs}
            />
            <Canva />
        </>
    )
}

export default CanvaPage