import React from "react";

function Header(props) {
    return (
        <div className="container-fluid" style={{height: '80px',backgroundColor: '#12372A',padding: '20px'}}>
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li id="brand"><a href="/" className="nav-link px-2 text-secondary">CropHealer</a></li>
                <li style={props.logged === 0 ? { display: "none" } : {}}><a href="/dashboard" className="nav-link px-2 text-white">Home</a></li>
                <li><a href="/instructions" className="nav-link px-2 text-white">Instructions</a></li>
                <li><a href="/about" className="nav-link px-2 text-white">About</a></li>
                <li><a href="/contact" className="nav-link px-2 text-white">Contact</a></li>
                </ul>

                <div className="text-end" style={props.logged === 1 ? { display: "none" } : {}}>
                    <a href="/login" type="button" className="btn btn-outline-light me-2">Login</a>
                    <a href="/register" type="button" className="btn btn-light">Sign-up</a>
                </div>
            </div>
        </div>
    );
}

export default Header;
