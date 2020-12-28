import React, { useState, useRef, Fragment } from 'react'
import axios from 'axios'
import M from 'materialize-css'
import { Dropbox } from 'dropbox'
import isofetch from 'isomorphic-fetch';

var dbx = new Dropbox({
    fetch: isofetch,
    accessToken:
        "n1xQYgZJqggAAAAAAAAAAS84zl1NnrjktWEB2wJq4mdpV6XfB_UQoPguCAHCz9KN"
});

export default function ContentCardAdmin({ content, id, getCourse }) {
    const [reveal, setReveal] = useState(false)
    const [link, setLink] = useState("")
    const [final, setFinal] = useState("")
    const linkRef = useRef(null)
    function setDescription() {
        return {
            __html: content.description
        }
    }

    const submitFinal = async () => {
        try {
            const { data } = await axios.put(`/api/admin/video/final/add/${id}/${content._id}`, { link: final })
            M.toast({ html: data.message })
            if (data.success) {
                getCourse()
            }
        } catch (error) {
            M.toast({ html: error.message })
        }
    }

    const getTempLink = async () => {
        try {
            const { result } = await dbx.filesGetTemporaryLink({
                path: content?.videoobject.path_lower
            })
            setLink(result.link)
        } catch (error) {
            M.toast({ html: error.message })
        }
    }

    const copyLink = e => {
        linkRef.current.select();
        document.execCommand('copy')

        e.target.focus()
        M.toast({ html: "Copied link" })
    }

    const approve = async () => {
        try {
            const { data } = await axios.put(`/api/admin/video/approve/${id}/${content._id}`)
            M.toast({ html: data.message })
            getCourse()
        } catch (error) {
            M.toast({ html: error.message })
            getCourse()
        }

    }

    const disapprove = async () => {
        try {
            const { data } = await axios.put(`/api/admin/video/disapprove/${id}/${content._id}`)
            M.toast({ html: data.message })
            getCourse()
        } catch (error) {
            M.toast({ html: error.message })
            getCourse()
        }

    }

    return (
        <div className="card">
            <span>{content.title}<button style={{ cursor: "pointer", userSelect: "none" }} onClick={() => setReveal(rev => !rev)}>{reveal ? "Hide details" : "Show details"}</button></span>
            {reveal ? (
                <div className="description" dangerouslySetInnerHTML={setDescription()} />
            ) : null}
            {content.videoobject ? (
                <div>
                    <p>Contains a video :</p>
                    <button onClick={getTempLink}>Get temporary download link</button>
                    {link ? (
                        <div>
                            <input ref={linkRef} type="url" defaultValue={link} />
                            <button onClick={copyLink} >copy link</button>
                            <button onClick={() => { window.open(link, "_blank") }}>View file</button>
                        </div>
                    ) : null}
                </div>
            ) : <p>Does not contain a video file</p>}
            <div>
                <p>Approve content: (just for marking. not mandatory.)</p>
                <button disabled={content?.ready === false} onClick={disapprove}>Content is not ok</button>
                <button disabled={content?.ready === true} onClick={approve}>Content is ok</button>
            </div>
            {content.finalLink ? (
                <div>
                    <p>Video Uploaded. <a href={content.finalLink} target="_blank" rel="noopener noreferrer">See here</a></p>
                </div>
            ) : (
                    <Fragment>
                        {content.videoobject ? (
                            <div style={{ marginTop: "20px" }}>
                                <p>Add final content: Upload the video in vimeo.</p>
                                <p>After uploading, copy the url and paste it here</p>
                                <input type="url" onChange={e => setFinal(e.target.value)} />
                                <button onClick={submitFinal} className="btn-small green">Add final content</button>
                            </div>
                        ) : null}
                    </Fragment>
                )}
        </div>
    )
}
