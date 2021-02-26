import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import axios from './myapi'
import { v4 as uuid } from 'uuid'
import * as yup from 'yup'
import {Route, Switch, useParams} from 'react-router-dom'
import './myapi'

const initialFormValues = {
  name: '',
  size: '',
  toppings: '',
  spec: ''
}
const initialFormErrors = {
  name: '',
  size: '',
  toppings: '',
  spec: ''
}

const initialDisabled = false;

const App = () => {

  const [order, setOrder] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getOrder = () =>{
    axios
      .get('https://pizzaplace.com/api/Orders')
      .then(res =>{
        setOrder(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  const postNewOrder = newOrder => {
    axios
      .post('https://pizzaplace.com/api/Orders', newOrder)
      .then(res =>{
        setOrder([res.data, ...order])
        console.log(setOrder([res.data, ...order]))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const inputChange = (name,value) =>{
    yup.reach(Schema, name)
      .validate(value)
      .then(() =>{
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err =>{
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
      setFormValues({
        ...formValues, [name]: value
      })
  }

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      pepperoni: formValues.pepperoni,
      mushrooms: formValues.mushrooms,
      jalapeño: formValues.jalapeño,
      pineapple: formValues.pineapple,
      spec: formValues.spec.trim() 
    }
    postNewOrder(newOrder)
  }

  useEffect(() => {
    getOrder()
  }, [])

  useEffect(() => {
    Schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])


  return (
    <>
      <div className = "app-header">
      <h1>Lambda Eats</h1>
      
      <Switch>
        <Route path = '/pizza/confirm'>
          <h2>Congratulations! Your pizza is on its way!</h2>
          <div className = 'pizza-img'><img src='./Assets/Pizza.jpg' alt="Pizza"/></div>
        </Route>
        <Route path = '/pizza'>
          <Form
          key = {uuid()}
          values={formValues}
          submit={formSubmit}
          change={inputChange}
          disabled={disabled}
          errors={formErrors} 
          />
        </Route>
        <Route path = '/'>
          <div className = "home-container">
          <a href= 'http://localhost:3000/pizza'>Order Pizza</a>
          </div>
        </Route>
      </Switch>
      </div>
    </>
  );
};
export default App;
