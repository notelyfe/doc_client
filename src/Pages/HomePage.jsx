import React from 'react'
import NewDoc from "../Components/Home/NewDoc"
import Header from '../Components/Home/Header'
import RecentDocs from '../Components/Home//RecentDocs'

const HomePage = () => {
    return (
        <>
            <Header />
            <NewDoc />
            <RecentDocs />
        </>
    )
}

export default HomePage