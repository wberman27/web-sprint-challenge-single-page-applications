import * as yup from 'yup'

const Schema = yup.object().shape({
    //input string
    name: yup.string()
        .trim()
        .required('Name is required.')
        .min(3, 'Name must be at least 3 characters.'),
    //dropdown
    size: yup.string(),
    //input string
    spec: yup.string(), //not required
    // checkboxes
    jalapeño: yup.boolean(),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    pineapple: yup.boolean()
})

export default Schema