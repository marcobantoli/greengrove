describe('Event Registration Flow for Participants', () => {
  beforeEach(() => {
    // Stub events response
    cy.intercept('GET', '/api/events', [
      {
        id: 1,
        name: 'Not Full Event',
        date: '2024-09-15',
        time: '10:00',
        location: 'Central Park',
        description: 'A great tree planting event!',
        maxParticipants: 100,
        currentParticipants: 50,
      },
      {
        id: 2,
        name: 'Full Event',
        date: '2024-09-16',
        time: '12:00',
        location: 'Riverside Park',
        description: 'This event is full.',
        maxParticipants: 100,
        currentParticipants: 100,
      },
    ]).as('getEvents');

    // Visit the login page and log in as a participant before each test
    cy.visit('/login');

    // Assuming a login process for a participant
    cy.get('input[name="email"]').type('participant@example.com');
    cy.get('input[name="password"]').type('ParticipantPassword123!');
    cy.get('button[type="submit"]').click();

    cy.visit('/events');

    // Redirect to the events page after login
    cy.url().should('include', '/events');
  });

  it('should allow a participant to register for an event successfully', () => {
    // Find an available event and click on the registration button
    cy.contains('Community Tree Planting').click(); // Select the event from the list
    cy.get('button').contains('Register').click(); // Click the Register button

    // Assert that the registration was successful and a confirmation message is shown
    cy.contains('You have successfully registered for the event').should(
      'be.visible'
    );
  });

  it('should display an error if the event is full', () => {
    // Simulate an event that is already full
    cy.contains('Full Event').click(); // Click on a full event
    cy.get('button').contains('Register').click(); // Try to register for a full event

    // Assert that an error message is displayed
    cy.contains('This event is full').should('be.visible');
  });

  it('should not allow multiple registrations for the same event', () => {
    // Register for an event
    cy.contains('Community Tree Planting').click();
    cy.get('button').contains('Register').click();

    // Try to register for the same event again
    cy.get('button').contains('Register').click();

    // Assert that a message is shown saying the user is already registered
    cy.contains('You are already registered for this event').should(
      'be.visible'
    );
  });

  it('should allow a participant to cancel their event registration', () => {
    // Register for an event
    cy.contains('Community Tree Planting').click();
    cy.get('button').contains('Register').click();

    // Now, cancel the registration
    cy.get('button').contains('Cancel Registration').click();

    // Assert that the registration was successfully canceled
    cy.contains('Your registration has been canceled').should('be.visible');
  });

  it('should display upcoming events and allow filtering based on criteria', () => {
    // Filter events by date
    cy.get('input[name="filterDate"]').type('2024-09-15');
    cy.get('button').contains('Filter').click();

    // Assert that only events matching the filter criteria are shown
    cy.contains('Community Tree Planting').should('be.visible');
    cy.contains('Past Event').should('not.exist'); // Ensure past events are not shown
  });
});
