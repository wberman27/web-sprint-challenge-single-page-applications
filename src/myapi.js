import { v4 as uuid } from 'uuid' //uuid gives us unique key ids

export const initialOrder = [ //this user will be on the page at start
    {
      id: uuid(),
      
    },
  ]

export default {
  get() {
    return Promise.resolve({ status: 200, success: true, data: [initialOrder]})
  },
  post(url, { name, size, toppings, spec}) {
    const newOrder = { id: uuid(), name, size, toppings, spec}
    return Promise.resolve({ status: 200, success: true, data: newOrder })
  }
}