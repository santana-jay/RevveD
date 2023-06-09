import React, { useState, useEffect } from 'react'


const initialFormState = {
    vin: '',
    customer: '',
    date: '',
    time: '',
    technician: '',
    reason: '',
}

export default function AppointmentForm() {
    const [formData, setFormData] = useState(initialFormState)
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

        const datetime = new Date(`${formData.date} ${formData.time}`).toISOString()

        const updateFormData = {
            ...formData,
            date_time: datetime
        }

        const {date, time, ...postData} = updateFormData

        let url = 'http://localhost:8080/api/appointments/'

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(postData),
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
                                <input onChange={handleFormChange} placeholder="Vin" required minLength="17" maxLength="17" type="vin" name="vin" id="vin" className="form-control" value={formData.vin} />
                                <label htmlFor="vin">Enter VIN...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="Customer Name" required type="text" name="customer" id="customer" className="form-control" value={formData.customer}/>
                                <label htmlFor="customer">Customer name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="mm/dd/yyyy" required type="date" name="date" id="date" className="form-control" value={formData.date}/>
                                <label htmlFor="date">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="--:--" required type="time" name="time" id="time" className="form-control" value={formData.time}/>
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} placeholder="Choose a technician" required name="technician" id="technician" className="form-control" value={formData.technician}>
                                    <option value=''>Choose a technician...</option>
                                    {technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" value={formData.reason}/>
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
