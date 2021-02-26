beforeEach(() =>{
    cy.visit('http://localhost:3000/pizza/')
})

it('Sanity check', () =>{ //is cypress working
    expect(1+2).to.equal(3)
})

const textInput = () => cy.get('input[name=name]') //grabbing elements for cypress
const specInput = () => cy.get('input[name=spec]')
const sizeSelect = () => cy.get('select[name=size]')
const submitButton = () => cy.get('#submitButton')
const pepperCheck = () => cy.get('input[name=pepperoni]')
const mushCheck = () => cy.get('input[name=mushrooms]')
const jalaCheck = () => cy.get('input[name=jalapeño]')
const pineCheck = () => cy.get('input[name=pineapple]')
const formValid = () => cy.get('div[class=errors]')

it('Filling out inputs', () =>{ //check in cypress, if filling out inputs work correctly
    textInput()
        .type('William')
        .should('have.value', 'William')
    specInput()
        .type('Organize pepperoni into a smiley face')
        .should('have.value', 'Organize pepperoni into a smiley face')
})
it('Submit button works', () =>{ //checks to see if submit button works
    textInput()
        .type('William')
    sizeSelect()
        .select('Large')
    submitButton()
        .click()
    cy.contains('William') //the page contains William after submit button
    
    
})
it('Tests selection of multiple toppings', () =>{ //check a topping and test that is should have 'on' value
    pepperCheck()
        .check()
        .should('have.value', 'on')
    mushCheck()
        .check()
        .should('have.value', 'on')
    jalaCheck()
        .check()
        .should('have.value', 'on')
    pineCheck()
        .check()
        .should('have.value', 'on')
    
})

it('Checks error for empty name input', () =>{
    textInput()
        .type('William{selectall}{backspace}') //type in a name then delete it for error
    formValid()
        .children().should('have.text', 'Name is required.') // this error should be on page
})

it('Check error for no size selection', () =>{
    sizeSelect()
        .select('Medium')
        .select('--Select Size--') //select size then deselect it for error msg
    formValid()
        .children().should('have.text', 'You must choose a size.') // this error should be on page
})

it('Checks for no errors on page start', () => {
    formValid()
        .children().should('have.text', '') //Error children should have empty txt
})

it('Checks error not enough characters name input', () =>{
    textInput()
        .type('B') //type in a name less than 2 characters
    formValid()
        .children().should('have.text', 'Name must be at least 2 characters.') // this error should be on page
})