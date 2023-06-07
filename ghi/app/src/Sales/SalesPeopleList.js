import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function SalesPeopleList() {
    const [salespeople, setSalesPerson] = useState([]);
    const fetchData = async () => {
        const salespersonUrl = "http://localhost:8090/api/salespeople/"
        const response= await fetch(salespersonUrl)

        if(response.ok) {
            const data = await response.json();
            setSalesPerson(data.salespeople);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
        <div className="container">
            <h1>Sales People List</h1>
                <p className="text-right">
                    <Link to="/salespeople/form" className="btn btn-primary btrn-md">Create a New Sales Person</Link>
                </p>
        </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee Id</th>
                    </tr>
                </thead>
                <tbody>
                {salespeople.map((sales_people, id) => {
                    return (
                    <tr key={id}>
                        <td>{sales_people.first_name}</td>
                        <td>{sales_people.last_name}</td>
                        <td>{sales_people.employee_id}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>

    )
}

export default SalesPeopleList;
