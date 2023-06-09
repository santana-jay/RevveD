import React, { useEffect, useState } from 'react'


export default function TechnicianForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',
    })

    useEffect(() => {
        setFormData({
            first_name: '',
            last_name: '',
            employee_id: '',
        })
    }, [])

    const handleFormChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8080/api/technicians/'

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            setFormData({
                first_name: '',
                last_name: '',
                employee_id: '',
            })
        }
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Technician</h1>
                        <form onSubmit={handleSubmit} id="technician-form">
                            <div className="form-floating mb-3">
                                {/* <!-- Each field in the form references the same function --> */}
                                <input onChange={handleFormChange} placeholder="Firstname" required type="text" name="first_name" id="first_name" className="form-control" value={formData.first_name} />
                                <label htmlFor="first_name">First name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="Lastname" required type="text" name="last_name" id="last_name" className="form-control" value={formData.last_name}/>
                                <label htmlFor="last_name">Last name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="EmployeeID" type="text" name="employee_id" id="employee_id" className="form-control" value={formData.employee_id}/>
                                <label htmlFor="employee_id">Employee ID...(optional)</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
