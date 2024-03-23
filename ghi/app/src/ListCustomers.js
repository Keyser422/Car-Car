import React, { useState, useEffect } from 'react';

const ListCustomer = () => {
  const [customer, setCustomer] = useState([]);

  const fetchCustomers = async () => {
    const response = await fetch('http://localhost:8090/api/customers/');
    const customerObj = await response.json();
    setCustomer(customerObj.customer);
    };

    useEffect(() => {
      fetchCustomers();
  }, []);

  
  return (
    <div className="p-3 mb-2 bg-light container text-center">
      <h2>Customers</h2>
      <div className="row border border-success-subtle bg-success text-light mb-2">
        <h3 className="col-md-3">First Name</h3>
        <h3 className="col-md-3">Last Name</h3>
        <h3 className="col-md-3">Address</h3>
        <h3 className="col-md-3">Phone Number</h3>
      </div>
      {customer.map((customer) => (
        <div className="row border border-success" key={customer.id}>
          <div className="col-md-3">{customer.first_name}</div>
          <div className="col-md-3">{customer.last_name}</div>
          <div className="col-md-3">{customer.address}</div>
          <div className="col-md-3">{customer.phone_number}</div>
        </div>
      ))}
    </div>
  );
};
export default ListCustomer;