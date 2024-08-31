import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Dashboard() {
    const {userId} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/user/"+userId)
        .then(response => response.json())
        .then(data => {
            setUser(data.user);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [userId]);

    return (
        <div>
            <h1>Dashboard</h1>
            {user && <p>Welcome, {user.name}!</p>}
        </div>
    );
}


export default Dashboard;