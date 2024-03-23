import React, { useState } from 'react';

const CreateSale = () => {
  const [formData, setFormData] = useState({
    automobile: '',
    price: '',
    customer: '',
    salesperson: ''
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
    const response = await fetch('http://localhost:8090/api/sales/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      await response.json();
      setFormData({
        automobile: '',
        price: '',
        customer: '',
        salesperson: ''
      });
    } else {
      console.error('Failed to add sale');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Record a New Sale</h2>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="vin" value={formData.vin} type="text" id="vin" name="vin" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Automobile" value={formData.automobile} type="text" id="automobile" name="automobile" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Price" value={formData.price} type="text" id="price" name="price" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Customer" value={formData.customer} type="text" id="customer" name="customer" />
        </div>
        <div className="form-group mb-3">
          <input className="form-control" onChange={handleFormChange} placeholder="Salesperson" value={formData.salesperson} type="text" id="salesperson" name="salesperson" />
        </div>
        <button type="submit" className='btn btn-success'>Add Sale</button>
      </form>
    </div>
  );
};

export default CreateSale;