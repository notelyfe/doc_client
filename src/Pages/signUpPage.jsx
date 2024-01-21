import React, { useState } from 'react'
import Signup from '../Components/Auth/signup'
import api from '../Services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

  const [data, setData] = useState({ name: "", email: "", password: "", confirm_pass: "" })

  const navigate = useNavigate()

  const handelRegistration = async (e) => {

    e.preventDefault()

    if (data.password !== data.confirm_pass) {
      toast.error("Password did't Match", {
        duration: 4000,
      })
    } else {

      try {

        const res = await api.post("/api/auth/createUser", data)

        if(res?.status === 200){
          toast.success(res?.data?.msg, {
            duration: 4000,
          })
          navigate('/login')
        }
        
      } catch (error) {
        toast.error(error?.response?.data?.msg, {
          duration: 4000,
        })
      }
    }
  }

  return (
    <Signup
      data={data}
      setData={setData}
      handelRegistration={handelRegistration}
    />
  )
}

export default SignUpPage