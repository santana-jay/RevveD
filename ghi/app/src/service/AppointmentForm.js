import React, { useState, useEffect } from 'react'

const initialFormState = {
    vin: '',
    customer: '',
    date_time: '',
    technician: '',
    reason: '',
}

export default function AppointmentForm() {
    const [formData, setFormData] = useSate(initialFormState)
    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        let url = 'http://localhost:8080/api/technicians/'
        let response = await fetch(url)

        if (response.ok){
            let data = await response.json()
            setTechnicians(data.technicians)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let url = 'http://localhost:8080/api/appointments/'

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response = await fetch(url, fetchConfig)

        if (response.ok){
            setFormData(initialFormState)
        }
    }

    const handleFormChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Service Appointment</h1>
                        <form onSubmit={handleSubmit} id="appointment-form">
                            <div className="form-floating mb-3">
                                {/* <!-- Each field in the form references the same function --> */}
                                <input onChange={handleFormChange} placeholder="Vin" required type="vin" name="vin" id="vin" className="form-control" value={formData.vin} />
                                <label htmlFor="vin">Enter VIN...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="Customer Name" required type="text" name="customer" id="customer" className="form-control" value={formData.customer}/>
                                <label htmlFor="customer">Customer name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="EmployeeID" type="text" name="employee_id" id="employee_id" className="form-control" value={formData.employee_id}/>
                                <label htmlFor="employee_id">Employee ID...(optional)</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="EmployeeID" type="text" name="employee_id" id="employee_id" className="form-control" value={formData.employee_id}/>
                                <label htmlFor="employee_id">Employee ID...(optional)</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="EmployeeID" type="text" name="employee_id" id="employee_id" className="form-control" value={formData.employee_id}/>
                                <label htmlFor="employee_id">Employee ID...(optional)</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="EmployeeID" type="text" name="employee_id" id="employee_id" className="form-control" value={formData.employee_id}/>
                                <label htmlFor="employee_id">Employee ID...(optional)</label>
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
