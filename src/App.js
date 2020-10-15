import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import axios from 'axios'
import schema from './validation/formSchema'
import * as yup from 'yup'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  background: ${pr=> pr.theme.secondColor};
}
`;

const StyledOutput = styled.div`
 background: ${pr => pr.theme.firstColor};
 text-align: center;
 padding: 1%;
 margin: 1%;
 color: white;
 border-radius: 10px;
 border: 5px solid ${pr => pr.theme.thirdColor};

 div{
   margin: 1%;
 }
`;

function App() {
  
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    role: '',
    tos: false
  }
  const initialFormErrors = {
    name: "",
    email: "",
    password: "",
    role: "",
    tos: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [users, setUsers] = useState([])
  const [disabled, setDisabled] = useState(true)
    
  const formChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors, [name]: ''
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors, [name]: err.errors[0]
        })
      })
    setFormValues({...formValues, [name]: value})
  }

  const formSubmit = () => {
    const newPerson = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role,
      tos: formValues.tos
    }
    axios.post('https://reqres.in/api/users', newPerson)
          .then(res => {
            console.log(res)
            setUsers([...users, JSON.stringify(res.data)])
            setFormValues(initialFormValues)
          })
          .catch(err => {
            debugger
          })

  }
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues])

  return (
  <>
  <GlobalStyle />
  <StyledOutput><Form values={formValues} change={formChange} submit={formSubmit} disabled={disabled} errors={formErrors}/></StyledOutput>
  <StyledOutput><h1>Post Request Output</h1></StyledOutput>
  {users.map(user => <StyledOutput>{user}</StyledOutput>)}
  </>
  )
}

export default App;
