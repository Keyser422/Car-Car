import React, {useState, useEffect } from 'react';

const AddModel = function() {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [manufacturer, setManufacturer] = useState(0);
    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if (response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleChangeName = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleChangeImage = (event) => {
        const value = event.target.value;
        setImage(value);
    }

    const handleChangeManufacturer = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture_url = image;
        data.manufacturer_id = Number(manufacturer);
        console.log(data);

        const url = "http://localhost:8100/api/models/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const modelResponse = await fetch(url, fetchOptions);
        if (modelResponse.ok){
            await modelResponse.json();
            setName('');
            setImage('');
            setManufacturer(0);
        };
    };


    return(
        <div className="p-3 mb-2 bg-light text-emphasis-dark">
            <div>
                <h2>Register Vehicle Model</h2>
            </div>
            <form onSubmit={handleSubmit} id="create=model-form">
                <div className="mb-3"/>
                <div className ="row g-3">
                    <div className="form-floating col-sm">
                        <input className="form-control form-control-lg mb-3" onChange={handleChangeName} placeholder="model name" type="text" value={name} name="name" id="name" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating col-sm">
                        <input className="form-control form-control-lg mb-3" onChange={handleChangeImage} placeholder="image url" type="text" value={image} name="image" id="image" />
                        <label htmlFor="image">Image Link</label>
                    </div>
                    <div className="input-group input-group-lg mb-3">
                        <select className="form-select mb-3" onChange={handleChangeManufacturer} value={manufacturer} id="manufacturer" name="manufacturer">
                            <option value="">Select Manufacturer</option>
                            {manufacturers.map(manufacturer => {
                                return (
                                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                )
                            })}
                        </select>
                        <button className="btn btn btn-success" data-bs-toggle="modal" data-bs-target="#modelSubmitModal" type="button">Submit</button>
                        <div className="modal fade" id="modelSubmitModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Successfully saved {name} to the database!
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleSubmit}>Confirm</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default AddModel;
