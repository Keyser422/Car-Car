import React, { useState } from 'react';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8090/api/salespeople/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      await response.json();
      setFormData({
        name: '',
        address: '',
        phoneNumber: ''
      });
    } else {
      console.error('Failed to add customer');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a Salesperson</h2>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="First Name" value={formData.first_name} type="text" id="firstName" name="name" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Last Name" value={formData.last_name} type="text" id="lastName" name="name" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Employee Id" value={formData.employee_id} type="text" id="employeeId" name="employee_id" />
        </div>
        <button type="submit" className='btn btn-success'>Add Customer</button>
      </form>
    </div>
  );
};

export default CreateCustomer;