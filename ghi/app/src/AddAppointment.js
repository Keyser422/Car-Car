import React, {useState, useEffect } from 'react';


const AddAppointment = function() {

    const [vin, setVin] = useState('');
    const [customer, setCustumer] = useState('');
    const [date, setDate] = useState('');
    const [technician, setTechnician] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [reason, setReason] = useState('');

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/api/technicians/");
        if (response.ok){
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }


    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustumer(value);
    }


    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }


    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }


    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = date;
        data.technician = technician;
        data.reason = reason;

        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const appointmnetResponse = await fetch(appointmentUrl, fetchOptions);
        if (appointmnetResponse.ok) {
            await appointmnetResponse.json();

            setVin('');
            setCustumer('');
            setDate('');
            setTechnician('');
            setReason('');
        }
    }

    return(
        <div className="p-3 mb-2 bg-light text-dark">
        <form onSubmit={handleSubmit} id="create-appointment-form" className="container">
            <h2 className="text-center mb-4">Make an Appointment</h2>
            <div className="form-group mb-3">
                <input className="form-control" onChange={handleVinChange} placeholder="Vehicle VIN" value={vin} type="text" name="vin" id="vin" />
                <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-group mb-3">
                <input className="form-control" onChange={handleCustomerChange} placeholder="Customer Name" value={customer} type="text" name="customer" id="customer" />
                <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-group mb-3">
                <input className="form-control" onChange={handleDateChange} placeholder="Appointment Date" value={date} type="date" name="date" id="date" />
                <label htmlFor="date">Date</label>
            </div>
            <div className="form-group mb-3">
                <select className="form-select" onChange={handleTechnicianChange} value={technician} name="technician" id="technician">
                    <option value="">Select a Technician</option>
                    {technicians.map((tech) => (
                        <option key={tech.employee_id} value={tech.employee_id}>{tech.first_name} {tech.last_name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group mb-3">
                <textarea className="form-control" onChange={handleReasonChange} placeholder="Reason for Visit" value={reason} name="reason" id="reason" />
                <label htmlFor="reason">Reason</label>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </form>
    </div>
);
}

export default AddAppointment;
