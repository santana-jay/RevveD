import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManuList() {
    const [manufacturers, setManufacturers] = useState([]);
    const fetchData = async () => {
        const listUrl = `http://localhost:8100/api/manufacturers/`;
        const response = await fetch(listUrl);


        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1 className="text-dark fw-bold text-center my-3">Manufacturers</h1>
                <p className="text-center">
                <Link to="inventory/manufacture/form" className="btn btn-primary btn-md" >Create A New Manufacturer</Link>
                </p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturers</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer, id) => {
                        return (
                            <tr key={id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default ManuList;
