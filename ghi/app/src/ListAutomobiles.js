import React, { useState, useEffect } from 'react';

const ListAutomobiles = function() {
    const [automobiles, setAutomobiles] = useState('');

    const getAutomobiles = async function() {
        const response = await fetch("http://localhost:8100/api/automobiles/");
        const automobiles = await response.json();
        setAutomobiles(automobiles.autos);
    }

    useEffect(() => {
        getAutomobiles();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Current Automobiles</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Color</th>
                        <th>Year</th>
                        <th>VIN</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                {automobiles && automobiles.map((automobile) => (
                    <tr key={automobile.id}>
                        <td>{automobile.color}</td>
                        <td>{automobile.year}</td>
                        <td>{automobile.vin}</td>
                        <td>{automobile.model.name}</td>
                        <td>{automobile.model.manufacturer.name}</td>
                        <td>{automobile.sold ? "Yes" : "No"}</td>
                    </tr>
                ))};
                </tbody>
            </table>
        </div>
    );
}


export default ListAutomobiles;
