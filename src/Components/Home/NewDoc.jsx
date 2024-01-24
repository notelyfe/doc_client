import React, { useContext, useState } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import api from "../../Services/api"
import toast from 'react-hot-toast'

const NewDoc = () => {

    const navigate = useNavigate()
    const { accessToken, setDoc, setAllDocs, allDocs } = useContext(Context)
    const [loading, setLoading] = useState(false)

    const createDoc = async () => {

        if(loading === true) return

        try {

            setLoading(true)

            const res = await api.get("/api/doc/newDoc", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            setLoading(false)

            if (res.status === 200) {
                toast.success("Doc Created Successfully", {
                    duration: 4000,
                })
                setDoc(res.data)
                setAllDocs([...allDocs, res?.data])
                navigate(`/canva/${res.data.doc_name}/${res.data._id}`)
            }

        } catch (error) {
            toast.error(error?.response?.data?.msg)
            setLoading(false)
        }

    }

    return (
        <div className={`${style.home} bg-light border px-5 py-3 d-flex justify-content-center`}>
            <div className={style.newDoc} onClick={createDoc}>
                {loading === true ? (
                    <>
                        <div className={` ${style.loadingWrapper} container bg-dark border`}></div>
                        <div class="spinner-border text-primary position-absolute" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </>
                ) : (
                    <h1 className='display-1 text-primary'>+</h1>
                )}

            </div>
        </div >
    )
}

export default NewDoc