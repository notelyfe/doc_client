import React from 'react'
import style from "../../Style/home.module.css"

const Canva = () => {
    return (
        <div className={`${style.canvaContainer} d-flex justify-content-center mt-1`}>
            <textarea
                className={`${style.canvaInput} w-50 bg-light rounded`}
                type="text"
            />
        </div>
    )
}

export default Canva