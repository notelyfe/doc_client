import React, { useContext, useEffect } from 'react'
import NewDoc from "../Components/Home/NewDoc"
import Header from '../Components/Home/Header'
import RecentDocs from '../Components/Home//RecentDocs'
import useRefreshToken from '../Hooks/useRefreshToken'
import Context from '../Context/Context'
import api from '../Services/api'

const HomePage = () => {

    const refresh = useRefreshToken()
    const { setUserData } = useContext(Context)

    useEffect(() => {

        const getUserData = async () => {
            try {

                let token = await refresh()

                if (!token) return

                const res = await api.get("api/auth/getUserData", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.status === 200) {
                    setUserData(res?.data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        getUserData()

    }, [])

    return (
        <>
            <Header />
            <NewDoc />
            <RecentDocs />
        </>
    )
}

export default HomePage