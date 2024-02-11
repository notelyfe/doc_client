import React, { useContext, useEffect, useState } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../Services/api'
import Share from './Share'
import EditModel from './EditModel'
import useRefreshToken from "../../Hooks/useRefreshToken"

const RecentDocs = () => {

    const { allDocs, userData, setAllDocs } = useContext(Context)
    const [share, setShare] = useState({ state: false, id: "" })
    const [edit, setEdit] = useState({ state: false, id: "" })
    const refresh = useRefreshToken()

    const deleteDoc = async (id) => {

        try {

            let token = await refresh()

            if (!token) return

            const res = await api.delete(`/api/doc/deleteDoc/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.status === 200) {
                setAllDocs(
                    allDocs?.filter(item => {
                        return item._id !== id
                    })
                )
                toast.success(res?.data?.message, {
                    duration: 4000,
                })
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(() => {

        const getAllDocs = async () => {
            try {

                let token = await refresh()

                if (!token) return

                const res = await api.get("/api/doc/getAllDocs", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.status === 200) {
                    setAllDocs(res?.data)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }

        getAllDocs()

    }, [])

    return (
        <>
            <div className="container mt-4 w-50 p-2">
                My Docs
                {allDocs?.length > 0 ? (
                    allDocs?.map(item => {
                        return (
                            <div
                                key={item._id}
                                className="container border rounded p-2 px-4 my-1 d-flex align-items-center justify-content-between">
                                <div className='d-flex align-items-center justify-content-between w-50'>
                                    <h6 className='m-0'>
                                        <Link
                                            to={`/canva/${item.doc_name}/${item._id}`}
                                            className='text-decoration-none text-dark'
                                        >{item.doc_name}
                                        </Link>
                                    </h6>
                                    <p className={` ${style.docText} m-0`}>
                                        {userData?._id === item.created_by ? "Created" : "Shared"}
                                    </p>
                                </div>
                                <div className='d-flex'>
                                    {item.created_by === userData?._id && (
                                        <abbr title="Edit Permission">
                                            <h5 onClick={() => setEdit({ state: true, id: item._id })} className={` ${style.deleteBtn} m-0 text-primary px-2`}>&#9998;</h5>
                                        </abbr>
                                    )}
                                    {userData?._id === item.created_by && (
                                        <abbr title="share">
                                            <h5 onClick={() => setShare({ state: true, id: item._id })} className={` ${style.deleteBtn} m-0 text-primary px-2`}>&#8631;</h5>
                                        </abbr>
                                    )}
                                    <abbr title="delete">
                                        <h5 onClick={() => deleteDoc(item._id)} className={` ${style.deleteBtn} m-0 text-danger px-2`}>&times;</h5>
                                    </abbr>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p className='mt-3'>No Docs Available</p>
                )}
            </div>
            {share?.state === true && <Share
                setShare={setShare}
                share={share}
            />}
            {edit?.state === true && <EditModel setEdit={setEdit} edit={edit} />}
        </>
    )
}

export default RecentDocs