import React, { useState, useEffect } from 'react';

const ListSalesperson = () => {
  const [salesperson, setSalesperson] = useState([]);

  const fetchSalesperson = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    const salespersonObj = await response.json();
    setSalesperson(salespersonObj.salesperson);
    };

    useEffect(() => {
      fetchSalesperson();
  }, []);

  
  return (
    <div className="p-3 mb-2 bg-light container text-center">
      <h2>Salespeople</h2>
      <div className="row border border-success-subtle bg-success text-light mb-2">
        <h3 className="col-md-4">First Name</h3>
        <h3 className="col-md-4">Last Name</h3>
        <h3 className="col-md-4">Employee Id</h3>
      </div>
      {salesperson.map((salesperson) => (
        <div className="row border border-success" key={salesperson.id}>
          <div className="col-md-4">{salesperson.first_name}</div>
          <div className="col-md-4">{salesperson.last_name}</div>
          <div className="col-md-4">{salesperson.employee_id}</div>
        </div>
      ))}
    </div>
  );
};
export default ListSalesperson;