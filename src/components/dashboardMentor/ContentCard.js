import React, { useState } from 'react'
import axios from 'axios';
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
    const [uploading, setUploading] = useState(false)
    const [reveal, setReveal] = useState(false)
    const [videoUpload, setVideoUpload] = useState(false)
    const [totalPart, setTotalPart] = useState(1)
    const [uploadedPart, setUploadedPart] = useState(1)
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
            console.log(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleUpload = async e => {
        e.preventDefault()
        console.log(video)
        const maxBlob = 1 * 1000 * 1000;
        let ext = video.name.split('.').pop();
        if (video.size < maxBlob) {
            setUploading(true)
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
                    console.log(data.message)
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.message)
                })
            setUploading(false)
        } else {
            let workItems = [];
            let offset = 0;
            while (offset < video.size) {
                let chunkSize = Math.min(maxBlob, video.size - offset);
                workItems.push(video.slice(offset, offset + chunkSize));
                offset += chunkSize;
            }
            setUploading(true)
            setTotalPart(workItems.length)
            const task = workItems.reduce((acc, blob, idx, items) => {
                setUploadedPart(idx + 1)
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
                    console.log(data.message)
                } catch (error) {
                    console.log(error.message)
                }
            })
            setUploadedPart(1)
            setUploading(false)
        }
    }

    return (
        <div className="mentorcoursecard">
            <div className="cardtitle">
                <h3>{content.title}</h3>
                <button onClick={() => setReveal(rev => !rev)}>{reveal ? "Hide Details" : "Show Details"}</button>
            </div>
            {reveal ? (
                <div className="carddescription" dangerouslySetInnerHTML={setDescription()} />
            ) : null}

            {videoUpload || content?.videoobject ? (
                <>
                    {content?.videoobject ? (

                        <div>
                            <p>Video already uploaded</p>
                            <p>{content?.videoobject?.name}</p>
                            <button disabled={submitted} onClick={deleteVideo}>Delete</button>
                        </div>
                    ) : null}
                </>
            ) : <button disabled={submitted} onClick={() => setVideoUpload(upld => !upld)}>Add a video</button>}

            {videoUpload ? (
                <form onSubmit={handleUpload}>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Video</span>
                            <input type="file" accept="video/*" onChange={e => {
                                setVideo(e.target.files[0])
                                //console.log(e.target.files[0])
                            }} />
                        </div>
                    </div>
                    {uploading && <p>uploading {uploadedPart} of {totalPart}</p>}
                    <div className="col s12">
                        <button disabled={submitted}
                            onClick={e => {
                                e.preventDefault()
                                setVideoUpload(upld => !upld)
                            }}
                            type="button"
                        >Cancel</button>
                        <button disabled={submitted}
                            type="submit"
                        >Submit content</button>
                    </div>
                </form>
            ) : null}
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