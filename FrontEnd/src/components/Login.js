import React, { useState } from 'react';
import Header from './Header';

function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    function updateDetails(e) {
        const { name, value } = e.target;
        setUserDetails((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:5000/login", {
            method: "POST",
            // crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "./dashboard/"+data.userId;
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <Header logged={0} />
            <div className="form-signin w-25 m-auto">
                <form onSubmit={handleLogin}>
                    <h1 className="mb-4 text-secondary" style={{textAlign:'center', marginTop:'100px', marginBottom:'50px'}}>CropHealer</h1>

                    <div className="form-floating">
                    <input 
                        type="email" 
                        id="email"
                        className="form-control" 
                        name="email"
                        value={userDetails.email}
                        onChange={updateDetails}
                    />
                    <label htmlFor="email">name@example.com</label>
                    </div>
                    <div className="form-floating">
                    <input 
                        type="password" 
                        id="password"
                        className="form-control" 
                        name="password"
                        value={userDetails.password}
                        onChange={updateDetails}
                    />
                    <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-success w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2024</p>
                </form>
            </div>
        </div>
    );
}   


export default Login;
