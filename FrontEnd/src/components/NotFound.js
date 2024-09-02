import React from 'react';

function NotFound() {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4">404</h1>
            <p className="lead">Oops! The page you are looking for does not exist.</p>
            <p>It might have been moved or deleted. Please check the URL and try again.</p>
            <a href='/'>
                <button className="btn btn-success mt-3">Go to Homepage</button>
            </a>
        </div>
    );
}

export default NotFound;