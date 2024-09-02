import React from 'react';
import "../styles/home.css";
import diseaseData from './diseasedata';

function ResultCard(props) {

    const imgSrc = diseaseData[props.pType]?.[props.disease]?.img;
    const description = diseaseData[props.pType]?.[props.disease]?.description;
    console.log(description);
    const symptoms = diseaseData[props.pType]?.[props.disease]?.symptoms;
    const treatment = diseaseData[props.pType]?.[props.disease]?.treatment;

    return (
        <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis">{props.pType}</h1>
                <img src={imgSrc} className='rounded mx-auto d-block' style={{ width: '40%', marginTop:'0' }} alt="diseasephoto" />
                <h1 className="text-body-emphasis" style={{marginBottom:'150px'}}>{props.disease}</h1>
                <h3 className="text-body-emphasis">Description</h3>
                <p className="col-lg-8 mx-auto fs-5 text-muted">
                    {description}
                </p>
                <h3 className="text-body-emphasis">Symptoms</h3>
                <p className="col-lg-8 mx-auto fs-5 text-muted">
                    {symptoms}
                </p>
                <h3 className="text-body-emphasis">Treatment</h3>
                <p className="col-lg-8 mx-auto fs-5 text-muted">
                    {treatment}
                </p>
                <div className="d-inline-flex gap-2 mb-5">
                <a href={`/dashboard/${props.userId}`}>
                    <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                        Accept
                        <svg className="bi ms-2" width="24" height="24"><use xlinkHref="#arrow-right-short"></use></svg>
                    </button>
                </a>
                <a href={`/${props.userId}/${props.pType}/${props.disease}/report`}>
                    <button className="btn btn-danger btn-lg px-4 rounded-pill" type="button">
                        Reject
                        <svg className="bi ms-2" width="24" height="24"><use xlinkHref="#arrow-right-short"></use></svg>
                    </button>
                </a>
                </div>
            </div>
        </div>
    )
}

export default ResultCard