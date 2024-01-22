import React, { useContext } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { Link, useParams } from 'react-router-dom'

const Header = ({ docName, setDocName }) => {

    const { userData } = useContext(Context)
    let { name } = useParams()

    return (
        <>
            <div className={`${style.nav} bg-primary text-light d-flex px-5 align-items-center justify-content-between`}>
                <div className="container d-flex align-items-center w-25 mx-0">
                    {name && <input
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
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