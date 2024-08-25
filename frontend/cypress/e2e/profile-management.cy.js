describe('Profile Management', () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('UserPassword123!');
    cy.get('button[type="submit"]').click();

    // Redirect to the profile page
    cy.url().should('include', '/profile');
  });

  it('should allow a user to view their profile', () => {
    cy.visit('/profile');

    // Assert that the profile details are visible
    cy.get('h1').contains('User Profile').should('be.visible');
    cy.get('input[name="name"]').should('have.value', 'John Doe');
    cy.get('input[name="email"]').should('have.value', 'user@example.com');
    cy.get('input[name="phone"]').should('have.value', '123-456-7890');
  });

  it('should allow a user to update their profile information', () => {
    cy.visit('/profile/edit');

    // Update profile information
    cy.get('input[name="name"]').clear().type('Jane Doe');
    cy.get('input[name="phone"]').clear().type('987-654-3210');
    cy.get('button').contains('Save Changes').click();

    // Assert that the update was successful
    cy.contains('Profile updated successfully').should('be.visible');

    // Verify that the updated information is reflected
    cy.visit('/profile');
    cy.get('input[name="name"]').should('have.value', 'Jane Doe');
    cy.get('input[name="phone"]').should('have.value', '987-654-3210');
  });

  it('should allow a user to change their password', () => {
    cy.visit('/profile/change-password');

    // Change the password
    cy.get('input[name="currentPassword"]').type('UserPassword123!');
    cy.get('input[name="newPassword"]').type('NewPassword123!');
    cy.get('input[name="confirmPassword"]').type('NewPassword123!');
    cy.get('button').contains('Change Password').click();

    // Assert that the password change was successful
    cy.contains('Password changed successfully').should('be.visible');

    // Log out and log in with the new password
    cy.visit('/logout');
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('NewPassword123!');
    cy.get('button[type="submit"]').click();

    // Assert that login with the new password was successful
    cy.url().should('include', '/profile');
  });

  it('should display an error when updating profile information with invalid data', () => {
    cy.visit('/profile/edit');

    // Attempt to update with invalid phone number
    cy.get('input[name="phone"]').clear().type('invalid-phone');
    cy.get('button').contains('Save Changes').click();

    // Assert that an error message is shown
    cy.contains('Invalid phone number').should('be.visible');
  });

  it('should display an error when changing password with incorrect current password', () => {
    cy.visit('/profile/change-password');

    // Attempt to change the password with an incorrect current password
    cy.get('input[name="currentPassword"]').type('WrongCurrentPassword!');
    cy.get('input[name="newPassword"]').type('NewPassword123!');
    cy.get('input[name="confirmPassword"]').type('NewPassword123!');
    cy.get('button').contains('Change Password').click();

    // Assert that an error message is shown
    cy.contains('Current password is incorrect').should('be.visible');
  });
});
