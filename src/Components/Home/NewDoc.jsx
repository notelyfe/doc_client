import React, { useContext, useState } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useRefreshToken from "../../Hooks/useRefreshToken"
import api from '../../Services/api'

const NewDoc = () => {

    const navigate = useNavigate()
    const refresh = useRefreshToken()
    const { setDoc, setAllDocs, allDocs } = useContext(Context)
    const [loading, setLoading] = useState(false)

    const createDoc = async () => {

        if (loading === true) return

        try {

            setLoading(true)

            let token = await refresh()

            if (!token) return

            const res = await api.get("/api/doc/newDoc", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                toast.success("Doc Created Successfully", {
                    duration: 4000,
                })
                setDoc(res.data)
                setAllDocs([...allDocs, res?.data])
                navigate(`/canva/${res.data.doc_name}/${res.data._id}`)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }

    }

    return (
        <div className={`${style.home} bg-light border px-5 py-3 d-flex justify-content-center`}>
            <div className={style.newDoc} onClick={createDoc}>
                {loading === true ? (
                    <>
                        <div className={` ${style.loadingWrapper} container bg-dark border`}></div>
                        <div className="spinner-border text-primary position-absolute" role="status">
                            <span className="visually-hidden">Loading...</span>
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