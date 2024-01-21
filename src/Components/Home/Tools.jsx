import React, { useState } from 'react'
import style from '../../Style/home.module.css'
import { useParams } from 'react-router-dom'

const Tools = () => {

  const params = useParams()
  const [docName, setDocName] = useState(params.name)

  return (
    <div className={`${style.toolsContainer} container bg-light`}>
      <input
        type="text"
        className={'border-0 bg-light rounded'}
        value={docName}
        onChange={(e) => setDocName(e.target.value)}
      />
    </div>
  )
}

export default Tools