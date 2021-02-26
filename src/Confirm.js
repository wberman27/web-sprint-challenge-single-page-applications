import React from 'react'
import './App.css';
import { v4 as uuid } from 'uuid'

const Confirm = (props) =>{
    const{order} = props

    return (
        <>
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

export default Confirm