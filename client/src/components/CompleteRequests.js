import React from "react";
import RequestCard from './RequestCard';
import '../index.css';

export default function CompleteRequests({ completedRequests, onExpandClick }) {
    return (
        <div className="request-container">
            <h2>Completed Requests</h2>
            <div className="request-card-container">
                {completedRequests.map(r => (
                    <div key={r.id} className="request-card">
                        <RequestCard request={r} onExpandClick={onExpandClick} />
                    </div>
                ))}
            </div>
        </div>
    )
}