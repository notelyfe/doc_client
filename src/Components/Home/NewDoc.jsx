import React from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { v4 as uuid4 } from "uuid"
import { useNavigate } from 'react-router-dom'

const NewDoc = () => {

    const navigate = useNavigate()

    const createDoc = () => {
        let docId = uuid4().split("-").join("")
        navigate(`/canva/${docId}`)
    }

    return (
        <div className={`${style.home} bg-light border px-5 py-3 d-flex justify-content-center`}>
            <div className={style.newDoc} onClick={createDoc}>
                <h1 className='display-1 text-primary'>+</h1>
            </div>
        </div>
    )
}

export default NewDoc