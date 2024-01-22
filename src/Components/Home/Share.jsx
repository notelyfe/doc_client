import React, { useContext, useState } from 'react'
import style from "../../Style/home.module.css"
import api from '../../Services/api'
import toast from 'react-hot-toast'
import Context from '../../Context/Context'

const Share = ({ setShare, share }) => {

    const [email, setEmail] = useState("")
    const [permission, setPermission] = useState(false)
    const { accessToken } = useContext(Context)

    const shareWith = async () => {
        try {

            let data = {
                doc_id: share.id,
                share_to: [{
                    email: email,
                    permission: permission
                }]
            }

            const res = await api.post("/api/doc/shareDoc", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(res.status===200){
                toast.success(res.data.msg)
                setShare({state: false, id: ""})
            }

        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }


    return (
        <div className={` ${style.shareWrapper} container w-50 rounded p-1`}>
            <div className="container p-3 d-flex align-items-center justify-content-between">
                <input
                    type="email"
                    className='form-control mx-1'
                    placeholder='Email '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => setShare({ state: false, id: "" })} className="btn btn-primary mx-1">&times;</button>
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
            <button onClick={shareWith} className="btn btn-success mx-4 my-2">Share</button>
        </div>
    )
}

export default Share