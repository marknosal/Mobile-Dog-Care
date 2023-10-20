import React, { useEffect, useState } from "react"
import Error from "../Error"
import ClientCard from "./ClientCard"
import ExpandedClient from "./ExpandedClient"

export default function Clients({ clients, onSetClients }) {

    const [expandedClientId, setExpandedClientId] = useState(null)
    const [error, setError] = useState(null)

    const expandedClient = clients.find(c => c.id === expandedClientId)

    useEffect(() => {
        fetch('/clients',)
            .then(response=>response.json())
            .then(data=>onSetClients(data))
    }, [])

    function expandedClientContainer () {
        return (
            <ExpandedClient expandedClient={expandedClient} onExpandClick={handleExpandClick} />
        )
    }

    function clientCardContainer() {
        return (
            <div className="client-card-container">
                {clients.map(client => (
                        <ClientCard key={client.id} client={client} onExpandClick={handleExpandClick} />
                ))}
            </div>
        )
    }
    function handleExpandClick(id) {
        expandedClientId ? setExpandedClientId(null) : setExpandedClientId(id)
    }
    return (
        <div className="clients-main">
            <Error error={error} />
            <div className="client-container">
                <h2>{expandedClientId ? null : "Clients"}</h2>
                {expandedClientId ? expandedClientContainer() : clientCardContainer()}
            </div>
        </div>
    )
}