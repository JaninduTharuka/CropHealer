import React, { useState } from 'react';

function Register() {
    const [userDetails, setUserDetails] = useState({
        name: "",
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

    function handleRegister(e) {
        e.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:5000/register", {
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
        <div className="register">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={userDetails.name}
                    onChange={updateDetails}
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;