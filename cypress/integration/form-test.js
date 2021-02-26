beforeEach(() =>{
    cy.visit('http://localhost:3000/pizza/')
})

it('Sanity check', () =>{
    expect(1+2).to.equal(3)
})

const textInput = () => cy.get('input[name=name]')
const specInput = () => cy.get('input[name=spec]')
const sizeSelect = () => cy.get('select[name=size]')
const submitButton = () => cy.get('#submitButton')

it('Filling out inputs', () =>{
    textInput()
        .type('William')
        .should('have.value', 'William')
    specInput()
        .type('Organize pepperoni into a smiley face')
        .should('have.value', 'Organize pepperoni into a smiley face')
})
it('Submit button works', () =>{
    textInput()
        .type('William')
    sizeSelect()
        .select('Large')
    submitButton()
        .click()
    
    
})