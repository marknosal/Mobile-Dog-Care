import React from "react";
import "../../index.css"

export default function PetCard({ pet, onExpandPet }) {
    return (
        <div className='pet-card' onClick={() => onExpandPet(pet.id)}>
            {pet.name} the {pet.species}
        </div>
    )
}