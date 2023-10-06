import React from "react";
import '../index.css';

export default function RequestCard({ request }) {
    return (
        <div className="requestCard">
            RequestCard {request.id}
        </div>
    )
}