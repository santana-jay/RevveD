import React, {useEffect, useState} from 'react';


function ModelForm(){
    const [manufacturers, setManufacturers] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    };

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const [pictureUrl, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    };

    const[manufacturerId, setManufacturerId] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturerId(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturerId;

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            }
        };

        const response = await fetch(modelUrl, fetchConfig);

        if (response.ok) {
            setName('');
            setPictureUrl('');
            setManufacturerId('');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create A New Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                    <input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name"
                    required type="text"
                    name="name"
                    id="name"
                    className="form-control"/>
                    <label htmlFor="name">Vehicle Model Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                    value={pictureUrl}
                    onChange={handlePictureUrlChange}
                    placeholder="Picture URL"
                    required type="text"
                    name="picture_url"
                    id="picture_url"
                    className="form-control" />
                    <label htmlFor="picture_url">Picture URL</label>
                </div>

                <div className="mb-3">
                    <select
                    value={manufacturerId}
                    onChange={handleManufacturerChange}
                    required name="manufacturer"
                    id="manufacturer"
                    className="form-select">
                    <option value="">Choose a Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                        <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
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

export default ModelForm;
