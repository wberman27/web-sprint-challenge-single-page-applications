import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

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
  const [formValues, setFormValues] = useState()
  const [formErrors, setFormErrors] = useState()
  const [disabled, setDisabled] = useState()

  const getOrder = () =>{
    axios
      .get('https://reqres.in/')
      .then(res =>{
        console.log(res)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  const postNewOrder = newOrder => {
    axios
      .post('https://reqres.in/', newOrder)
      .then(res =>{
        console.log(setOrder([res.data, ...order]))
      })
      .catch(err => {
        console.log(err)
      })
  }



  return (
    <>
      <div className = "app-header">
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      </div>
      <Form />
    </>
  );
};
export default App;
