import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import Confirm from './Confirm'
import axios from './myapi'
import { v4 as uuid } from 'uuid'
import * as yup from 'yup'
import {Route, Switch} from 'react-router-dom'
import './myapi'

const initialFormValues = { //intial form values
  name: '',
  size: '',
  pepperoni: false,
  mushrooms: false,
  jalapeño: false,
  pineapple: false,
  spec: ''
}
const initialFormErrors = { //intial form errors
  name: '',
  size: '',
  pepperoni: false,
  mushrooms: false,
  jalapeño: false,
  pineapple: false,
  spec: ''
}

const initialDisabled = false; //button disabled intially

const App = () => {

  const [order, setOrder] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getOrder = () =>{ //get order and set from api
    axios
      .get('https://pizzaplace.com/api/Orders')
      .then(res =>{
        setOrder(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  const postNewOrder = newOrder => { //post order to api
    axios
      .post('https://pizzaplace.com/api/Orders', newOrder)
      .then(res =>{
        setOrder([res.data, ...order])
      })
      .catch(err => {
        console.log(err)
      })
      setFormValues(initialFormValues) //reset form values
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

  const formSubmit = () => { //function for submitting form
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size,
      pepperoni: formValues.pepperoni ? 'Pepperoni' : '',
      mushrooms: formValues.mushrooms ? 'Mushrooms' : '',
      jalapeño: formValues.jalapeño ? 'Jalapeño' : '',
      pineapple: formValues.pineapple ? 'Pineapple' : '',
      spec: formValues.spec.trim() 
    }
    postNewOrder(newOrder) //post new order 
  }

  useEffect(() => { //get order invoked on page load
    getOrder()
  }, [])

  useEffect(() => { //whenever form values change, check schema validation
    Schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])


  return (
    <>
      <div className = "app-header">
        <div className = 'header-nav'>
          <h1>Lambda Eats</h1><a href='/'>Home</a><a href='/pizza'>Order</a>
        </div>
      <Switch>
        <Route path = '/pizza/confirm'>
          <Confirm key = {uuid()} formSubmit = {formSubmit}/>
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
          <div className = 'home-img'><img src='https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=h30EAnkk'/></div>
          </div>
        </Route>
      </Switch>
      </div>
    </>
  );
};
export default App;
