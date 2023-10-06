import React from "react";
import '../index.css';

export default function RequestCard({ request, onRequestClick }) {
    return (
        <div className="requestCard" onClick={() => onRequestClick(request.id)}>
            RequestCard {request.id}
        </div>
    )
}