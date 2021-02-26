import React from 'react'
import './App.css';
import Form from './Form';
import Confirm from './Confirm'
import { v4 as uuid } from 'uuid'
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

  return (
    <>
      <div className = "app-header">
        <div className = 'header-nav'>
          <h1>Lambda Eats</h1><a href='/'>Home</a><a href='/pizza'>Order</a>
        </div>
      <Switch>
        <Route path = '/pizza/confirm'>
          <Confirm key = {uuid()}/>
        </Route>
        <Route path = '/pizza'>
          <Form
          key = {uuid()}
          initialFormValues = {initialFormValues}
          initialFormErrors = {initialFormErrors}
          initialDisabled = {initialDisabled}
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
