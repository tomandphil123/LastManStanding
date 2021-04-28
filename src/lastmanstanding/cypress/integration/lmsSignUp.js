// Code does work but user has been created so cannot be created again
// Account will be used for other tests

describe ("Loads webpage",  () => {
  it("loads webpage", () => {
      cy.visit('https://www.mylastmanstanding.xyz/signUp')
  })

  it("Correct Url", () => {
        cy.url()
            .should('include', "/signUp")
    })

  // describe ("Interacts sign up input",  () => {
  //     it("enters username", () => {
  //         cy.get("form");
  //         cy.get('input[id="username"]').type("midLevelAcc");
  //         cy.get('input[id="email"]').type("philip.donnelly28@mail.dcu.ie");
  //         cy.get('input[id="password"]').type("Password1");
  //     })
  // })

  // describe ("Interacts sign up button",  () => {
  //     it("Finds Sign Up button", () => {
  //         cy.get("button")
  //     })

  //     it("Signs Up", () => {
  //         cy.get(".MuiButton-label").contains("Sign Up").click()
  //     })
  // })
})