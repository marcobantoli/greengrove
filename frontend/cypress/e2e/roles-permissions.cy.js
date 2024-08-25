describe('Roles and Permissions', () => {
  beforeEach(() => {
    // Log in as an admin before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('AdminPassword123!');
    cy.get('button[type="submit"]').click();

    // Redirect to the roles and permissions management page
    cy.url().should('include', '/roles-permissions');
  });

  it('should allow an admin to view all roles and permissions', () => {
    cy.visit('/roles-permissions');

    // Assert that roles and permissions are listed
    cy.contains('Roles').should('be.visible');
    cy.contains('Permissions').should('be.visible');

    // Verify that specific roles are present
    cy.contains('Admin').should('be.visible');
    cy.contains('Organizer').should('be.visible');
    cy.contains('Participant').should('be.visible');

    // Verify that permissions are visible
    cy.contains('Create Event').should('be.visible');
    cy.contains('Manage Users').should('be.visible');
    cy.contains('View Notifications').should('be.visible');
  });

  it('should allow an admin to assign roles to a user', () => {
    cy.visit('/users');
    cy.contains('User List').should('be.visible');

    // Select a user and assign a role
    cy.get('table')
      .contains('tr', 'user@example.com')
      .find('button')
      .contains('Edit')
      .click();
    cy.get('select[name="role"]').select('Organizer');
    cy.get('button').contains('Save Changes').click();

    // Assert that the role was assigned successfully
    cy.contains('User role updated successfully').should('be.visible');

    // Verify the role is correctly assigned
    cy.visit('/users');
    cy.get('table')
      .contains('tr', 'user@example.com')
      .should('contain', 'Organizer');
  });

  it('should verify that permissions are correctly applied based on user roles', () => {
    // Log in as a user with limited permissions
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('UserPassword123!');
    cy.get('button[type="submit"]').click();

    // Verify that the user can only access permitted actions
    cy.visit('/events');
    cy.contains('Create Event').should('not.exist'); // Should not have access to create events
    cy.contains('View Events').should('be.visible'); // Should be able to view events

    // Log out and log in as an organizer
    cy.visit('/logout');
    cy.visit('/login');
    cy.get('input[name="email"]').type('organizer@example.com');
    cy.get('input[name="password"]').type('OrganizerPassword123!');
    cy.get('button[type="submit"]').click();

    // Verify that the organizer has access to more actions
    cy.visit('/events');
    cy.contains('Create Event').should('be.visible'); // Should have access to create events
    cy.contains('View Events').should('be.visible'); // Should be able to view events
  });

  it('should restrict unauthorized users from accessing restricted pages', () => {
    // Log in as a user with limited permissions
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('UserPassword123!');
    cy.get('button[type="submit"]').click();

    // Attempt to access a restricted page
    cy.visit('/admin/dashboard');

    // Assert that access is denied
    cy.contains('Access Denied').should('be.visible');
  });

  it('should allow an admin to manage user permissions', () => {
    cy.visit('/permissions');

    // Assign permissions to a user
    cy.contains('Manage Permissions').click();
    cy.get('select[name="user"]').select('user@example.com');
    cy.get('select[name="permission"]').select('Create Event');
    cy.get('button').contains('Add Permission').click();

    // Assert that the permission was added successfully
    cy.contains('Permission added successfully').should('be.visible');

    // Verify that the user has the new permission
    cy.visit('/users');
    cy.get('table').contains('tr', 'user@example.com').click();
    cy.contains('Create Event').should('be.visible');
  });
});
