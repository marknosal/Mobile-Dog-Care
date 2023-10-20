import React, { useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function NewClientForm ({ onShowNewClientForm, setError }) {

    useEffect(() => {
        return () => {
            setError(null)
        }
    }, [])

    return (
        <div className="new-client-form">
            <h1>New Client Form</h1>
            <button onClick={onShowNewClientForm}>X</button>
        </div>
    )
}