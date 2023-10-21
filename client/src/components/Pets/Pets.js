import React, { useEffect, useState } from "react"
import PetCard from "./PetCard"

export default function Pets() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        fetch('/pets')
            .then(response=>response.json())
            .then(data=>setPets(data))
    }, [])
    const pet_cards = pets.map(pet => (
        <PetCard 
            key={pet.id} 
            pet={pet}
        />
    ))
    return (
        <div className="pet-card-container">{pet_cards}</div>
    )
}