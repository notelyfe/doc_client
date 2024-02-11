import React, { useContext, useEffect, useState } from 'react'
import style from '../../Style/home.module.css'
import Context from '../../Context/Context'
import api from '../../Services/api'
import toast from 'react-hot-toast'
import useRefreshToken from "../../Hooks/useRefreshToken"

const EditModel = ({ setEdit, edit }) => {

    const { allDocs } = useContext(Context)
    const [otherOwners, setOtherOwners] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const refresh = useRefreshToken()

    useEffect(() => {
        let currentDoc = allDocs?.filter(item => {
            return item._id === edit.id
        })

        const data = currentDoc[0]?.other_owners.filter(item => {
            if (searchText === "") {
                return item
            } else {
                return item.name.toLowerCase().includes(searchText)
            }
        })

        setOtherOwners(data)

    }, [searchText, allDocs, edit.id])

    const updatePermission = async (docId, user) => {
        setLoading(true)

        let token = await refresh()

        if (!token) return

        const res = await api.patch("/api/doc/editPermission", { docId, user }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setLoading(false)

        if (res.status === 200) {
            toast.success("Permission Edited")
            setEdit({ state: false, id: "" })
        }
    }

    return (
        <>
            <div className={`${style.editMainWrapper} bg-dark`}>
            </div>
            <div className={`${style.editWrapper} container w-50 rounded bg-light py-2`}>
                <div className="container d-flex p-1">
                    <input
                        type="text"
                        className='form-control mx-2'
                        placeholder='Search User'
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                    />
                    <button onClick={() => setEdit({ state: false, id: "" })} className="btn btn-danger mx-2">&times;</button>
                </div>
                <div className={`${style.subWrapper} container overflow-auto`}>
                    {otherOwners?.length > 0 ? (
                        otherOwners?.map(item => {
                            return (
                                <div key={item._id} className="container border my-2 rounded d-flex align-items-center justify-content-between">
                                    <h5 className='m-0 py-2 text-capitalize'>{item.name}</h5>
                                    <div className="container w-25 d-flex justify-content-center">
                                        <abbr title="Write Permission">
                                            {item?.write_permission === true && <h4 className='m-0 mx-2 text-success'>&#9998;</h4>}
                                        </abbr>
                                        <abbr title="Read Permission">
                                            <h4 className='m-0 mx-2 text-success'>&#128366;</h4>
                                        </abbr>
                                    </div>
                                    {loading === true ? (
                                        <button className="btn btn-success" type="button">
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        </button>
                                    ) : (
                                        <button onClick={() => updatePermission(edit.id, item.user)} className="btn btn-sm btn-success m-1">Update</button>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <h5 className='mt-3 mx-2'>No Data Available</h5>
                    )}
                </div>
            </div>
        </>
    )
}

export default EditModel