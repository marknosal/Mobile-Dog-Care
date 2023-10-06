import React from "react";
import RequestCard from './RequestCard';
import '../index.css';

export default function IncompleteRequests({ allRequests, onRequestClick }) {
    return (
        <div className="request-container">
            <h2>Incompleted Requests</h2>
            <div className="request-card-container">
                {allRequests.map(r => (
                    <div key={r.id} className="request-card">
                        <RequestCard request={r} onRequestClick={onRequestClick} />
                    </div>
                ))}
            </div>
        </div>
    )
}