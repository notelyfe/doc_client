import React, { useContext, useEffect, useState } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { Link, useParams } from 'react-router-dom'
import api from "../../Services/api"
import toast from 'react-hot-toast'

const Header = ({ docName, setDocName, setAllDocs, allDocs }) => {

    const { userData, accessToken } = useContext(Context)
    let { name, docId } = useParams()
    const [onchangeState, setOnchangeState] = useState(false)

    useEffect(() => {

        let clearTime = setTimeout(() => {
            if (onchangeState === true) {
                editName(docName)
            }
            setOnchangeState(false)
        }, [5000]);

        return () => clearTimeout(clearTime)

    }, [docName])

    const editName = async (val) => {
        try {
            const res = await api.put("/api/doc/editName", { doc_id: docId, name: val }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (res?.status === 200) {
                toast.success(res?.data?.msg)
                let newName = allDocs.map(item => {
                    if (item._id === docId) {
                        return { ...item, doc_name: val }
                    } else {
                        return item
                    }
                })
                setAllDocs(newName)
            }

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    return (
        <>
            <div className={`${style.nav} bg-primary text-light d-flex px-5 align-items-center justify-content-between`}>
                <div className="container d-flex align-items-center w-25 mx-0">
                    {name && <input
                        value={docName}
                        onChange={(e) => {
                            setDocName(e.target.value)
                            setOnchangeState(true)
                        }}
                        type="text"
                        className={` ${style.nameInput} form-control bg-primary text-light`}
                    />}
                    <h4 className='m-0'>
                        <Link to="/" className='text-light text-decoration-none'>{name && "."}Docx</Link>
                    </h4>
                </div>
                <h5 className='m-0 text-capitalize'>{userData?.name}</h5>
            </div>
        </>
    )
}

export default Header