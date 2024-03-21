import React, { useState, useEffect } from 'react';

function ManufacturersList() {

    const [manufacturers, setManufacturers] = useState([]);


    const getManufacturers = async () => {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        const manufacturerObj = await response.json();
        setManufacturers(manufacturerObj.manufacturers);
    };

    useEffect(() => {
        getManufacturers();
    }, []);

    return (
        <div>
            <h2>Manufacturers</h2>
            <div>
            <ul>
                {manufacturers.map(manufacturer => (
                    <li key={manufacturer.id}>{manufacturer.name}</li>
                ))}
            </ul>
            </div>
        </div>
    );
}


export default ManufacturersList;
