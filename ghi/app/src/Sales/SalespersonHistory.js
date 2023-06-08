import React, { useEffect, useState } from "react";


function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState("");

    const fetchSalesperson = async () => {
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const response = await fetch(salespersonUrl);

        if (response.ok) {
            const data = await response.json();
            console.log(data.salesperson)
            setSalespeople(data.salespeople);
        }
    };
    useEffect(() => {
        fetchSalesperson();
    }, []);

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value);
    };

    // Fetch sales based on selected salesperson
    const [sales, setSales] = useState([]);
    const fetchSales = async () => {
        const salesUrl = `http://localhost:8090/api/salespeople/${selectedSalesperson}/sales/`;
        const response = await fetch(salesUrl);

        if (response.ok) {
            const data = await response.json();
            console.log("this is", data)
            setSales(data);
        }
    };

    useEffect(() => {
        if (selectedSalesperson) {
            fetchSales();
        }
    }, [selectedSalesperson]);

    return (
        <>
        <div className="row">
            <div className="shadow p-4 mt-4">
                <h1 className="text-center">Sales People History</h1>
                <div className="mb-3">
                    <select className="form-select"
                        onChange={handleSalespersonChange}
                        name="salesperson" id="salesperson">
                        <option value="">Salesperson</option>
                        {salespeople.map((person) => {
                            return (
                                <option key={person.id} value={person.id}>
                                    {person.first_name}</option>
                            )
                        })}
                    </select>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>SalesPerson Name</th>
                                <th>Customer</th>
                                <th>Vin Number</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sales.map((sale, id) => {
                            return (
                                <tr key={id}>
                                    <td>{sale.salesperson.first_name}</td>
                                    <td>{sale.customer.first_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );








}

export default SalespersonHistory;
