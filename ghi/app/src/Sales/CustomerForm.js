import React, {useState} from "react";


function CustomerForm() {
    const [first_name, setFirstName] = useState("");
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const [last_name, setLastName] = useState("");
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const [address, setAddress] = useState("");
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const [phone_number, setPhoneNumber] = useState("");
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.first_name = first_name;
        data.last_name = last_name;
        data.address = address;
        data.phone_number = phone_number;

        const customerUrl = "http://localhost:8090/api/customers/"
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
                    <h1 className="text-center">Create a New Customer</h1>
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input
                                value = {first_name}
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

export default CustomerForm;
