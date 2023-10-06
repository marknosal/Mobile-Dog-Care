import React from "react";
import RequestCard from './RequestCard';

export default function CompleteRequests({ allRequests }) {
    return (
        <div className="completeRequests-container">
            <h2>Completed Requests</h2>
            <div className="completeRequests-card-container">
                {allRequests.map(r => (
                    <div key={r.id} className="completeRequests-card">
                        <RequestCard request={r} />
                    </div>
                ))}
            </div>
        </div>
    )
}