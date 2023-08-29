describe("Newsletter Subscribe Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to subscribe to the email list", () => {
    cy.getByData("email-input").should("be.visible").type("aaa@email.com")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("exist").contains("aaa@email.com")
  })

  it("does NOT allow an invalid email address", () => {
    cy.getByData("email-input").should("be.visible").type("aaa")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
  })

  it("does NOT allow an already subscribed email address", () => {
    cy.getByData("email-input").should("be.visible").type("john@example.com")
    cy.getByData("submit-button").click()
    cy.getByData("success-message").should("not.exist")
    cy.getByData("server-error-message")
      .should("exist")
      .contains("already exists. Please use a different email address.")
  })
})
