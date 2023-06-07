import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function SalesList() {
    const [sales, setSales] = useState([]);
    const fetchData = async () => {
        const salesUrl = "http://localhost:8090/api/sales/"
        const response = await fetch(salesUrl);

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="container">
            <h1>Sales List</h1>
                <p className="text-right">
                    <Link to="/sales/form" className="btn btn-primary btrn-md">Record a New Sales</Link>
                </p>
        </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer Name</th>
                        <th>Vin</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {sales.map((sale, id) => {
                    return (
                    <tr key={id}>
                        <td>{sale.salesperson.employee_id}</td>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>{sale.price}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default SalesList;
