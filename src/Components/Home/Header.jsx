import React, { useContext } from 'react'
import style from "../../Style/home.module.css"
import Context from '../../Context/Context'
import { Link } from 'react-router-dom'

const Header = () => {

    const { userData } = useContext(Context)

    return (
        <>
            <div className={`${style.nav} bg-primary text-light d-flex px-5 align-items-center justify-content-between`}>
                <h4 className='m-0'>
                    <Link to="/" className='text-light text-decoration-none'>Docs</Link>
                </h4>
                <h5 className='m-0 text-capitalize'>{userData?.name}</h5>
            </div>
        </>
    )
}

export default Header