import React from 'react'
import './App.css';
import { v4 as uuid } from 'uuid'

const Form = (props) => {

    const {
      values,
      submit,
      change,
      disabled,
      errors,
      order
    } = props

    const onSubmit = evt => { //prevent submit's default refresh
        evt.preventDefault()
        submit()
      }
    
      const onChange = evt => { 
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value // use valueToUse with checkbox, otherwise use value
        change(name, valueToUse)
      }

    return (
    <>
      <form className='form-container' onSubmit={onSubmit}>
        <div className='submit'>
  
          <div className='errors'>
            <div>{errors.name}</div>
          </div>
        </div>
  
        <div className='inputs'>
          <h3>Create Your Pizza</h3>
  
          <label>Name (required)
            <input
              value={values.name}
              onChange={onChange}
              name='name'
              type='text'
              placeholder='First Name Last Name'
              maxLength = '40'
            />
          </label>
  
          <label>Choice of Size
                <select value = {values.size} name = 'size' onChange = {onChange}>

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
              checked={values.pepperoni} 
            />
          </label>
          <label>Mushrooms
            <input 
              type='checkbox'
              name='mushrooms'
              onChange={onChange}
              checked={values.mushrooms} 
            />
          </label>
          <label>Jalapeño
            <input 
              type='checkbox'
              name='jalapeño'
              onChange={onChange}
              checked={values.jalapeño} 
            />
          </label>
          <label>Pineapple
            <input 
              type='checkbox'
              name='pineapple'
              onChange={onChange}
              checked={values.pineapple} 
            />
          </label>
  
        </div>

        <label>Special Instructions
            <input
              value={values.spec}
              onChange={onChange}
              name='spec'
              type='text'
            />
          </label>

        <button id = 'submitButton' disabled = {disabled} href='/pizza/confirm'>Submit Order</button>
      
      </form>

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

                      </div>
                  </div>
                  </>
              )
          })
      }  
    </>
    )
}
export default Form