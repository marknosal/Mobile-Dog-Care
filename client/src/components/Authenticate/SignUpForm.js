import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Error from "../Error";
import { UserContext } from "../Contexts/UserContext";

export default function SignUpForm () {
    const [error, setError ] = useState(null)

    const { login } = useContext(UserContext)

    const forSchema = yup.object().shape({
        username: yup.string().min(5).required('Must exist'),
        name: yup.string().min(5).required('Must exist'),
        age: yup.number().min(18).required('Must exist'),
        email: yup.string().min(5).required('Must exist'),
        password: yup.string().min(5).required('Must exist'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .min(5)
            .required('Must exist')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
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
                            .then(data => login(data))
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
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p>{formik.errors.username}</p>
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <p>{formik.errors.name}</p>
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    <p>{formik.errors.age}</p>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <p>{formik.errors.email}</p>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p>{formik.errors.password}</p>
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirm Password: </label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirmation}
                    />
                    <p>{formik.errors.passwordConfirmation}</p>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <Error error={error} />
        </div>
    )
}