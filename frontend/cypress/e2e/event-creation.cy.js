describe('Event Creation Flow for Organizers', () => {
  beforeEach(() => {
    // Visit the app's event creation page and login as an organizer before each test
    cy.visit('/login');

    // Assuming a login process for an organizer
    cy.get('input[name="email"]').type('organizer@example.com');
    cy.get('input[name="password"]').type('OrganizerPassword123!');
    cy.get('button[type="submit"]').click();

    cy.visit('/events/create');

    // Redirect to the event creation page after login
    cy.url().should('include', '/events/create');
  });

  it('should allow an organizer to create an event successfully', () => {
    // Fill out the event creation form
    cy.get('input[name="eventName"]').type('Community Tree Planting');
    cy.get('input[name="eventDate"]').type('2024-09-15');
    cy.get('input[name="eventTime"]').type('10:00');
    cy.get('input[name="eventLocation"]').type('Central Park');
    cy.get('textarea[name="eventDescription"]').type(
      'Join us for a tree planting event in Central Park.'
    );
    cy.get('input[name="maxParticipants"]').type('100');

    // Submit the event creation form
    cy.get('button[type="submit"]').click();

    // Assert that the event was successfully created and the user is redirected to the event detail page
    cy.url().should('include', '/events');
    cy.contains('Community Tree Planting').should('be.visible'); // Event title should be visible on the events page
    cy.contains('Event created successfully').should('be.visible'); // Confirmation message
  });

  it('should display validation errors for missing required fields', () => {
    // Try to submit the form without filling out the required fields
    cy.get('button[type="submit"]').click();

    // Assert validation errors are shown for each required field
    cy.contains('Event name is required').should('be.visible');
    cy.contains('Event date is required').should('be.visible');
    cy.contains('Event time is required').should('be.visible');
    cy.contains('Event location is required').should('be.visible');
    cy.contains('Event description is required').should('be.visible');
    cy.contains('Max participants is required').should('be.visible');
  });

  it('should show an error when trying to create an event with a past date', () => {
    // Fill out the form with a past event date
    cy.get('input[name="eventName"]').type('Community Tree Planting');
    cy.get('input[name="eventDate"]').type('2023-01-01'); // A past date
    cy.get('input[name="eventTime"]').type('10:00');
    cy.get('input[name="eventLocation"]').type('Central Park');
    cy.get('textarea[name="eventDescription"]').type(
      'Join us for a tree planting event in Central Park.'
    );
    cy.get('input[name="maxParticipants"]').type('100');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert an error message is shown for the past date
    cy.contains('Event date cannot be in the past').should('be.visible');
  });

  it('should allow organizers to cancel event creation', () => {
    // Fill out some of the form
    cy.get('input[name="eventName"]').type('Community Tree Planting');

    // Click the cancel button
    cy.get('button[type="button"]').contains('Cancel').click();

    // Assert the user is redirected back to the events list page without saving the event
    cy.url().should('include', '/events');
    cy.contains('Community Tree Planting').should('not.exist'); // The event should not exist
  });
});
