import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 as uuid } from 'uuid'
import axios from './myapi'

const Confirm = (props) =>{
    const {formSubmit} = props
    

    return (
        <>
         <h2>Congratulations! Your pizza is on its way!</h2>
         
         <img id='pizzaman' src='https://www.accountingweb.com/sites/default/files/styles/inline_banner/public/pizza_delivery_nullplus.jpg?itok=bb0GpjM1'/>
        </>
    )
}

export default Confirm