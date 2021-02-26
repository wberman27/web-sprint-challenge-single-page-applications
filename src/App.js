import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import Confirm from './Confirm'
import axios from './myapi'
import { v4 as uuid } from 'uuid'
import * as yup from 'yup'
import {Route, Switch, useParams} from 'react-router-dom'
import './myapi'

const initialFormValues = {
  name: '',
  size: '',
  pepperoni: false,
  mushrooms: false,
  jalapeño: false,
  pineapple: false,
  spec: ''
}
const initialFormErrors = {
  name: '',
  size: '',
  pepperoni: false,
  mushrooms: false,
  jalapeño: false,
  pineapple: false,
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
        console.log(res.data)
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
      pepperoni: formValues.pepperoni ? 'Pepperoni' : '',
      mushrooms: formValues.mushrooms ? 'Mushrooms' : '',
      jalapeño: formValues.jalapeño ? 'Jalapeño' : '',
      pineapple: formValues.pineapple ? 'Pineapple' : '',
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
          <Confirm key = {uuid()} order = {order}/>
        </Route>
        <Route path = '/pizza'>
          <Form
          key = {uuid()}
          values={formValues}
          submit={formSubmit}
          change={inputChange}
          disabled={disabled}
          errors={formErrors} 
          order={order}
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
