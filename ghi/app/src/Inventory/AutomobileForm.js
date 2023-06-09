import React, { useEffect, useState } from "react";

function AutomobileForm() {
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const [modelId, setModelId] = useState('');
    const handleModelIdChange = (event) => {
        const value = event.target.value;
        setModelId(value);
    }

    const [models, setModels] = useState([]);
    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        const data = await response.json();
        setModels(data.models);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = modelId;

        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(autoUrl, fetchConfig);

        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModelId('');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Create a New Automobile</h1>
                    <form
                        onSubmit={handleSubmit}
                        id="create-conf-form">
                        <div className="form-floating mb-3">
                            <input
                                value={color}
                                onChange={handleColorChange}
                                placeholder="Color"
                                required type="text"
                                name='color' id="color"
                                className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                maxLength="4"
                                value={year}
                                onChange={handleYearChange}
                                placeholder="Year"
                                required type="number"
                                name='year' id="year"
                                className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                minLength="17"
                                maxLength="17"
                                value={vin}
                                onChange={handleVinChange}
                                placeholder="VIN"
                                required type="text"
                                name='vin' id="vin"
                                className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select
                                value={modelId}
                                onChange={handleModelIdChange}
                                required name="model"
                                id="model"
                                className="form-select">
                                <option value="">Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
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

export default AutomobileForm;
