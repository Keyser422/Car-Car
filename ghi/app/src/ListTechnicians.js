import React, { useState, useEffect } from 'react';

function ListTechnicians() {

    const [technicians, setTechnicians] = useState([]);


    const getTechnicians = async () => {
        const response = await fetch("http://localhost:8080/api/technicians/");
        const techniciansObj = await response.json();
        setTechnicians(techniciansObj.technicians);
    };

    useEffect(() => {
        getTechnicians();
    }, []);

    return (
        <div className="p-3 mb-2 bg-light container text-center">
            <h2>Technicians</h2>
            <div className="row border border-success-subtle bg-success text-light mb-2">
                <h3 className="col-md-4">First Name</h3>
                <h3 className="col-md-4">Last Name</h3>
                <h3 className="col-md-4">Employee ID</h3>
            </div>
                {technicians.map((technician) => (
                    <div className="row border border-success" key={technician.employee_id}>
                        <div className="col-md-4">{technician.first_name}</div>
                        <div className="col-md-4">{technician.last_name}</div>
                        <div className="col-md-4">{technician.employee_id}</div>
                    </div>
                ))}
        </div>

    );

}

export default ListTechnicians;
