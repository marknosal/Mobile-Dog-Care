import React, { useEffect, useState } from "react"
import PetCard from "./PetCard"
import NewPetForm from "./NewPetForm"
import "../../index.css"
import Error from "../Error"
import ExpandedPet from "./ExpandedPet"

export default function Pets() {
    const [pets, setPets] = useState([])
    const [expandedPetId, setExpandedPetId] = useState(null)
    const [newPet, setNewPet] = useState(null)
    const [error, setError] = useState(null)

    const expandedPet = pets.find(p => p.id === expandedPetId)

    useEffect(() => {
        fetch('/pets')
            .then(response=>response.json())
            .then(data=>setPets(data))
    }, [])

    function petCardContainer() {
        return (
            <div className="pet-card-container">
                {pets.map(pet => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        onExpandPet={handleExpandPet} 
                    />
                ))}
            </div>
        )
    }

    function expandedPetContainer() {
        return (
            <ExpandedPet expandedPet={expandedPet} onExpandPet={handleExpandPet} />
        )
    }

    function handleExpandPet(id) {
        expandedPetId ? setExpandedPetId(null) : setExpandedPetId(id)
    }

    function handleShowNewPetForm() {
        setNewPet(!newPet)
    }

    function handleAddPet(newPet) {
        setPets([...pets, newPet])
    }


    return (
        <div className="pets-main">
            <Error error={error} />
            <div className="pet-container">
                <h2>{expandedPetId || newPet ? null : "Pets"}</h2>
                <button
                    onClick={() => setNewPet(!newPet)}
                    style={{ margin: 10, display: newPet || expandedPetId ? 'none' : 'block' }}
                >
                    Add New Pet
                </button>
                {newPet ? (
                    <NewPetForm
                        onShowNewPetForm={handleShowNewPetForm}
                        setError={setError}
                        onAddPet={handleAddPet}
                    />
                ) : (
                    expandedPetId ? expandedPetContainer() : petCardContainer()
                )}
            </div>
        </div>
    )
}