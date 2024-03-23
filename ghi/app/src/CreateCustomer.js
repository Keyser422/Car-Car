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
    const response = await fetch('http://localhost:8090/api/customers/', {
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
        <h2>Add a Customer</h2>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="First Name" value={formData.first_name} type="text" id="firstName" name="name" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Last Name" value={formData.last_name} type="text" id="lastName" name="name" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Address" value={formData.address} type="text" id="address" name="address" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Phone Number" value={formData.phoneNumber} type="text" id="phoneNumber" name="phoneNumber" />
        </div>
        <button type="submit" className='btn btn-success'>Add Customer</button>
      </form>
    </div>
  );
};

export default CreateCustomer;