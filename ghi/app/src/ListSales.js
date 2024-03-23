import React, { useState, useEffect } from 'react';

const ListSales = () => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');
    const salesObj = await response.json();
    setSales(salesObj.sales);
    };

    useEffect(() => {
      fetchSales();
  }, []);

  
  return (
    <div className="p-3 mb-2 bg-light container text-center">
      <h2>Sales</h2>
      <div className="row border border-success-subtle bg-success text-light mb-2">
        <h3 className="col-md-2">Id</h3>
        <h3 className="col-md-2">Automobile</h3>
        <h3 className="col-md-2">Price</h3>
        <h3 className="col-md-2">Customer</h3>
        <h3 className="col-md-2">Salesperson</h3>
      </div>
      {sales.map((sales) => (
        <div className="row border border-success" key={sales.id}>
          <div className="col-md-2">{sales.id}</div>
          <div className="col-md-2">{sales.automobile}</div>
          <div className="col-md-2">{sales.price}</div>
          <div className="col-md-2">{sales.customer}</div>
          <div className="col-md-2">{sales.salesperson}</div>
        </div>
      ))}
    </div>
  );
};
export default ListSales;