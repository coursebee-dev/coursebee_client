import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function Categories() {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [subcategory, setSubcategory] = useState("");
    const [subcatid, setSubcatid] = useState('');
    const getCategories = async () => {
        try {
            const { data } = await axios.get('api/admin/category');
            setCategories(data);
        } catch (error) {

        }
    }

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/admin/addcategory', {
                title: category
            })
            console.log(data.message)
            getCategories()
            e.target.reset();
        } catch (error) {
            console.log(error)
        }
    }

    const addSubCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/admin/addsubcat/${subcatid}`, {
                name: subcategory
            })
            console.log(data.message)
            getCategories()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col s12">
                        <form onSubmit={addCategory}>
                            <input type="text" onChange={(e) => setCategory(e.target.value)} />
                            <button type="submit" className="btn btn-small">Add Category</button>
                        </form>
                    </div>
                    <div className="col s12">
                        {categories.map((cat, id) => (
                            <div className="section" key={id}>
                                <p>{cat.title}</p>
                                <form className="row" onSubmit={addSubCategory}>
                                    <input className="col s8" id={cat._id} onChange={(e) => {
                                        setSubcategory(e.target.value)
                                        setSubcatid(e.target.id)
                                    }} />
                                    <button className="col s4" type="submit" className="btn btn-small">Add Sub-Category</button>
                                </form>
                                <div style={{ border: "1px solid black", padding: "15px" }}>
                                    <h6>Sub-categories:</h6>
                                    {cat.subcategory.map((subcat, id) => (
                                        <div className="chip" key={id}>{subcat.name}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
