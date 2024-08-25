describe('Feedback System', () => {
  beforeEach(() => {
    // Seed the database with events and feedback
    cy.request('POST', '/api/events', {
      id: 1,
      name: 'Tree Planting Event',
      date: '2024-09-15',
      time: '10:00',
      location: 'Central Park',
      description: 'A great tree planting event!',
      maxParticipants: 100,
      currentParticipants: 50,
    });

    cy.request('POST', '/api/feedback', {
      id: 1,
      eventId: 1,
      userId: 1,
      feedbackText: 'Great event, very well organized!',
      rating: 5,
    });

    // Log in as a participant before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('participant@example.com');
    cy.get('input[name="password"]').type('ParticipantPassword123!');
    cy.get('button[type="submit"]').click();

    cy.visit('/feedback');

    // Redirect to the feedback page
    cy.url().should('include', '/feedback');
  });

  it('should allow a participant to submit feedback for an event', () => {
    // Visit the feedback page and submit feedback
    cy.visit('/events/1/feedback');
    cy.get('textarea[name="feedbackText"]').type(
      'Amazing event, would recommend!'
    );
    cy.get('select[name="rating"]').select('5');
    cy.get('button').contains('Submit Feedback').click();

    // Assert that the feedback submission is successful
    cy.contains('Thank you for your feedback').should('be.visible');

    // Verify that the feedback is saved in the database
    cy.request('GET', '/api/feedback').then((response) => {
      expect(response.body).to.have.length(2); // Includes the newly submitted feedback
    });
  });

  it('should display existing feedback for an event', () => {
    // Visit the feedback page for the event
    cy.visit('/events/1/feedback');

    // Assert that existing feedback is visible
    cy.contains('Great event, very well organized!').should('be.visible');
    cy.contains('Rating: 5').should('be.visible');
  });

  it('should handle feedback with no text or rating', () => {
    // Visit the feedback page and attempt to submit feedback with missing fields
    cy.visit('/events/1/feedback');
    cy.get('button').contains('Submit Feedback').click();

    // Assert that an error message is shown
    cy.contains('Feedback text and rating are required').should('be.visible');
  });

  it('should allow a participant to update their feedback', () => {
    // Update existing feedback
    cy.visit('/events/1/feedback');
    cy.get('textarea[name="feedbackText"]')
      .clear()
      .type('Updated feedback text.');
    cy.get('select[name="rating"]').select('4');
    cy.get('button').contains('Update Feedback').click();

    // Assert that the feedback update is successful
    cy.contains('Your feedback has been updated').should('be.visible');

    // Verify that the feedback is updated in the database
    cy.request('GET', '/api/feedback/1').then((response) => {
      expect(response.body.feedbackText).to.equal('Updated feedback text.');
      expect(response.body.rating).to.equal(4);
    });
  });

  it('should allow a participant to delete their feedback', () => {
    // Delete existing feedback
    cy.visit('/events/1/feedback');
    cy.get('button').contains('Delete Feedback').click();

    // Assert that the feedback deletion is successful
    cy.contains('Your feedback has been deleted').should('be.visible');

    // Verify that the feedback is deleted from the database
    cy.request('GET', '/api/feedback').then((response) => {
      expect(response.body).to.have.length(1); // Assuming only one feedback exists now
    });
  });

  it('should prevent unauthorized users from submitting or viewing feedback', () => {
    // Log out and attempt to submit feedback
    cy.visit('/logout');
    cy.visit('/events/1/feedback');

    // Assert that an error message is shown for unauthorized access
    cy.contains('You must be logged in to submit feedback').should(
      'be.visible'
    );
  });
});
