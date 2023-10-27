import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ExpandedRequest ({ expandedRequest, onExpandClick, onEditRequest, onCompleteRequest, onDeleteRequest, onUpdateClientDebt, onClearExpandedRequest }) {
    const history = useHistory();

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
    };

    const deleteButtonStyle = {
        marginTop: '5px',
    };

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
            datetime: expandedRequest.datetime,
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
        const petName = expandedRequest.pet ? expandedRequest.pet.name : "N/A";
        const petSpecies = expandedRequest.pet ? expandedRequest.pet.species : "N/A";
        const details = expandedRequest.details ? expandedRequest.details : 'N/A';
        return (
            <div>
                <div>
                    <h3>Request Details: </h3>
                    <ul>
                        <li><strong>Pet name:</strong> {petName}</li>
                        <li><strong>Species:</strong> {petSpecies}</li>
                        <li><strong>Instructions:</strong> {details}</li>
                    </ul>
                </div>
                <div>
                    <h3>Location: </h3>
                    {expandedRequest.location}
                </div>
                <div>
                    <h3>Time: </h3>
                    {new Date(expandedRequest.datetime).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
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
                    <label htmlFor="datetime">Date:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        onChange={formik.handleChange}
                        value={formik.values.datetime}
                    />
                    <p>{formik.errors.datetime}</p>
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
    function handleCompleteButtonClick() {
        onClearExpandedRequest()
        fetch(`/requests/${expandedRequest.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ complete: true })
        })
            .then(response=>response.json())
            .then(data=>onCompleteRequest(data))
        fetch(`/clients/${expandedRequest.client_id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ debt: expandedRequest.client.debt + expandedRequest.price })
        })
            .then(response=>response.json())
            .then(data=>onUpdateClientDebt(data))
    }

    function handleDeleteButtonClick() {
        
        fetch(`/requests/${expandedRequest.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    onDeleteRequest(expandedRequest.id)
                } else {
                    history.push('/')
                    toast.error('Error deleting request')
                }
            })
    }

    return (
        <div className="request-container" style={{ position: 'relative' }}>
            <h2>Request: {expandedRequest.id}</h2>
            <button onClick={onExpandClick} style={xButtonStyle}>X</button>
            <button onClick={handleEditClick} style={editButtonStyle}>
                {isEditMode ? "Cancel" : "Edit"}
            </button>
            {isEditMode ? requestEditForm() : requestAllDetails()}
            <button style={completeButtonStyle} onClick={handleCompleteButtonClick}>Complete Request</button>
            <button style={deleteButtonStyle} onClick={handleDeleteButtonClick}>Delete Request</button>
        </div>
    );
}