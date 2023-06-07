import React, {useState} from "react";

function SalesPeopleForm() {
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
    const [employee_id, setEmployeeId] = useState("");
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.first_name = first_name;
        data.last_name = last_name;
        data.employee_id = employee_id;

        const salesPeopleUrl = "http://localhost:8090/api/salespeople/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }
        const response = await fetch(salesPeopleUrl, fetchConfig);
        if (response.ok) {
            setFirstName("");
            setLastName("");
            setEmployeeId("");
        }
    }

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-cent">Create a New Sales Person</h1>
                    <form onSubmit={handleSubmit} id="create-salespeople-form">
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
                                value = {employee_id}
                                onChange={handleEmployeeIdChange}
                                placeholder="employee_id"
                                required type="text"
                                name="employee_id" id="employee_id"
                                className="form-control" />
                            <label htmlFor="employee_id">employee_id</label>
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

export default SalesPeopleForm;
