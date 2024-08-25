describe('Event Management', () => {
  beforeEach(() => {
    // Log in as an organizer before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('organizer@example.com');
    cy.get('input[name="password"]').type('OrganizerPassword123!');
    cy.get('button[type="submit"]').click();

    // Redirect to the event management page
    cy.url().should('include', '/events/manage');
  });

  it('should allow an organizer to create a new event', () => {
    cy.visit('/events/manage/create');

    // Fill out event creation form
    cy.get('input[name="name"]').type('Community Tree Planting');
    cy.get('input[name="date"]').type('2024-09-15');
    cy.get('input[name="time"]').type('10:00');
    cy.get('input[name="location"]').type('Central Park');
    cy.get('textarea[name="description"]').type(
      'A community event for planting trees in the park.'
    );
    cy.get('input[name="maxParticipants"]').type('100');
    cy.get('button').contains('Create Event').click();

    // Assert that the event was created successfully
    cy.contains('Event created successfully').should('be.visible');

    // Verify that the new event is listed in the events management
    cy.contains('Community Tree Planting').should('be.visible');
  });

  it('should allow an organizer to update an existing event', () => {
    // Assume an event with id=1 exists
    cy.request('POST', '/api/events', {
      id: 1,
      name: 'Original Event',
      date: '2024-09-10',
      time: '08:00',
      location: 'Old Park',
      description: 'Initial description.',
      maxParticipants: 50,
    });

    cy.visit('/events/manage');
    cy.contains('Original Event').click();

    // Click edit button
    cy.get('button').contains('Edit Event').click();

    // Update event details
    cy.get('input[name="name"]').clear().type('Updated Event');
    cy.get('input[name="date"]').clear().type('2024-09-20');
    cy.get('input[name="time"]').clear().type('11:00');
    cy.get('input[name="location"]').clear().type('New Park');
    cy.get('textarea[name="description"]')
      .clear()
      .type('Updated event description.');
    cy.get('input[name="maxParticipants"]').clear().type('75');
    cy.get('button').contains('Update Event').click();

    // Assert that the event was updated successfully
    cy.contains('Event updated successfully').should('be.visible');

    // Verify that the event details are updated
    cy.contains('Updated Event').should('be.visible');
  });

  it('should allow an organizer to delete an existing event', () => {
    // Assume an event with id=2 exists
    cy.request('POST', '/api/events', {
      id: 2,
      name: 'Event to Delete',
      date: '2024-09-11',
      time: '09:00',
      location: 'Temporary Park',
      description: 'This event will be deleted.',
      maxParticipants: 30,
    });

    cy.visit('/events/manage');
    cy.contains('Event to Delete').click();

    // Click delete button
    cy.get('button').contains('Delete Event').click();

    // Confirm deletion
    cy.get('button').contains('Confirm').click();

    // Assert that the event was deleted successfully
    cy.contains('Event deleted successfully').should('be.visible');

    // Verify that the event is no longer listed
    cy.contains('Event to Delete').should('not.exist');
  });

  it('should allow an organizer to search for events', () => {
    // Seed some events
    cy.request('POST', '/api/events', {
      id: 3,
      name: 'Searchable Event One',
      date: '2024-09-12',
      time: '10:00',
      location: 'Search Park',
      description: 'Searchable event description.',
      maxParticipants: 20,
    });

    cy.request('POST', '/api/events', {
      id: 4,
      name: 'Searchable Event Two',
      date: '2024-09-13',
      time: '11:00',
      location: 'Search Park',
      description: 'Another searchable event.',
      maxParticipants: 25,
    });

    cy.visit('/events/manage');

    // Perform a search
    cy.get('input[name="search"]').type('Searchable Event One');
    cy.get('button').contains('Search').click();

    // Assert that the correct event is displayed
    cy.contains('Searchable Event One').should('be.visible');
    cy.contains('Searchable Event Two').should('not.exist');
  });
});
