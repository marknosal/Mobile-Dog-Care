import React from "react";
import '../../index.css';

export default function RequestCard({ request, onExpandClick }) {
    return (
        <div className="request-card" onClick={() => onExpandClick(request.id)}>
            RequestCard {request.id}
        </div>
    )
}