import React, { useState, useEffect } from 'react';


function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
    const getAppointments = async function() {
        const response = await fetch("http://localhost:8080/api/appointments/");
        if (response.ok) {
            const appointmentsObj = await response.json();
            setAppointments(appointmentsObj.appointments);
            setFilteredAppointments(appointmentsObj.appointments);
        }
    };
        getAppointments();
    }, []);

    const handleVINSearch = (event) => {
        setSearchVIN(event.target.value);
    };
    const handleSearchSubmit= (event) => {
        event.preventDefault();
        const filtered = appointments.filter(appointment => appointment.vin.includes(searchVIN));
        setFilteredAppointments(filtered);
    };

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4">Service History</h2>
            <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by VIN..."
                        value={searchVIN}
                        onChange={handleVINSearch}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </div>
                </div>
            </form>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip ? 'Yes' : 'No'}</td>
                            <td>{appointment.customer}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceHistory;
