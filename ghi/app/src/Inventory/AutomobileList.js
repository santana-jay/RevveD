import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AutomobileList() {

    const [autos, setAutos] = useState([]);
    const fetchData = async () => {
        const autoUrl = `http://localhost:8100/api/automobiles/`;
        const response = await fetch(autoUrl);


        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1 className="card display-5 text-dark fw-bold text-center my-3">Automobiles</h1>
            <p className="text-center">
                <Link to="form" className="btn btn-primary btn-md" >Create A New Automobile</Link>
                </p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map((auto, id) => {
                        return (
                            <tr key={id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default AutomobileList;
