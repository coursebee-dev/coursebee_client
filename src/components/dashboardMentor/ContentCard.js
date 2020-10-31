import React, { useState } from 'react'
import { Vimeo } from 'vimeo';
import axios from 'axios';

const client = new Vimeo("cf13af4abfa9eaf53d7924fe92dd10a8039f00c5", "NxYZZV8wIznfmaqENbdtKOtTFYNixg49OYKNuf3PK0Fk+mLuxkmEyn0QeeknMPs7N5ZkSINM+cQNy4jlcGKeJdg2pdR+ddMe0Ez7mtGSBD4e4ZXNjlkm5kDU9x5GiXPs", "c07d774a7936a6bca236722c896ec34e");


export default function ContentCard({ content }) {
    const [form, setForm] = useState('')
    const [video, setVideo] = useState([])
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
        client.upload(
            video,
            {
                'name': content.name,
                'description': 'The description goes here.'
            },
            function (uri) {
                console.log('Your video URI is: ' + uri);
                client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
                    if (error) {
                        console.log('There was an error making the request.')
                        console.log('Server reported: ' + error)
                        return
                    }

                    console.log('Your video link is: ' + body.link)
                })
            },
            function (bytes_uploaded, bytes_total) {
                var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
                console.log(bytes_uploaded, bytes_total, percentage + '%')
            },
            function (error) {
                console.log('Failed because: ' + error)
            }
        )
        /*try {
            const resdatadata = await fetch('https://api.vimeo.com/me/videos', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'bearer c07d774a7936a6bca236722c896ec34e',
                    'Content-Type': "application/json",
                    'Accept': "application/vnd.vimeo.*+json;version=3.4"
                },
                body: JSON.stringify({
                    "upload": {
                        "approach": "pull",
                        "size": video.size,
                        "link": video
                    }
                })
            })
            const jresdata = await resdatadata.json()
            //const upldlink = jresdata.upload.form;
            console.log(jresdata)
            //var myWindow = window.open("", "MsgWindow", "width=200,height=100");
            //myWindow.document.write(upldlink);
            //setForm(upldlink)
            /*const resdatadata2 = await fetch(upldlink, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Authorization': 'bearer c07d774a7936a6bca236722c896ec34e',
                    'Content-Type': "application/json",
                    'Accept': "application/vnd.vimeo.*+json;version=3.4",
                    'Upload-Offset': 0,
                    "Tus-Resumable": "1.0.0"
                },
                body: video
            })
            console.log(resdatadata2.json())
        } catch (err) {
            console.log(err)
        }*/
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
                    <>
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
                        <div dangerouslySetInnerHTML={{ __html: form }} />
                    </>
                ) : null}
            </div>
        </div>
    )
}