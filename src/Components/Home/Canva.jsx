import React, { useCallback, useContext, useEffect, useState } from 'react'
import "../../Style/quil.css"
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import Context from '../../Context/Context'
import toast from 'react-hot-toast'

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

const Canva = () => {

    let { docId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const { allDocs, userData } = useContext(Context)

    useEffect(() => {

        if (allDocs == null || quill == null) return

        let currentDoc = allDocs?.filter(item => {
            return item._id === docId
        })

        let usr = currentDoc[0]?.other_owners?.filter(item => {
            return item.user === userData._id
        })

        if (currentDoc[0]?.created_by === userData._id || usr[0]?.write_permission === true) {
            quill.enable()
        } else {
            toast.error("You don't have write permission to this document", {
                duration: 4000,
            })
        }

    }, [allDocs, quill, userData._id, docId])

    useEffect(() => {

        const s = io(process.env.REACT_APP_BASEURL)
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {

        if (socket == null || quill == null) return

        const handler = (delta, oldDelte, source) => {
            if (source !== "user") return
            socket.emit("send-changes", delta)
        }

        quill.on("text-change", handler)

        return () => {
            quill.off("text-change", handler)
        }
    }, [socket, quill])

    useEffect(() => {

        if (socket == null || quill == null) return

        const handler = (delta) => {
            quill.updateContents(delta)
        }

        socket.on("receive-changes", handler)

        return () => {
            quill.off("receive-changes", handler)
        }
    }, [socket, quill])

    useEffect(() => {

        if (socket == null || quill == null) return

        socket.once("load-document", doc => {
            quill.setContents(doc)
        })

        socket.emit("get-document", docId)

    }, [socket, quill, docId])

    useEffect(() => {

        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, 2000)

        return () => clearInterval(interval)

    }, [socket, quill])

    const wrapperRef = useCallback(wrapper => {

        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS }
        })
        q.disable()
        setQuill(q)
    }, [])

    return (
        <div className="container" ref={wrapperRef}></div>
    )
}

export default Canva