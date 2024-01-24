import React, { useContext, useState } from 'react'
import Login from '../Components/Auth/login'
import api from '../Services/api'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import Context from '../Context/Context'

const LoginPage = () => {

  const [data, setData] = useState({ email: "", password: "" })
  const { setAccessToken, setUserData, setAllDocs } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()
    try {

      setLoading(true)

      const res = await api.post("/api/auth/login", data)
      setAccessToken(res?.data?.access_token)

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

      const docRes = await api.get("/api/doc/getAllDocs", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      if (docRes.status === 200) {
        setAllDocs(docRes?.data)
      }

    } catch (error) {
      toast.error(error?.response?.data?.msg)
      setLoading(false)
    }
  }

  return (
    <Login
      data={data}
      setData={setData}
      login={login}
      loading={loading}
    />
  )
}

export default LoginPage