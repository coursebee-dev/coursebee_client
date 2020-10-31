import React, { useState } from 'react'

export default function ContentCardAdmin({ content }) {
    const [reveal, setReveal] = useState(false)
    function setDescription() {
        return {
            __html: content.description
        }
    }
    return (
        <div className="card green">
            <div className="card-content white-text">
                <span className="card-title">{content.title}<i style={{ cursor: "pointer", userSelect: "none" }} onClick={() => setReveal(rev => !rev)} className="material-icons right">{reveal ? "keyboard_arrow_up" : "keyboard_arrow_down"}</i></span>
                {reveal ? (
                    <div dangerouslySetInnerHTML={setDescription()} />
                ) : null}
            </div>
        </div>
    )
}
