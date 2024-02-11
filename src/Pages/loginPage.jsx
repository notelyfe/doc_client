import React, { useContext, useState } from 'react'
import Login from '../Components/Auth/login'
import api from '../Services/api'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import Context from '../Context/Context'

const LoginPage = () => {

  const [data, setData] = useState({ email: "", password: "" })
  const { setAccessToken, setUserData, persist, setPersist } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    try {

      setLoading(true)

      const res = await api.post("/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.status === 200) {
        setAccessToken(res?.data?.access_token)
        localStorage.setItem("persist", persist)
      }

      const access_token = res?.data?.access_token

      const userRes = await api.get("api/auth/getUserData", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      if (userRes.status === 200) {
        setUserData(userRes?.data)
        toast.success("Login Sucess")
        navigate(from, { replace: true })
        setLoading(false)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  }

  return (
    <Login
      data={data}
      setData={setData}
      login={login}
      loading={loading}
      setPersist={setPersist}
      persist={persist}
    />
  )
}

export default LoginPage