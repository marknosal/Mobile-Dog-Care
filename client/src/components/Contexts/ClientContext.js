import { createContext, useState } from "react";

const ClientContext = createContext([])

function ClientProvider({ children }) {
    const [clients, setClients] = useState([]);

    function addClient(newClient) {
        setClients([...clients, newClient]);
    }
    function updateClient(updatedClient) {
        const updatedClients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
        setClients(updatedClients);
    }


    return (
        <ClientContext.Provider value={{ clients, setClients, addClient, updateClient }}>
            { children }
        </ClientContext.Provider>
    )
}

export { ClientContext, ClientProvider }