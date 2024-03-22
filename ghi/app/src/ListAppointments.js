import React, { useEffect, useState } from 'react';


const ListAppointments = function() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchVIN, setSearchVIN] = useState('');

    const getAppointments = async function() {
        const response = await fetch("http://localhost:8080/api/appointments/");
        if (response.ok) {
            const appointmentsObj = await response.json();
            const activeAppointments = appointmentsObj["appointments"].filter(appointment =>
              appointment.status !== "canceled" && appointment.status !== "finished"
            );

            setAppointments(activeAppointments);
        }
    }

    useEffect(() => {
        getAppointments();
    }, [])

    const updateAppointmentStatus = async (apptId, action) => {
        let url;
        if (action === 'canceled') {
            url = `http://localhost:8080/api/appointments/${apptId}/cancel/`;
        } else if (action === 'finished') {
            url = `http://localhost:8080/api/appointments/${apptId}/finish/`;
        }

        const fetchOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== apptId));
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4">Service Appointments</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip ? "Yes" : "No"}</td>
                            <td>{appointment.customer}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => updateAppointmentStatus(appointment.id, "canceled")}>Cancel</button>
                                <button className="btn btn-success ms-2" onClick={() => updateAppointmentStatus(appointment.id, "finished")}>Finish</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAppointments;
