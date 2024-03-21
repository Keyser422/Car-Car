import React, { useState } from 'react';


function CreateManufacturer() {

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;

        const url = 'http://localhost:8100/api/manufacturers/';
        const fetchOptions ={
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const manufacturerResponse = await fetch(url, fetchOptions);
        if (manufacturerResponse.ok) {
            setName('');
        }
    };



    return (

        <div className="p-3 mb-2 bg-light text-emphasis-dark">
            <h2 className="mb-3">Add a Manufacturer</h2>
            <form id="create-manufacturer-form">
                <div className="input-group input-group-lg mb-3">
                    <div className="form-floating col-lg">
                        <input className="form-control form-control-lg" onChange={handleNameChange} placeholder="manufacturer name" value={name} type="text" name="name" id="name"/>
                        <label htmlFor="name">Name</label>
                    </div>
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#manufacturerSubmitModal" type="button">Submit</button>
                        <div className="modal fade" id="manufacturerSubmitModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        We are now ready to accept cars made by {name}!
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleSubmit}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </form>
        </div>

    );
}


export default CreateManufacturer;
