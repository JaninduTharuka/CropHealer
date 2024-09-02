import React,{useState} from "react";
import { useParams } from 'react-router-dom'
import Header from "./Header";

function Report() {

    const {pType,disease,userId} = useParams();
    const date = new Date();


    const [reportDetails, setReportdetails] = useState({
        predPlant: pType,
        predDisease: disease,
        actPlant: "",
        actDisease: "",
        details: "",
        date: date.toDateString()
    })

    function updateReportDetails(event) {
        const {name, value} = event.target;
        setReportdetails((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleReport(e) {
        e.preventDefault();
        
        fetch("http://localhost:5000/report/"+userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportDetails),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Report submitted successfully");
                window.location.href = "/dashboard/"+userId;
            } else {
                alert("Error: "+data.message);
            }
        })
    }

    return (
        <div>
            <Header logged={1} />
            <div className="container mt-50">
                <form onSubmit={handleReport} className="bg-light p-4 rounded shadow">
                    <h3 className="mb-4">Report Form</h3>
                    <div className="mb-3">
                        <label htmlFor="predPlant" className="form-label">Predicted Plant</label>
                        <input
                            type="text"
                            id="predPlant"
                            name="predPlant"
                            value={reportDetails.predPlant}
                            className="form-control"
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="predDisease" className="form-label">Predicted Disease</label>
                        <input
                            type="text"
                            id="predDisease"
                            name="predDisease"
                            value={reportDetails.predDisease}
                            className="form-control"
                            disabled
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="actPlant" className="form-label">Actual Plant</label>
                        <input
                            type="text"
                            id="actPlant"
                            name="actPlant"
                            value={reportDetails.actPlant}
                            onChange={updateReportDetails}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="actDisease" className="form-label">Actual Disease</label>
                        <input
                            type="text"
                            id="actDisease"
                            name="actDisease"
                            value={reportDetails.actDisease}
                            onChange={updateReportDetails}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="details" className="form-label">Details</label>
                        <textarea
                            id="details"
                            name="details"
                            value={reportDetails.details}
                            onChange={updateReportDetails}
                            className="form-control"
                            rows="4"
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Report;