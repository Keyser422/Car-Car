import React, { useState, useEffect } from 'react';


function AddTechnician() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [technician, setTechnician] = useState(0);
    const [technicians, setTechnicians] = useState('');

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        if (response.ok){
            const data = await response.json();
            setTechnicians(data.technicians);

        }
    }


    useEffect(() => {
        fetchData();
    }, [])


    const handleChangeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }


    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }


    const handleChangeEmployeeId = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const technicianResponse = await fetch(technicianUrl, fetchOptions);
        if (technicianResponse.ok) {
            await technicianResponse.json();
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

return (
    <div className="p-3 mb-2 bg-light text-dark">
            <form onSubmit={handleSubmit} id="create-technician-form" className="container">
                <h2 className="text-center mb-4">Add a Technician</h2>
                <div className="form-group mb-3">
                    <input className="form-control" onChange={handleChangeFirstName} placeholder="First Name" value={firstName} type="text" id="firstName" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" onChange={handleChangeLastName} placeholder="Last Name" value={lastName} type="text" id="lastName" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" onChange={handleChangeEmployeeId} placeholder="Employee ID" value={employeeId} type="text" id="employeeId" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddTechnician;
