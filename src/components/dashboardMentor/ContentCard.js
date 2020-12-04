import React, { useState } from 'react'
import axios from 'axios';
import M from 'materialize-css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropbox } from 'dropbox'
import isofetch from 'isomorphic-fetch';

var dbx = new Dropbox({
    fetch: isofetch,
    accessToken:
        "n1xQYgZJqggAAAAAAAAAAS84zl1NnrjktWEB2wJq4mdpV6XfB_UQoPguCAHCz9KN"
});

function ContentCard({ auth, coursetitle, courseId, content, videoid, getCourse, submitted }) {
    const [video, setVideo] = useState([])
    //const [loaded, setLoaded] = useState(0)
    const [reveal, setReveal] = useState(false)
    const [videoUpload, setVideoUpload] = useState(false)
    function setDescription() {
        return {
            __html: content.description
        }
    }

    const deleteVideo = async () => {
        try {
            const { data } = await axios.put(`/api/mentor/video/delete/${courseId}/${content._id}`)
            getCourse()
            setVideoUpload()
            M.toast({ html: data.message })
        } catch (error) {
            M.toast({ html: error.message })
        }
    }

    const handleUpload = async e => {
        e.preventDefault()
        console.log(video)
        const maxBlob = 3 * 1000 * 1000;
        let ext = video.name.split('.').pop();
        if (video.size < maxBlob) {
            dbx.filesUpload({
                contents: video,
                path: `/course-raw-files/${auth.user.name}-${auth.user.id}/${coursetitle}/${videoid}-${content.title}.${ext}`,
                mode: 'add',
                autorename: true,
                mute: false
            })
                .then(async res => {
                    console.log(res)
                    const { data } = await axios.put(`/api/mentor/video/append/${courseId}/${content._id}`, res.result)
                    getCourse()
                    setVideoUpload()
                    M.toast({ html: data.message })
                })
                .catch(error => {
                    console.log(error)
                    M.toast({ html: error.message })
                })
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
                        var commit = {
                            path: `/course-raw-files/${auth.user.name}-${auth.user.id}/${coursetitle}/${videoid}-${content.title}.${ext}`, mode: 'add', autorename: true, mute: false
                        };
                        return await dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });
                    })
                }
            }, Promise.resolve());

            task.then(async (uploaddata) => {
                console.log(uploaddata.result)
                try {
                    const { data } = await axios.put(`/api/mentor/video/append/${courseId}/${content._id}`, uploaddata.result)
                    getCourse()
                    setVideoUpload()
                    M.toast({ html: data.message })
                } catch (error) {
                    M.toast({ html: error.message })
                }
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

                {videoUpload || content?.videoobject ? (
                    <>
                        {content?.videoobject ? (

                            <div>
                                <p>Video already uploaded</p>
                                <p>{content?.videoobject?.name}</p>
                                <button disabled={submitted} className="btn red btn-small" onClick={deleteVideo}>Delete</button>
                            </div>
                        ) : null}
                    </>
                ) : <button disabled={submitted} onClick={() => setVideoUpload(upld => !upld)} className="btn yellow black-text">Add a video</button>}

                {videoUpload ? (
                    <form>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Video</span>
                                <input type="file" accept="video/*" onChange={e => {
                                    setVideo(e.target.files[0])
                                    //console.log(e.target.files[0])
                                }} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                        {/*<p>{loaded}% of 100%</p>*/}
                        <div className="col s12">
                            <button disabled={submitted}
                                onClick={e => {
                                    e.preventDefault()
                                    setVideoUpload(upld => !upld)
                                }}
                                type="button"
                                className="btn black-text hoverable yellow"
                            >Cancel</button>
                            <button disabled={submitted}
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

ContentCard.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(ContentCard)