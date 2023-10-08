import React, { useState } from "react";
import RequestCard from './RequestCard';
import '../index.css';
import NewRequestForm from "./NewRequestForm";


export default function IncompleteRequests({ incompleteRequests, onExpandClick, onAddRequest }) {
    const [newRequest, setNewRequest] = useState(null)

    function requestCardContainer() {
        return (
            <div className="request-card-container">
                {incompleteRequests.map(r => (
                    <div key={r.id} className="request-card">
                        <RequestCard request={r} onExpandClick={onExpandClick} />
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className="request-container">
            <h2>Incompleted Requests</h2>
            <div>
                <button 
                    style={{ margin: 10, display: newRequest ? 'none' : 'block'}} 
                    onClick={() => setNewRequest(!newRequest)}
                >
                    Add New Request
                </button>
            </div>
            {newRequest ? 
                <NewRequestForm onAddRequest={onAddRequest} setNewRequest={setNewRequest} newRequest={newRequest} /> : requestCardContainer()}
        </div>
    )
}