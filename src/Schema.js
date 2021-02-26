import * as yup from 'yup'

const Schema = yup.object().shape({
    //input string
    name: yup.string()
        .trim()
        .required('Name is required.')
        .min(3, 'Name must be at least 3 characters.'),
    //dropdown
    size: yup.string()
        .oneOf(['SMALL', 'MEDIUM', 'LARGE'], 'You must choose a size.'),
    //input string
    spec: yup.string(), //special instructions not required
    // checkboxes, not required
    jalapeño: yup.boolean(),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    pineapple: yup.boolean()
})

export default Schema