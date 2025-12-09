describe("Homepage UI", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the CyberGuard title", () => {
    cy.contains("CyberGuard").should("exist");
  });

  it("shows the Get Started button", () => {
    cy.contains("Get Started").should("exist");
  });

  it("navigates to /quizhome when Get Started is clicked", () => {
    cy.contains("Get Started").click();
    cy.url().should("include", "/quizhome");
  });
});
