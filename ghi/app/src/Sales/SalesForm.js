import React, { useState, useEffect } from "react";


function SalesForm () {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
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

        const data = {}
            data.automobile = selectedVin
            data.salesperson = selectedSalesperson
            data.customer = selectedCustomer
            data.price = price


        const salesUrl = "http://localhost:8090/api/sales/";
        const automobileUrl = `http://localhost:8100/api/automobiles/${selectedVin}/`;

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const automobileUpdate = {sold: true}
            const automobileUpdateConfig = {
                method: "PUT",
                body: JSON.stringify(automobileUpdate),
                headers: { "Content-Type": "application/json" }
            }
            await fetch(automobileUrl, automobileUpdateConfig)

            setSelectedVin("");
            setSelectedSalesperson("");
            setSelectedCustomer("");
            setPrice("");
        }
    }


    useEffect(() => {
        const fetchAutomobiles = async () => {
            const automobilesUrl = "http://localhost:8100/api/automobiles/";
            const response = await fetch(automobilesUrl);
            if (response.ok) {
                const data = await response.json();
                const filteredAutomobiles = data.autos.filter((automobile) => !automobile.sold);
                setAutomobiles(filteredAutomobiles);
            }
        };

        const fetchSalespeople = async () => {
            const salespeopleUrl = "http://localhost:8090/api/salespeople/";
            const response = await fetch(salespeopleUrl);
            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople);
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
                            <option key={automobile.vin} value={automobile.vin}>
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
                        {salespeople.map((salesp) => (
                            <option key={salesp.id} value={salesp.id}>
                                {salesp.first_name} {salesp.last_name}
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
