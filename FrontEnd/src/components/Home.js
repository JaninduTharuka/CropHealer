import React from 'react';
import "../styles/home.css";
import Header from './Header';

function Home() {
    
    return (
        <div>
            <Header logged={0} />
            <h1 className="title">CropHealer</h1>
            <p>Quickly identify plant diseases with our advanced detection tools. We're here to help you keep your crops healthy and thriving.</p>
            <p>Empower your fields with CropHealer!</p>

            <div>
                <img src="https://balchem.com/plant-nutrition/wp-content/uploads/sites/4/2021/02/Balchem-plant-nutrittion-field-crops.jpg" alt="Crop Field" />
            </div>

            <section className="white-section" id="features">
                <div className="row">
                <div className="col-lg-4 feature-item">
                    <i className="fa-solid fa-circle-check"></i>
                    <h3>Easy to use.</h3>
                </div>
                <div className="col-lg-4 feature-item">
                    <i className="fa-solid fa-bullseye"></i>
                    <h3>High Accuracy</h3>
                </div>
                <div className="col-lg-4 feature-item">
                    <i class="fa-solid fa-sheet-plastic"></i>
                    <h3>Detailed Treatment Plans</h3>
                </div>
                </div>
            </section>

            <div>
                <a href="/downloadmobileapp">Download</a>
            </div>
        </div>
    );
}

export default Home;