describe('Search and Filter Functionality', () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('UserPassword123!');
    cy.get('button[type="submit"]').click();

    // Navigate to the page with search and filter functionality
    cy.url().should('include', '/search-filter');
  });

  it('should display search results based on user query', () => {
    cy.visit('/search-filter');

    // Enter a search query
    cy.get('input[name="search"]').type('Tree Planting Event');
    cy.get('button').contains('Search').click();

    // Assert that search results are displayed
    cy.contains('Tree Planting Event').should('be.visible');
    cy.contains('No results found').should('not.exist');
  });

  it('should show no results for a search query with no matching data', () => {
    cy.visit('/search-filter');

    // Enter a search query with no results
    cy.get('input[name="search"]').type('Nonexistent Event');
    cy.get('button').contains('Search').click();

    // Assert that no results are displayed
    cy.contains('No results found').should('be.visible');
  });

  it('should filter results based on selected criteria', () => {
    cy.visit('/search-filter');

    // Select a filter criterion
    cy.get('select[name="category"]').select('Upcoming Events');
    cy.get('button').contains('Apply Filter').click();

    // Assert that filtered results are displayed
    cy.contains('Upcoming Events').should('be.visible');
    cy.contains('Past Events').should('not.exist');
  });

  it('should clear search and filter criteria and display all results', () => {
    cy.visit('/search-filter');

    // Apply search and filter criteria
    cy.get('input[name="search"]').type('Tree Planting Event');
    cy.get('select[name="category"]').select('Upcoming Events');
    cy.get('button').contains('Search').click();
    cy.get('button').contains('Apply Filter').click();

    // Clear search and filter criteria
    cy.get('button').contains('Clear').click();

    // Assert that all results are displayed
    cy.contains('Tree Planting Event').should('be.visible');
    cy.contains('Past Events').should('be.visible');
  });

  it('should handle search and filter together', () => {
    cy.visit('/search-filter');

    // Enter a search query and apply filter
    cy.get('input[name="search"]').type('Tree');
    cy.get('select[name="category"]').select('Upcoming Events');
    cy.get('button').contains('Search').click();
    cy.get('button').contains('Apply Filter').click();

    // Assert that results match both search query and filter criteria
    cy.contains('Tree Planting Event').should('be.visible');
    cy.contains('Past Tree Planting Event').should('not.exist');
    cy.contains('Past Events').should('not.exist');
  });

  it('should display error message for invalid filter selection', () => {
    cy.visit('/search-filter');

    // Select an invalid filter criterion
    cy.get('select[name="category"]').select('Invalid Category');
    cy.get('button').contains('Apply Filter').click();

    // Assert that an error message is displayed
    cy.contains('Invalid filter selection').should('be.visible');
  });
});
