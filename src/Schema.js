import * as yup from 'yup'

const Schema = yup.object().shape({
    name: yup.string()
        .trim()
        .required('Name is required.')
        .min(3, 'Name must be at least 3 characters.'),
    size: yup.string(),
    spec: yup.string(), //not required
    jalapeño: yup.boolean(),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    pineapple: yup.boolean()
})

export default Schema