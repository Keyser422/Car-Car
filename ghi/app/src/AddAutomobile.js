import React, {useState, useEffect} from 'react';


const AddAutomobile = function() {

    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model,setModel] = useState('');
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok){
            const data = await response.json();
            setModels(data.models);
            console.log(data);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    const handleChangeColor = (event) => {
        const value = event.target.value;
        setColor(value);
    }


    const handleChangeYear = (event) => {
        const value = event.target.value;
        setYear(value);
    }


    const handleChangeVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }


    const handleChangeModel = (event) => {
        const value = event.target.value;
        setModel(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = Number(year);
        data.vin = vin;
        data.model_id = Number(model);

        const url = "http://localhost:8100/api/automobiles/"
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const autoResponse = await fetch(url, fetchOptions);
        if (autoResponse.ok){
            const newAuto = await autoResponse.json();

            setColor('');
            setYear('');
            setVin('');
            setModel('');
        };
    };

    return (
        <div className="p-3 mb-2 bg-light text-dark">
            <form onSubmit={handleSubmit} id="create-auto-form" className="container">
                <h2 className="text-center mb-4">Add an Automobile</h2>
                <div className="form-group mb-3">
                    <input className="form-control" onChange={handleChangeVin} placeholder="Vehicle VIN" value={vin} type="text" id="vin" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" onChange={handleChangeColor} placeholder="Color" value={color} type="text" id="color" />
                </div>
                <div className="form-group mb-3">
                    <input className="form-control" onChange={handleChangeYear} placeholder="Year" value={year} type="text" id="year" />
                </div>
                <div className="form-group mb-3">
                    <select className="form-select" onChange={handleChangeModel} value={model} id="model">
                        <option value="">Select Model</option>
                        {models.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
}


export default AddAutomobile;
