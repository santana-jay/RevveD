import React, { useState } from "react";


function ManufactureForm() {
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = manufacturer;

        const manuUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(manuUrl, fetchConfig);

        if (response.ok) {
            setManufacturer('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a New Manufacturer</h1>
                    <form
                        onSubmit={handleSubmit}
                        id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input
                                value={manufacturer}
                                onChange={handleManufacturerChange}
                                placeholder="Fabric"
                                required type="text"
                                name='manufacturer' id="manufacturer"
                                className="form-control" />
                            <label htmlFor="manufacturer">Manufactur</label>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManufactureForm;
