import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Editor } from '@tinymce/tinymce-react'
import M from 'materialize-css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;

function CreateCourseForm({ auth, createCourseHandler }) {
    const [categories, setCategories] = useState([])
    const [tinyLoaded, setTinyLoaded] = useState(false)
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/mentor/category')
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    }

    const hideTinyLoader = e => {
        setTinyLoaded(loaded => !loaded)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div style={{ margin: "30px" }}>
            <Formik
                initialValues={{
                    mentorId: auth.user.id,
                    name: "",
                    description: "",
                    categories: [],
                    subcategories: []
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Course name is required!";
                    }

                    if (!values.description) {
                        errors.description = "Course description is required!";
                    }

                }}
                onSubmit={async values => {
                    console.log(values)
                    const { data } = await axios.post('/api/mentor/createcourse', values)
                    if (data.success) {
                        M.toast({ html: data.message })
                        createCourseHandler()
                    } else {
                        M.toast({ html: data.message })
                    }
                }}
            >
                {({ handleSubmit, setFieldValue, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="input-field col s12">
                            <span className="required">Topic</span>
                            <Field type="text" name="name" placeholder="Course name" />
                            <ErrorMessage name="name" render={msg => <span className="red-text">{msg}</span>} />
                        </div>

                        <div className="input-field col s12">
                            <span className="required">Description</span>
                            <Editor
                                apiKey={API_KEY}
                                init={{
                                    height: 500,
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
                            <div className="loader">
                            </div>
                        )}

                        <section className="row">
                            <div className="col s12 m6" style={{ marginTop: "20px" }}>
                                <span >Categories</span>
                                {categories?.map(cat => (
                                    <p key={cat._id}>
                                        <label>
                                            <Field type="checkbox" name="categories" value={cat.title} />
                                            <span>{cat.title}</span>
                                        </label>
                                    </p>
                                ))}
                            </div>
                            {values && values.categories.length === 0 ? null : (
                                <div className="col s12 m6" style={{ marginTop: "20px" }}>
                                    <span >Sub-categories</span>
                                    {categories && categories.filter(sub => values.categories.some(s => sub.title.includes(s)))?.map((cat, id) => (
                                        <React.Fragment key={id}>
                                            {cat.subcategory?.map((subcat) => (
                                                <p key={subcat._id}>
                                                    <label>
                                                        <Field type="checkbox" name="subcategories" value={subcat.name} />
                                                        <span>{subcat.name}</span>
                                                    </label>
                                                </p>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </section>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable orange"
                            >Scheduledd video</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

CreateCourseForm.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(CreateCourseForm);

