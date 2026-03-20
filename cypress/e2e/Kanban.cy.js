describe("Kanban Board E2E", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("add and delete column", () => {
    cy.get('[data-testid="add-column-field"]').find('add-field-enter-area').type("New Column");
    cy.get('[data-testid="add-column-field"]').find('button').click();
    cy.contains("New Column").should("exist");

    cy.contains("New Column")
      .parents('[data-testid="column"]')
      .find('[data-testid="delete-column-button"]')
      .click();
    cy.contains("New Column").should("not.exist");
  });

  it("add and delete task in a column", () => {
    cy.get('[data-testid="add-column-field"]').find('add-field-enter-area').type("Test Default Column");
    cy.get('[data-testid="add-column-field"]').find('button').click();

    cy.contains("Test Default Column")
      .parents('[data-testid="column"]')
      .within(() => {
        cy.get('[data-testid="add-task-field"]').find('add-field-enter-area').type("New Task");
        cy.get('[data-testid="add-task-field"]').find('button').click();
        cy.contains("New Task").should("exist");

        cy.contains("New Task")
          .parents('[data-testid="card"]')
          .find('[data-testid="delete-task-button"]')
          .click();
        cy.contains("New Task").should("not.exist");
      });
  });

  it("preserves columns and tasks after reload", () => {
    cy.get('[data-testid="add-column-field"]').find('add-field-enter-area').type("Test Default Column");
    cy.get('[data-testid="add-column-field"]').find('button').click();
    
    cy.contains("Test Default Column")
      .parents('[data-testid="column"]')
      .within(() => {
        cy.get('[data-testid="add-task-field"]').find('add-field-enter-area').type("Persistent Task");
        cy.get('[data-testid="add-task-field"]').find('button').click();
      });

    cy.reload();
    cy.contains("Test Default Column").should("exist");
    cy.contains("Persistent Task").should("exist");
  });
});
