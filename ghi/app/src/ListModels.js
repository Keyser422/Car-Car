import React, { useState, useEffect } from 'react';

function ListModels() {

    const [models, setModels] = useState([]);


    const getModels = async () => {
        const response = await fetch("http://localhost:8100/api/models/");
        const modelsObj = await response.json();
        setModels(modelsObj.models);
    };

    useEffect(() => {
        getModels();
    }, []);

    return (
        <div className="p-3 mb-2 bg-light container text-center">
            <h2>Vehicle Models</h2>
            <div className="row border border-success-subtle bg-success text-light mb-2">
                <h3 className="col-md-4">Model</h3>
                <h3 className="col-md-4">Manufacturer</h3>
                <h3 className="col-md-4">Picture</h3>
            </div>
                {models.map((model) => (
                    <div className="row border border-success" key={model.id}>
                        <div className="col-md-4">{model.name}</div>
                        <div className="col-md-4">{model.manufacturer.name}</div>
                        <div className="col-md-4">
                            <img className="col mx-auto img-thumnail" src={model.picture_url} alt={'${model.name}'} style={{ maxWidth: "100px", maxHeight: "100px" }}  />
                        </div>
                    </div>
                ))}
        </div>

    );

}

export default ListModels;
