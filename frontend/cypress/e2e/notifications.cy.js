describe('Notification System', () => {
  beforeEach(() => {
    // Log in as a user before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('UserPassword123!');
    cy.get('button[type="submit"]').click();

    // Redirect to the notifications page
    cy.url().should('include', '/notifications');
  });

  it('should allow a user to create a new notification', () => {
    cy.visit('/notifications/create');

    // Fill out the notification creation form
    cy.get('input[name="title"]').type('Upcoming Event Reminder');
    cy.get('textarea[name="message"]').type(
      "Don't forget about the tree planting event this weekend!"
    );
    cy.get('button').contains('Send Notification').click();

    // Assert that the notification was created successfully
    cy.contains('Notification sent successfully').should('be.visible');

    // Verify that the notification appears in the list
    cy.visit('/notifications');
    cy.contains('Upcoming Event Reminder').should('be.visible');
    cy.contains(
      "Don't forget about the tree planting event this weekend!"
    ).should('be.visible');
  });

  it('should display a list of notifications for the user', () => {
    // Seed some notifications
    cy.request('POST', '/api/notifications', {
      id: 1,
      userId: 1,
      title: 'Event Update',
      message: 'The event location has been changed.',
      date: '2024-08-25T10:00:00Z',
    });

    cy.request('POST', '/api/notifications', {
      id: 2,
      userId: 1,
      title: 'New Reward Available',
      message: 'Check out the new rewards in your rewards section.',
      date: '2024-08-26T10:00:00Z',
    });

    // Visit notifications page
    cy.visit('/notifications');

    // Assert that the notifications are visible
    cy.contains('Event Update').should('be.visible');
    cy.contains('The event location has been changed.').should('be.visible');
    cy.contains('New Reward Available').should('be.visible');
    cy.contains('Check out the new rewards in your rewards section.').should(
      'be.visible'
    );
  });

  it('should allow a user to mark a notification as read', () => {
    // Seed a notification
    cy.request('POST', '/api/notifications', {
      id: 3,
      userId: 1,
      title: 'Important Update',
      message: 'There is an important update for you to review.',
      date: '2024-08-27T10:00:00Z',
      read: false,
    });

    cy.visit('/notifications');

    // Mark the notification as read
    cy.contains('Important Update').click();
    cy.get('button').contains('Mark as Read').click();

    // Assert that the notification is marked as read
    cy.contains('Notification marked as read').should('be.visible');

    // Verify that the notification status is updated
    cy.request('GET', '/api/notifications/3').then((response) => {
      expect(response.body.read).to.be.true;
    });
  });

  it('should allow a user to delete a notification', () => {
    // Seed a notification
    cy.request('POST', '/api/notifications', {
      id: 4,
      userId: 1,
      title: 'Event Canceled',
      message: 'The event has been canceled.',
      date: '2024-08-28T10:00:00Z',
    });

    cy.visit('/notifications');

    // Delete the notification
    cy.contains('Event Canceled').click();
    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Confirm').click();

    // Assert that the notification was deleted successfully
    cy.contains('Notification deleted successfully').should('be.visible');

    // Verify that the notification is no longer listed
    cy.contains('Event Canceled').should('not.exist');
  });

  it('should prevent unauthorized users from creating or viewing notifications', () => {
    // Log out and attempt to access notifications page
    cy.visit('/logout');
    cy.visit('/notifications');

    // Assert that access is denied for unauthorized users
    cy.contains('You must be logged in to view notifications').should(
      'be.visible'
    );
  });
});
