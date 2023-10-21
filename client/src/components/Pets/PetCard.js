import React from "react";

export default function PetCard({ pet }) {
    return (
        <div className='petCard'>
            Pet Card {pet.id}
        </div>
    )
}