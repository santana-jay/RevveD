import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function ModelList( ){
    const[models, setModels] = useState([]);
    const fetchData = async () => {
        const modelUrl = `http://localhost:8100/api/models/`;
        const response = await fetch(modelUrl);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="my-5 container">
            <h1 className="text-dark fw-bold text-center my-3">Vehicle Models</h1>
                <p className="text-center">
                <Link to="form" className="btn btn-primary btn-md" >Create A New Model</Link>
                </p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vehicle Model Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model, id) => {
                    return(
                        <tr key={id}>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td>
                                <img className='img-thumbnail' style={{ width: 300, height: "auto" }} src= { model.picture_url } />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ModelList;
