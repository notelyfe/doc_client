import React, { useState } from "react"
import Context from "./Context"

const State = (props) => {

    const [accessToken, setAccessToken] = useState(null)
    const [userData, setUserData] = useState(null)

    return(
        <Context.Provider value={{accessToken, setAccessToken, setUserData, userData}}>
            {props.children}
        </Context.Provider>
    )
}

export default State;