import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

function ReportList() {
    const { userId } = useParams();  // Destructure useParams for cleaner code
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.user && data.user.reports) {
                    console.log(data.user.reports);
                    setReports(data.user.reports);
                } else {
                    setReports([]);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
            });
    }, [userId]);

    return (
        <div>
            <Header />
            <div>
                <h1 style={{margin:'40px', textAlign:'center'}}>Report List</h1>
                {error ? (
                    <p>Error fetching reports: {error}</p>
                ) : (
                    <table className="table table-striped" style={{margin:'70px'}} >
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Actual Plant Type</th>
                                <th scope="col">Actual Disease</th>
                                <th scope="col">Predicted Plant type</th>
                                <th scope="col">Predicted Disease</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length > 0 ? (
                                reports.map((report, index) => (
                                    <tr key={index}>
                                        <td>{report.date}</td>
                                        <td>{report.actPlant}</td>
                                        <td>{report.actDisease}</td>
                                        <td>{report.predPlant}</td>
                                        <td>{report.predDisease}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No reports found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ReportList;
