import React, { useState } from 'react';
import Header from './Header';

function Predict() {
    const [image, setImage] = useState(null);

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    }

    function handleSubmit() {
        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: image.split(',')[1] }),  // Send only the base64 string, without the prefix
        })
        .then(response => response.json())
        .then(data => window.location.href = './result/' + data.result.predictions[0]+ '/' + data.result.predictions[1])
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <Header logged={1} />
            <div className="d-flex align-items-center" style={{ margin: '150px 250px 50px' }}>
                <input className="form-control" type="file" accept="image/*" onChange={handleImageUpload} />
                <button className='btn btn btn-success' onClick={handleSubmit}>Predict</button>
            </div>
            {image && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <img src={image} alt="Uploaded Preview" style={{ height:'200px', width:'200px', border: '1px solid black', borderRadius: '5px' }} />
                </div>
            )}
        </div>
    );
}

export default Predict;
