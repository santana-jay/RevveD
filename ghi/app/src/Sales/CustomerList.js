import { useEffect, useState } from "react";


function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const fetchData = async () => {
        // const customerUrl = "http://localhost:8090/api/customers/"
        // const response = await fetch(customerUrl);
        const response = await fetch('http://localhost:8090/api/customers/'

            );

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="container">
            <h1>Customer List</h1>
        </div>
            <table className="table table striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                {customers.map((customer, id) => {
                    return (
                    <tr key={id}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.phone_number}</td>
                        <td>{customer.address}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default CustomerList;
