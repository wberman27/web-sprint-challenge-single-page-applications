import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuid } from 'uuid'
import Schema from './Schema'
import axios from './myapi'
import './myapi'
import * as yup from 'yup'

const Form = (props) => {

    const {initialDisabled, initialFormErrors, initialFormValues} = props

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
  
    useEffect(() => { //whenever form values change, check schema validation, then disable/enable button accordingly
      Schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])
  

    const onSubmit = evt => { //prevent submit's default refresh
        evt.preventDefault()
        formSubmit()
      }
    
      const onChange = evt => { 
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value // use valueToUse with checkbox, otherwise use value
        inputChange(name, valueToUse)
      }

    return (
    <>
      <form className='form-container' onSubmit={onSubmit}>
        <div className='submit'>
  
          <div className='errors'>
            <div>{formErrors.name}</div>
          </div>
        </div>
  
        <div className='inputs'>
          <h3>Create Your Pizza</h3>
  
          <label>Name
            <input
              value={formValues.name}
              onChange={onChange}
              name='name'
              type='text'
              placeholder='First Name Last Name'
              maxLength = '40'
            />
          </label>
  
          <label>Choice of Size
                <select value = {formValues.size} name = 'size' onChange = {onChange}>

                    <option value = ''>--Select Size--</option>
                    <option value = 'SMALL'>Small</option>
                    <option value = 'MEDIUM'>Medium</option>
                    <option value = 'LARGE'>Large</option>

                </select>
            </label> 

        </div>
  
        <div className='checkboxes'>
          <h5>Add Toppings</h5>
          <label>Pepperoni
            <input 
              type='checkbox'
              name='pepperoni'
              onChange={onChange}
              checked={formValues.pepperoni} 
            />
          </label>
          <label>Mushrooms
            <input 
              type='checkbox'
              name='mushrooms'
              onChange={onChange}
              checked={formValues.mushrooms} 
            />
          </label>
          <label>Jalapeño
            <input 
              type='checkbox'
              name='jalapeño'
              onChange={onChange}
              checked={formValues.jalapeño} 
            />
          </label>
          <label>Pineapple
            <input 
              type='checkbox'
              name='pineapple'
              onChange={onChange}
              checked={formValues.pineapple} 
            />
          </label>
  
        </div>

        <label>Special Instructions
            <input
              value={formValues.spec}
              onChange={onChange}
              name='spec'
              type='text'
            />
          </label>

        <button id = 'submitButton' disabled = {disabled}>Submit Order</button>
      
      </form>
    <div className = 'orders-container'>
      <h3>Current Orders at Lambda Eats</h3>
      
      {
          order.map(o =>{
              return (
                  <>
                  <div className = 'order-container' key = {uuid()}>
                      <div className = 'order'>
                        <p>Name: <span id = 'goldname'>{o.name}</span></p>
                        <p>Size: {o.size}</p>
                        <p>Toppings: </p>
                            <div className = 'pepperoni'>
                            {o.pepperoni ? 'Pepperoni' : ''} 
                            </div>
                            <div className = 'mushrooms'>
                            {o.mushrooms ? 'Mushrooms' : ''}
                            </div>
                            <div className = 'jalapeno'>
                            {o.jalapeño ? 'Jalapeño' : ''}
                            </div>
                            <div className = 'pineapple'>
                            {o.pineapple ? 'Pineapple' : ''}
                            </div>
                        
                        <p>Special Instructions: <span  id = 'spec'>{o.spec}</span></p>
                        <a href = 'http://localhost:3000/pizza/confirm'>See Order Status</a>

                      </div>
                  </div>
                  </>
              )
          })
      }
      </div>  
    </>
    )
    
}

export default Form