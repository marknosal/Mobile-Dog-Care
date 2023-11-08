import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Error from "../Error";
import { UserContext } from "../Contexts/UserContext";


export default function LogInForm () {
    const [error, setError] = useState(null)
    const { login } = useContext(UserContext)


    const forSchema = yup.object().shape({
        username: yup.string().required('Must exist'),
        password: yup.string().required('Must exist')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch('/login', {
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
                            .then(data => {
                                login(data)
                            })
                    } else {
                        response.json()
                            .then(data => setError(data))
                    }
                })
        }
    })
    
    return (
        <div className="login-form">
            <h2>Login Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type='text'
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p>{formik.errors.username}</p>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p>{formik.errors.password}</p>
                </div>
                <button type="submit">Login</button>
            </form>
            <Error error={error} />
        </div>
        
    )
}