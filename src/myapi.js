import { v4 as uuid } from 'uuid' //uuid gives us unique key ids

export const initialOrder = [ //this user will be on the page at start
    {
      id: uuid(),
      name: 'Mr. Pizza Dude',
      size: 'LARGE',
      pepperoni: true,
      mushrooms: false,
      jalapeño: false,
      pineapple: true,
      spec: 'make it good pls'
    },
  ]

export default {
  get() {
    return Promise.resolve({ status: 200, success: true, data: initialOrder})
  },
  post(url, { name, size, pepperoni, mushrooms, jalapeño, pineapple, spec}) {
    const newOrder = { id: uuid(), name, size, pepperoni, mushrooms, jalapeño, pineapple, spec}
    return Promise.resolve({ status: 200, success: true, data: newOrder })
  }
}