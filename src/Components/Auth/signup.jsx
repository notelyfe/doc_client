import React, { useState } from 'react'
import style from '../../Style/auth.module.css'
import { Link } from 'react-router-dom'

const Signup = ({ data, setData, handelRegistration, loading }) => {

  const [hide, setHide] = useState(false)

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className={`${style.createUserForm} container mt-5 w-50 border border-dark rounded p-4`}>
      <h2 className="mb-3 text-center">Create New Account</h2>
      <form onSubmit={(e) => handelRegistration(e, data)}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            onChange={onchange}
            placeholder='Enter Your Name'
            name="name"
            required
            value={data.name}
            minLength={5}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type={!hide ? "password" : "text"}
            className="form-control"
            id="exampleInputPassword1"
            onChange={onchange}
            placeholder='Enter Your Password'
            name="password"
            required
            value={data.password}
            minLength={8}
          />
        </div>
        <div className={`${style.passwordDiv} mb-3`}>
          <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
          <input
            type={!hide ? "password" : "text"}
            className="form-control"
            id="exampleInputConfirmPassword1"
            onChange={onchange}
            placeholder='Confirm Password'
            name="confirm_pass"
            required
            value={data.confirm_pass}
            minLength={8}
          />
          <p
            className={`${style.indicator} text-primary`}
            onClick={() => setHide(!hide)}
          >
            {!hide ? "show" : "hide"}
          </p>
        </div>
        {loading === true ? (
          <button class="btn btn-primary" type="button" >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mb-3">Submit</button>
        )}

        <div>
          <p className='mb-0'>
            Already have an account
            <Link to="/login" className={style.loginLink}>Login</Link>
          </p>
        </div>
      </form>
    </div >
  )
}

export default Signup