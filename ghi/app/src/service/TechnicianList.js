import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function TechnicianList() {
    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        let url = 'http://localhost:8080/api/technicians/'
        let response = await fetch(url)

        if (response.ok){
            const data = await response.json()
            setTechnicians(data.technicians)
        }else{
            console.error('failed to load technicians')
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div>
                <h1>Technicians</h1>
                <p className='text-right'>
                    <Link to='/technicians/form' className='btn btn-primary btrn-md'>Add a Technician</Link>
                </p>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician) => {
                        return (
                            <tr key={technician.id}>
                                <td>{technician.employee_id}</td>
                                <td>{technician.first_name}</td>
                                <td>{technician.last_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
