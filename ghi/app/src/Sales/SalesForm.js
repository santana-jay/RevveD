import React, { useState, useEffect } from "react";


function SalesForm () {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespersons, setSalesperson] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedVin, setSelectedVin] = useState("");
    const [selectedSalesperson, setSelectedSalesperson] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [price, setPrice] = useState("");

    const handleVinChange = (event) => {
        const value = event.target.value;
        setSelectedVin(value);
    };

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSelectedSalesperson(value);
    };

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setSelectedCustomer(value);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            automobile: selectedVin,
            salesperson: selectedSalesperson,
            customer: selectedCustomer,
            price: price,
        };

        const salesUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            setSelectedVin("");
            setSelectedSalesperson("");
            setSelectedCustomer("");
            setPrice("");
        }
    };

    useEffect(() => {
        const fetchAutomobiles = async () => {
            const automobilesUrl = "http://localhost:8100/api/automobiles/";
            const response = await fetch(automobilesUrl);
            if (response.ok) {
                const data = await response.json();
                setAutomobiles(data.autos);
            }
        };

        const fetchSalespeople = async () => {
            const salespeopleUrl = "http://localhost:8090/api/salespeople/";
            const response = await fetch(salespeopleUrl);
            if (response.ok) {
                const data = await response.json();
                setSalesperson(data.salespeople);
            }
        };

        const fetchCustomers = async () => {
            const customersUrl = "http://localhost:8090/api/customers/";
            const response = await fetch(customersUrl);
            if (response.ok) {
                const data = await response.json();
                setCustomers(data.customers);
            }
        };

        fetchAutomobiles();
        fetchSalespeople();
        fetchCustomers();
    }, []);


    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1 className="text-center">Create a New Sale</h1>
            <form onSubmit={handleSubmit} id="create-sales-form">
                <div className="mb-3">
                    <label htmlFor="vin">VIN:</label>
                    <select
                        value={selectedVin}
                        onChange={handleVinChange}
                        required id="vin"
                        className="form-select">
                    <option value="">Select a VIN</option>
                        {automobiles.map((automobile) => (
                            <option key={automobile.id} value={automobile.vin}>
                                {automobile.vin}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="salesperson">Salesperson:</label>
                    <select
                        value={selectedSalesperson}
                        onChange={handleSalespersonChange}
                        required id="salesperson"
                        className="form-select">
                    <option value="">Select a Salesperson</option>
                        {salespersons.map((salesperson) => (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="customer">Customer:</label>
                    <select
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                        required id="customer"
                        className="form-select">
                    <option value="">Select a Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.first_name} {customer.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        required id="price"
                        className="form-control" />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
            </div>
    </div>
    </div>
    </>
    )
}

export default SalesForm;
