import React, { useContext, useState } from 'react'
import Login from '../Components/Auth/login'
import api from '../Services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Context from '../Context/Context'

const LoginPage = () => {

  const [data, setData] = useState({ email: "", password: "" })

  const {accessToken, setAccessToken, userData, setUserData} = useContext(Context)

  const login = async (e) => {
    e.preventDefault()
    try {

      const res = await api.post("/api/auth/login", data)
      setAccessToken(res?.data?.access_token)

      const access_token = res?.data?.access_token

      const userRes = await api.get("api/auth/getUserData", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      if(userRes.status === 200){
        setUserData(userRes?.data)
        toast.success("Login Sucess",{
          duration: 4000
        })
      }

    } catch (error) {
      toast.error(error?.response?.data?.msg, {
        duration: 4000,
      })
    }
  }

  return (
    <Login
      data={data}
      setData={setData}
      login={login}
    />
  )
}

export default LoginPage