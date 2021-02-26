import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import axios from './fake-api/myapi'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
    </>
  );
};
export default App;
