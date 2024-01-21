import React, { useContext } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { Link } from 'react-router-dom'

const RecentDocs = () => {

    const { allDocs, userData, setAllDocs } = useContext(Context)

    const deleteDoc = async (id) => {
        setAllDocs(
            allDocs?.filter(item => {
                return item._id !== id
            })
        )
    }

    return (
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
                            <h5 onClick={() => deleteDoc(item._id)} className={` ${style.deleteBtn} m-0 text-danger px-2`}>&times;</h5>
                        </div>
                    )
                })
            ) : (
                <p className='mt-3'>No Docs Available</p>
            )}
        </div>
    )
}

export default RecentDocs