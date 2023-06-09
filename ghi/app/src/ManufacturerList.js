import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ManufacturerList() {
    const [manufacturers, setManufacterers] = useState([])

    const fetchData = async () => {
        let url = 'http://localhost:8100/api/manufacturers/'
        let response = await fetch(url)

        if (response.ok){
            const data = await response.json()
            setManufacterers(data.manufacturers)
        }else{
            console.error('failed to load manufacturers')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className='container'>
                <h1>Manufacturers</h1>
                <p className='text-right'>
                    <Link to='/manufacturers/form' className='btn btn-primary btrn-md'>Add a Manufacturer</Link>
                </p>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
