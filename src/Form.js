import React from 'react'

const Form = (props) => {

    const {
      values,
      submit,
      change,
      disabled,
      errors
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
      <form className='form container' onSubmit={onSubmit}>
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
            />
          </label>
  
          <label>Choice of Size
            <input
              value={values.size}
              onChange={onChange}
              name='size'
              type='dropdown'
            />
          </label>  

        </div>
  
        <div className='checkboxes'>
          <h4>Add Toppings</h4>
          <label>Pepperoni
            <input 
              type='checkbox'
              name='toppings'
              onChange={onChange}
              checked={values.toppings} 
            />
          </label>
          <label>Mushrooms
            <input 
              type='checkbox'
              name='toppings'
              onChange={onChange}
              checked={values.toppings} 
            />
          </label>
          <label>Jalapeño
            <input 
              type='checkbox'
              name='toppings'
              onChange={onChange}
              checked={values.toppings} 
            />
          </label>
          <label>Pineapple
            <input 
              type='checkbox'
              name='toppings'
              onChange={onChange}
              checked={values.toppings} 
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

        <button id = 'submitButton' disabled = {disabled}>Submit Order</button>
      
      </form>
    )
}
export default Form