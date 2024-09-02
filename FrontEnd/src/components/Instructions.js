import React from 'react';
import Header from './Header';

import takephoto from '../images/takephoto.png';
import uploadphoto from '../images/uploadphoto.webp';
import results from '../images/results.jpg';

function Instructions() {
    return (
        <div>
            <Header logged={0} />
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-interval="1000" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-interval="1000" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-interval="1000" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={takephoto} alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Take a Photo of a Leaf</h5>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={uploadphoto} alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Upload Photo</h5>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={results} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 style={{color:"black"}}>Get Results</h5>
                    </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}


export default Instructions;