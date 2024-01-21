import React, { useState } from "react"
import Context from "./Context"

const State = (props) => {

    const [accessToken, setAccessToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [doc, setDoc] = useState(null)
    const [allDocs, setAllDocs] = useState(null)

    return(
        <Context.Provider value={{accessToken, setAccessToken, setUserData, userData, doc, setDoc, setAllDocs, allDocs}}>
            {props.children}
        </Context.Provider>
    )
}

export default State;