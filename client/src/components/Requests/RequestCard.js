import React from "react";
import '../../index.css';

export default function RequestCard({ request, onExpandClick }) {
    const formattedDatetime = new Date(request.datetime).toLocaleString()
    return (
        <div className="request-card" onClick={() => onExpandClick(request.id)}>
            Request {request.id}) {request.client.name} - {formattedDatetime}
        </div>
    )
}