import React, { useState, useEffect, useCallback, Fragment } from 'react'
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import M from 'materialize-css';
import ContentCard from './ContentCard';
let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;

export default function EditCourse({ match }) {
    const [course, setCourse] = useState()
    const [editName, setEditName] = useState(false)
    const [addContent, setAddContent] = useState(false)
    const [courseName, setCourseName] = useState("")
    const [tinyLoaded, setTinyLoaded] = useState(false)

    const hideTinyLoader = e => {
        setTinyLoaded(loaded => !loaded)
    }

    const submitForReview = async () => {
        try {
            const { data } = await axios.put(`/api/mentor/course/${course._id}/submit`)
            M.toast({ html: data.message })
            getCourse()
        } catch (error) {
            console.log(error.message)
            M.toast({ html: error.message })
        }
    }

    const changeCourseName = async () => {
        const { data } = await axios.put(`/api/mentor/course/${course._id}/changename`, {
            coursename: courseName
        })
        getCourse()
        setEditName(edit => !edit)
        M.toast({ html: data.message })
        console.log(data)
    }

    const getCourse = useCallback(
        async () => {
            const { data } = await axios.get(`/api/mentor/getcourse/${match.params.courseid}`)
            setCourse(data.course)
        },
        [match.params.courseid],
    )

    function addContentHandler() {
        setAddContent(add => !add)
        if (tinyLoaded) {
            hideTinyLoader()
        }
    }

    useEffect(() => {
        getCourse()
    }, [getCourse])
    return (
        <div style={{ margin: '40px' }}>
            <span>Course name</span>
            <input disabled={!editName} type="text" placeholder={course?.name} onChange={e => setCourseName(e.target.value)} />
            <button disabled={course?.submitted} className="btn-small orange" onClick={() => setEditName(edit => !edit)}>{editName ? <>Cancel</> : <>Edit course name</>}</button>
            {editName ? <button className="btn-small orange" onClick={changeCourseName}>Save</button> : null}
            <div style={{ marginTop: '20px' }}>
                <button disabled={course?.submitted} className='btn small green' onClick={addContentHandler}>{addContent ? "Cancel" : "Add a course content"}</button>
            </div>
            {addContent ? (
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        //video: [],
                        //videoobject: {}
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.title) {
                            errors.title = "Video title is required!";
                        }

                        if (!values.description) {
                            errors.description = "Video description is required!";
                        }

                    }}
                    onSubmit={async values => {
                        console.log(values)
                        let videodata = {}
                        videodata.title = values.title;
                        videodata.description = values.description;
                        //console.log(videodata)
                        const { data } = await axios.put(`/api/mentor/course/${course._id}/addvideo`, videodata)
                        console.log(data)
                        M.toast({ html: data.message })
                        getCourse()
                        if (data.success) {
                            addContentHandler()
                        }
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form style={{ margin: '40px' }}>
                            <div className="input-field col s12">
                                <span className="required">Topic</span>
                                <Field type="text" name="title" placeholder="Content title" />
                                <ErrorMessage name="title" render={msg => <span className="red-text">{msg}</span>} />
                            </div>

                            <div className="input-field col s12">
                                <span className="required">Description</span>
                                <Editor
                                    apiKey={API_KEY}
                                    init={{
                                        height: 300,
                                        menubar: "edit insert format table tools help",


                                        plugins: [
                                            "image autolink lists link charmap print preview anchor",
                                            "searchreplace visualblocks code fullscreen",
                                            "insertdatetime table paste code wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat ",

                                        init_instance_callback: hideTinyLoader,
                                        cleanup: true,
                                        automatic_uploads: true,
                                        images_upload_url: "https://api.imgbb.com/1/upload",
                                        images_upload_handler: async (blobinfo, success, failure) => {
                                            let headers = new Headers()
                                            headers.append('Accept', 'Application/JSON')

                                            let formdata = new FormData()

                                            formdata.append("name", blobinfo.filename())
                                            formdata.append("image", blobinfo.base64())

                                            let req = new Request("https://api.imgbb.com/1/upload?expiration=600&key=b9eed6cb0484ae308da889596a484e50", {
                                                method: 'POST',
                                                headers,
                                                mode: 'cors',
                                                body: formdata
                                            })



                                            fetch(req)
                                                .then(res => res.json())
                                                .then(data => success(data.data.url))
                                                .catch(err => failure(err.message))

                                        }
                                    }}

                                    onEditorChange={(desc) =>
                                        setFieldValue("description", desc)
                                    }
                                />
                                <ErrorMessage name="description" render={msg => <span className="red-text">{msg}</span>} />
                            </div>
                            {tinyLoaded ? null : (
                                <div className="progress">
                                    <div className="indeterminate orange"></div>
                                </div>
                            )}
                            {/*<div className="file-field input-field">
                                <div className="btn">
                                    <span>Video</span>
                                    <input type="file" accept="video/*" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>*/}
                            <div className="col s12">
                                <button
                                    type="submit"
                                    className="btn waves-effect waves-light hoverable orange"
                                >Submit content</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                    <Fragment>
                        {course?.contents?.map((content, id) => (
                            <ContentCard key={id} videoid={id + 1} coursetitle={course?.name} courseId={course?._id} content={content} submitted={course.submitted} getCourse={getCourse} />
                        ))}
                        <button onClick={submitForReview} disabled={course?.submitted} className="btn-large">{course?.submitted ? "Submitted for review" : "Submit for review"}</button>
                    </Fragment>
                )}
        </div>
    )
}
