import React, {useState, useEffect} from "react";


function SaleForm() {
    const [vin, setVin] = useState("");
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const [salesperson, setSalesPerson] = useState("");
    const handleSalespeopleChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }
    const [customer, setCustomer] = useState("");
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const [price, setPrice] = useState("");
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.first_name = first_name;
        data.last_name = last_name;
        data.address = address;
        data.phone_number = phone_number;

        const customerUrl = "http://localhost:8090/api/sales/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            setFirstName("");
            setLastName("");
            setAddress("");
            setPhoneNumber("");
        }
    }

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-cent">Create a New Sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="form-floating mb-3">
                            <select
                                onChange={handleFirstNameChange}
                                placeholder="first_name"
                                required type="text"
                                name="first_name" id="first_name"
                                className="form-control" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value = {last_name}
                                onChange={handleLastNameChange}
                                placeholder="last_name"
                                required type="text"
                                name="last_name" id="last_name"
                                className="form-control" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value = {address}
                                onChange={handleAddressChange}
                                placeholder="address"
                                required type="text"
                                name="address" id="address"
                                className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value = {phone_number}
                                onChange={handlePhoneNumberChange}
                                placeholder="phone_number"
                                required type="text"
                                name="phone_number" id="phone_number"
                                className="form-control" />
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <div>
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default SaleForm;
