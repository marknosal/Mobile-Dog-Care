import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Error from "../Error";

export default function SignUpForm ({ onLogin }) {
    const [error, setError ] = useState(null)
    const forSchema = yup.object.shape({
        name: yup.string().min(5).required('Must exist'),
        age: yup.number().min(1).required('Must exist'),
        email: yup.string().min(5).required('Must exist'),
        password: yup.string().min(5).required('Must exist'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .min(5)
            .required('Must exist')
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(data => onLogin(data))
                    } else {
                        response.json()
                            .then(data => setError(data))
                    }
                })
                
        }
    })
    return (
        <div className="signup-form">
            <h2>Signup Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor=""
                </div>
            </form>
        </div>
    )
}