import React, { useEffect, useState } from 'react'


export default function AppointmentHistory() {
    const [appointments, setAppointments] = useState([])
    const [searchVin, setSearchVin] = useState('')
    const [filteredAppointments, setFilteredAppointments] = useState([])

    useEffect(() => {
        fetchAppointments()
    }, [])

    const fetchAppointments = async (e) => {
        try{
            let response = await fetch('http://localhost:8080/api/appointments/')
            if (response.ok){
                const data = await response.json()
                setAppointments(data.appointments)
            }else{
                console.error('failed to fetch appointments')
            }
        }catch(e){
            console.error('Error fetching appointments', e)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()

        const filtered = appointments.filter((appointment) => appointment.vin === searchVin)
        setFilteredAppointments(filtered)
    }

    return (
        <>
            <div className='container'>
                <h1>Appointment History</h1>
                <div className='row'>
                    <div className='col-md-12'>
                        <form onSubmit={handleSearch}>
                            <div className='input-group md-3'>
                                <input onChange={(e) => setSearchVin(e.target.value)} className='form-control mr-sm-2' type='text' placeholder='Enter VIN' value={searchVin}/>
                                <button className='btn btn-outline-success' type='submit'>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='container'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>VIN</td>
                            <td>Is VIP?</td>
                            <td>Customer</td>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Technician</td>
                            <td>Reason</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredAppointments.length > 0 ? filteredAppointments.map((appointment) => {
                        const date = new Date(appointment.date_time);
                        const formattedDate = date.toLocaleDateString()
                        const formattedTime = date.toLocaleTimeString({hour: '2-digit', minutue: '2-digit'})
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                                <td>{appointment.customer}</td>
                                <td>{formattedDate}</td>
                                <td>{formattedTime}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        )
                    })
                    : appointments.map((appointment) => {
                        const date = new Date(appointment.date_time);
                        const formattedDate = date.toLocaleDateString()
                        const formattedTime = date.toLocaleTimeString({hour: '2-digit', minutue: '2-digit'})
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                                <td>{appointment.customer}</td>
                                <td>{formattedDate}</td>
                                <td>{formattedTime}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
                </table>
            </div>
        </>
    )
}
