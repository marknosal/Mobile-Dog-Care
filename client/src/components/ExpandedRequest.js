import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function ExpandedRequest ({ expandedRequest, onExpandClick, onEditRequest }) {
    //state
    const [isEditMode, setIsEditMode] = useState(false);

    //styles
    const xButtonStyle = {
        position: 'absolute',
        top: 5,
        right: 5,
    };

    const editButtonStyle = {
        position: 'absolute',
        bottom: 5,
        right: 5,
    };

    const completeButtonStyle = {
        postition: 'absolute',
        bottom: 1,
        left: 5,
        marginTop: '10px',
        display: isEditMode ? 'none' : 'block',
    }

    // Yup
    const forSchema = yup.object().shape({
        details: yup.string().required('Request details must exist').min(5),
        location: yup.string().required('Request must have location').min(5),
        price: yup.number().typeError('Price must be a number').required('Price is required.  You don\'t work for free').min(1.00)
    })

    // useFormik
    const formik = useFormik({
        initialValues: {
            details: expandedRequest.details,
            location: expandedRequest.location,
            price: expandedRequest.price
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch(`/requests/${expandedRequest.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values, null, 2)
            })
                .then(response=>response.json())
                .then(data=>onEditRequest(data))
        }
    });

    //functions
    function handleEditClick() {
        setIsEditMode(!isEditMode);
    }

    function requestAllDetails() {
        return (
            <div>
                <div>
                    <h3>Request Details: </h3>
                    <ul>
                        <li><strong>Pet name:</strong> {expandedRequest.client?.pets[0]?.name}</li>
                        <li><strong>Species:</strong> {expandedRequest.client?.pets[0]?.species}</li>
                        <li><strong>Instructions:</strong> {expandedRequest.details}</li>
                    </ul>
                </div>
                <div>
                    <h3>Location: </h3>
                    {expandedRequest.location}
                </div>
                <div>
                    <h3>Time: </h3>
                    {expandedRequest.datetime}
                </div>
                <div>
                    <h3>Price: </h3>
                    ${expandedRequest.price}
                </div>
            </div>
        );
    }

    function requestEditForm() {
        return (
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="details">Details:</label>
                    <input
                        type="text"
                        id="details"
                        name="details"
                        onChange={formik.handleChange}
                        value={formik.values.details}
                    />
                    <p>{formik.errors.details}</p>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                    />
                    <p>{formik.errors.location}</p>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <p>{formik.errors.price}</p>
                </div>
                <button type="submit">Save</button>
            </form>
        );
    }

    return (
        <div className="request-container" style={{position: 'relative'}}>
            <h2>Request: {expandedRequest.id}</h2>
            <button onClick={onExpandClick} style={xButtonStyle}>X</button>
            <button onClick={handleEditClick} style={editButtonStyle}>
                {isEditMode ? "Cancel" : "Edit"}
            </button>
            {isEditMode ? requestEditForm() : requestAllDetails()}
            <button style={completeButtonStyle}>Complete Request</button>
        </div>
    );
}