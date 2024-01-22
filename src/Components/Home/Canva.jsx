import React, { useCallback, useEffect } from 'react'
import "../../Style/quil.css"
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'

// const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const Canva = ({docName, setDocName}) => {

    let { docId } = useParams()

    useEffect(() => {

        const socket = io(process.env.REACT_APP_BASEURL)

        console.log(socket)

        return () => {
            socket.disconnect()
        }
    }, [])

    const wrapperRef = useCallback(wrapper => {

        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS }
        })

    }, [])

    return (
        <div className="container" ref={wrapperRef}></div>
    )
}

export default Canva