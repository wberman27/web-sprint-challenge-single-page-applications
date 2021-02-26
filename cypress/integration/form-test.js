beforeEach(() =>{
    cy.visit('http://localhost:3000/pizza')
})

it('Sanity check', () =>{
    expect(1+2).to.equal(3)
})

const textInput = () => cy.get('input[name=name]')

it('Filling out inputs', () =>{
    textInput()
        .type('William')
        .should('have.value', 'William')
})