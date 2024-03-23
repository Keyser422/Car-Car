import React, { useState, useEffect } from 'react';

const SalespersonHistory = () => {
  const [salespersonId, setSalespersonId] = useState('');
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    // Fetch salespeople list
    const fetchSalespeople = async () => {
      try {
        const response = await fetch('/api/salespeople/');
        if (!response.ok) {
          throw new Error('Failed to fetch salespeople');
        }
        const data = await response.json();
        setSalespeople(data.salespeople);
      } catch (error) {
        console.error('Error fetching salespeople:', error);
      }
    };

    fetchSalespeople();
  }, []);

  const handleSalespersonChange = async (e) => {
    const selectedSalespersonId = e.target.value;
    setSalespersonId(selectedSalespersonId);
    try {
      const response = await fetch(`/api/salespeople/${selectedSalespersonId}/sales/`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales for the selected salesperson');
      }
      const data = await response.json();
      setSales(data.sales);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  return (
    <div>
      <h2>Salesperson History</h2>
      <label htmlFor="salesperson-select">Select a Salesperson:</label>
      <select id="salesperson-select" value={salespersonId} onChange={handleSalespersonChange}>
        <option value="">Select a salesperson</option>
        {salespeople.map((salesperson) => (
          <option key={salesperson.id} value={salesperson.id}>
            {salesperson.name} - {salesperson.employee_id}
          </option>
        ))}
      </select>
      {sales.length > 0 ? (
        <div>
          <h3>Sales</h3>
          <ul>
            {sales.map((sale) => (
              <li key={sale.id}>
                Salesperson: {sale.salesperson.name} - {sale.salesperson.employee_id}<br />
                Customer: {sale.customer.name}<br />
                Automobile VIN: {sale.automobile.vin}<br />
                Price: ${sale.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No sales found for the selected salesperson</p>
      )}
    </div>
  );
};

export default SalespersonHistory;