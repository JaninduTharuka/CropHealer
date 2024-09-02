import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';


function Dashboard() {
    const {userId} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/user/"+userId)
        .then(response => response.json())
        .then(data => {
            console.log(data.user);
            setUser(data.user);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    return (
        <div>
            <Header logged={1} />
            <div className='title'>
                <h1>Dashboard</h1>
                {user && <h3>Welcome, {user.name}!</h3>}
            </div>
            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 rounded-3" style={{margin: '0 30px', backgroundColor:'#316342'}}>
                        <h2>Predict a Disease</h2>
                        <p>Upload a clear image of your plant to receive an instant diagnosis. Our advanced system will analyze the image to detect any signs of disease and provide you with accurate information on the condition. Take action early and ensure the health of your plants with our reliable disease prediction tool.</p>
                        <a href={`/${userId}/predict`}>
                            <button className="btn btn-outline-light" type="button">Predict</button>
                        </a>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="h-100 p-5 rounded-3"  style={{margin: '0 30px', backgroundColor:'#afe0c0'}}>
                        <h2>View Report History</h2>
                        <p>Review the list of predictions you have flagged as incorrect. Here, you can see the details of each reported issue, including the original prediction and the feedback you provided. This section helps you track the resolution status and ensures that your concerns are being addressed.</p>
                        <a href={`/${userId}/reports`}>
                            <button className="btn btn-outline-dark" type="button">Reports</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Dashboard;