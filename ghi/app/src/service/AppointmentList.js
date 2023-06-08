import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function AppointmentList(){
    const [appointments, setAppointments] = useState([])

    const fetchData = async () => {
        let url = 'http://localhost:8080/api/appointments/'
        let response = await fetch(url)

        if (response.ok){
            const data = await response.json()
            const filteredAppointments = data.appointments.filter(appointment =>
                appointment.status !== 'canceled' && appointment.status !== 'finished')

            setAppointments(filteredAppointments)
        }else{
            console.error('failed to load data')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const cancelAppointment = async (id) => {
        try{
            let url = `http://localhost:8080/api/appointments/${id}/cancel`
            let response = await fetch(url, {
                method: 'PUT'
            })

            if (response.ok){
                setAppointments(appointments.map(appointment =>
                    appointment.id === id ? {...appointment, status: 'canceled'} : appointment))
            }else{
                console.error('failed to cancel appointment')
            }
            }catch(e){
                console.error('failed to fetch appointments', e)
            }
            fetchData()
        }


        const finishAppointment = async (id) => {
            try{
                let url = `http://localhost:8080/api/appointments/${id}/finish`
                let response = await fetch(url, {
                    method: 'PUT'
                })

                if (response.ok){
                    setAppointments(appointments.map(appointment =>
                        appointment.id === id ? {...appointment, status: 'finished'} : appointment))
                }else{
                    console.error('failed to finish appointment')
                }
                }catch(e){
                    console.error('failed to fetch appointment', e)
                }
                fetchData()
            }


    return (
        <>
            <div className='container'>
                <div>
                    <h1>Service Appointments</h1>
                </div>
                <p className='text-right'>
                    <Link to='/appointments/form' className='btn btn-primary btrn-md'>New Appointment</Link>
                </p>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => {
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
                                <td>
                                    <button onClick={() => cancelAppointment(appointment.id)} className='btn btn-danger'>Cancel</button>
                                </td>
                                <td>
                                    <button onClick={() => finishAppointment(appointment.id)} className='btn btn-success'>Finish</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
