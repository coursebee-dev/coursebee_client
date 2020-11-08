import React, { useState } from 'react'
//import axios from 'axios';
import { Dropbox } from 'dropbox'
import isofetch from 'isomorphic-fetch';

var dbx = new Dropbox({
    fetch: isofetch,
    accessToken:
        "n1xQYgZJqggAAAAAAAAAAS84zl1NnrjktWEB2wJq4mdpV6XfB_UQoPguCAHCz9KN"
});
const maxBlob = 3 * 1000 * 1000;

export default function ContentCard({ content }) {
    const [video, setVideo] = useState([])
    const [loaded, setLoaded] = useState(0)
    const [reveal, setReveal] = useState(false)
    const [videoUpload, setVideoUpload] = useState(false)
    function setDescription() {
        return {
            __html: content.description
        }
    }

    const handleUpload = async e => {
        e.preventDefault()
        console.log(video)
        const maxBlob = 0.5 * 1000 * 1000;
        if (video.size < maxBlob) {
            dbx.filesUpload({
                contents: video,
                path: '/' + video.name,
                mode: 'add',
                autorename: true,
                mute: false
            })
                .then(res => console.log(res))
                .catch(error => console.log(error))
        } else {
            let workItems = [];
            let offset = 0;
            while (offset < video.size) {
                let chunkSize = Math.min(maxBlob, video.size - offset);
                workItems.push(video.slice(offset, offset + chunkSize));
                offset += chunkSize;
            }

            const task = workItems.reduce((acc, blob, idx, items) => {
                if (idx === 0) {
                    return acc.then(async () => {
                        return await dbx.filesUploadSessionStart({
                            contents: blob,
                            close: false
                        })
                            .then(response => {
                                return response.result.session_id
                            })
                    });
                } else if (idx < items.length - 1) {
                    return acc.then(async (sessionId) => {
                        var cursor = { session_id: sessionId, offset: idx * maxBlob };
                        await dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob });
                        console.log(sessionId)
                        return sessionId;
                    })
                } else {
                    return acc.then(async (sessionId) => {
                        console.log(sessionId)
                        var cursor = { session_id: sessionId, offset: video.size - blob.size };
                        var commit = { path: '/' + video.name, mode: 'add', autorename: true, mute: false };
                        return await dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });
                    })
                }
            }, Promise.resolve());

            task.then((data) => {
                console.log(data)
            })
        }
    }

    return (
        <div className="card green">
            <div className="card-content white-text">
                <span className="card-title">{content.title}<i style={{ cursor: "pointer", userSelect: "none" }} onClick={() => setReveal(rev => !rev)} className="material-icons right">{reveal ? "keyboard_arrow_up" : "keyboard_arrow_down"}</i></span>
                {reveal ? (
                    <div dangerouslySetInnerHTML={setDescription()} />
                ) : null}
                {videoUpload ? null : <button onClick={() => setVideoUpload(upld => !upld)} className="btn yellow black-text">Add a video</button>}

                {videoUpload ? (
                    <form>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Video</span>
                                <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                        <p>{loaded}% of 100%</p>
                        <div className="col s12">
                            <button
                                onClick={e => {
                                    e.preventDefault()
                                    setVideoUpload(upld => !upld)
                                }}
                                type="button"
                                className="btn black-text hoverable yellow"
                            >Cancel</button>
                            <button
                                type="submit"
                                className="btn hoverable orange"
                                onClick={handleUpload}
                            >Submit content</button>
                        </div>
                    </form>
                ) : null}
            </div>
        </div>
    )
}

