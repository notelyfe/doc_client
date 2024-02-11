import React, { useContext, useEffect, useState } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from "../../Services/api"
import toast from 'react-hot-toast'
import useRefreshToken from "../../Hooks/useRefreshToken"

const Header = ({ docName, setDocName, setAllDocs, allDocs }) => {

    const navigate = useNavigate()
    const { userData, setAccessToken } = useContext(Context)
    let { name, docId } = useParams()
    const [onchangeState, setOnchangeState] = useState(false)
    const refresh = useRefreshToken()

    useEffect(() => {

        let clearTime = setTimeout(() => {
            if (onchangeState === true) {
                editName(docName)
            }
            setOnchangeState(false)
        }, [2000]);

        return () => clearTimeout(clearTime)

    }, [docName, onchangeState])

    const editName = async (val) => {

        try {

            let token = await refresh()

            if(!token) return

            const res = await api.put("/api/doc/editName", { doc_id: docId, name: val }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res?.status === 200) {
                toast.success(res?.data?.message)
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
            toast.error(error?.response?.data?.message)
        }
    }

    const logout = async () => {
        try {
            const res = await api.get("/api/logout", {
                withCredentials: true
            })
            setAccessToken(null)
            localStorage.clear()
            navigate("/login")
            toast.success("Logout Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className={`${style.nav} px-5 bg-primary text-light d-flex align-items-center justify-content-between`}>
            <div className="  d-flex align-items-center w-25 mx-0">
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
            <div className="  w-25 d-flex align-items-center justify-content-end p-0">
                <h5 className='m-0 text-capitalize'>{userData?.name}</h5>
                <button onClick={logout} className="btn btn-warning btn-sm mx-2">logout</button>
            </div>
        </div>
    )
}

export default Header