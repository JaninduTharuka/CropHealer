import React, { useState } from 'react';

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
        
        <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={userDetails.email}
                    onChange={updateDetails}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userDetails.password}
                    onChange={updateDetails}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
