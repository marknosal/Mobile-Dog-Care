import React, { useContext, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { UserContext } from '../Contexts/UserContext';
import { ClientContext } from '../Contexts/ClientContext';

export default function ExpandedClient({ 
  expandedClient, 
  onExpandClick, 
  setError }) {

  const { user, login } = useContext(UserContext)
  const { updateClient } = useContext(ClientContext)

  useEffect(() => {
    return () => {
      setError(null)
    }
  }, [])

  const forSchema = yup.object().shape({
    payment: yup.number().min(1).max(expandedClient.debt).required('Must exist'),
  })
  const formik = useFormik({
    initialValues: {
      payment: expandedClient.debt
    },
    validationSchema: forSchema,
    onSubmit: (values) => {
      const newDebt = expandedClient.debt - formik.values.payment
      Promise.all([
        fetch(`/clients/${expandedClient.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ debt: newDebt })
        }).then(response => response.json()),
        fetch(`/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ earnings: user.earnings + formik.values.payment })
        }).then(response => response.json()),
      ])
        .then(([clientData, userData]) => {
          updateClient(clientData);
          login(userData);
          onExpandClick();
        })
        .catch(error => setError(error))
    }
  })
  
  return (
    <div style={{ position: 'relative' }}>
      <h2>Client: {expandedClient.id}</h2>
      <h2>Name: {expandedClient.name}</h2>
      <h2>Address: {expandedClient.address}</h2>
      <h2>Debt: {expandedClient.debt}</h2>

      {expandedClient.debt !== 0 && (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor='payment'>Payment: </label>
              <input
                type='number'
                id='payment'
                name='payment'
                onChange={formik.handleChange}
                value={formik.values.payment}
              />
              <p>{formik.errors.payment}</p>
            </div>
            <button type="submit">Collect Payment</button>
          </form>
        </div>
      )}
      <button style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={onExpandClick}>X</button>
    </div>
  )
}
