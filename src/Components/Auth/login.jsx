import React, { useState } from 'react'
import style from "../../Style/auth.module.css"
import { Link } from 'react-router-dom'

const Login = ({ data, setData, login, loading, persist, setPersist }) => {

  const [hide, setHide] = useState(false)

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className={`${style.createUserForm} container mt-5 w-50 border border-dark rounded p-4`}>
      <h2 className="mb-3 text-center">Login</h2>
      <form onSubmit={(e) => login(e, data)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onchange}
            placeholder='Enter Your Email'
            name="email"
            required
            value={data.email}
          />
        </div>
        <div className={`${style.passwordDiv} mb-3`}>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type={!hide ? "password" : "text"}
            className="form-control"
            id="exampleInputPassword1"
            onChange={onchange}
            placeholder='Password'
            name="password"
            required
            value={data.password}
          />
          <p
            className={`${style.indicator} text-primary`}
            onClick={() => setHide(!hide)}
          >
            {!hide ? "show" : "hide"}
          </p>

        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            name=""
            id="exampleCheck1"
            className='form-check-input'
            onChange={(e) => setPersist(e.target.checked)}
            value={persist}
          />
          <label className='form-check-label' htmlFor="exampleCheck1">Trust this Device</label>
        </div>
        {loading === true ? (
          <button className="btn btn-primary" type="button">
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mb-3">Login</button>
        )}

        <div>
          <p className='mb-0'>
            Don't have account
            <Link to="/createUser" className={style.loginLink}>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login