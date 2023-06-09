import React, { useState, useEffect } from 'react'

const initialFormState = {
    name: ''
}

export default function ManufacturerForm() {
    const [formData, setFormData] = useState(initialFormState)

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let url = ('http://localhost:8100/api/manufacturers/')

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let response = await fetch(url, fetchConfig)

        if (response.ok) {
            setFormData(initialFormState)
        }else{
            console.error('failed to create manufacturer')
        }
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Manufacturer</h1>
                        <form onSubmit={handleSubmit} id="manufacturer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="Manufacter Name" required type="name" name="name" id="name" className="form-control" value={formData.name} />
                                <label htmlFor="manufacter_name">Manufacturer name...</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
