import React, { useState } from 'react'
import style from "../../Style/home.module.css"
import api from '../../Services/api'
import toast from 'react-hot-toast'
import useRefreshToken from "../../Hooks/useRefreshToken"

const Share = ({ setShare, share }) => {

    const [email, setEmail] = useState("")
    const [permission, setPermission] = useState(false)
    const [loading, setLoading] = useState(false)
    const refresh = useRefreshToken()

    const shareWith = async () => {
        try {

            setLoading(true)

            let token = await refresh()

            if (!token) return

            let data = {
                doc_id: share.id,
                share_to: [{
                    email: email,
                    permission: permission
                }]
            }

            const res = await api.post("/api/doc/shareDoc", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setLoading(false)

            if (res.status === 200) {
                toast.success(res.data.message)
                setShare({ state: false, id: "" })
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
        }
    }


    return (
        <>
            <div className={`${style.shareMainWrapper} bg-dark`}></div>
            <div className={` ${style.shareWrapper} container w-50 rounded p-1`}>
                <div className="container p-3 d-flex align-items-center justify-content-between">
                    <input
                        type="email"
                        className='form-control mx-1'
                        placeholder='Email '
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={() => setShare({ state: false, id: "" })} className="btn btn-danger mx-1">&times;</button>
                </div>
                <div className="form-check mx-4">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        onChange={(e) => setPermission(e.target.checked)}
                        value={permission} />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                        Write Permission
                    </label>
                </div>
                {loading === true ? (
                    <button className="btn btn-success mx-4 my-2" type="button">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                ) : (
                    <button onClick={shareWith} className="btn btn-success mx-4 my-2">Share</button>
                )}
            </div >
        </>
    )
}

export default Share