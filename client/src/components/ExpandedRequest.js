import React, { useState } from "react";

export default function ExpandedRequest ({ expandedRequest, onExpandClick }) {
    //state
    const [isEditMode, setIsEditMode] = useState(false)
    //styles
    const xButtonStyle = {
        position: 'absolute',
        top: 5,
        right: 5,
    }
    const editButtonStyle = {
        position: 'absolute',
        bottom: 5,
        right: 5,
    }
    //functions
    function handleEditClick() {
        setIsEditMode(!isEditMode)
    }


    return (
        <div className="request-container" style={{position: 'relative'}}>
            <h2>Request: {expandedRequest.id}</h2>
            <button onClick={onExpandClick} style={xButtonStyle}>X</button>
            <button onClick={handleEditClick} style={editButtonStyle}>Edit</button>
            <div>
                <h3>Request Details: </h3>
                {expandedRequest.details}
                <h3>Location: </h3>
                {expandedRequest.location}
                <h3>Price: </h3>
                ${expandedRequest.price}
            </div>
        </div>
    )
}