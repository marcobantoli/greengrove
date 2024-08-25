describe('User Registration and Login', () => {
  beforeEach(() => {
    // Visit the app's registration page before each test
    cy.visit('/register'); // Adjust the URL as per your routing
  });

  it('should allow a user to register successfully', () => {
    // Fill out the registration form
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('select[name="role"]').select('Individual'); // Assuming a dropdown for user role

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Assert the user is redirected to the login page or dashboard after successful registration
    cy.url().should('include', '/login'); // Adjust if the user is redirected elsewhere
    cy.contains('Registration successful, please log in'); // Check for confirmation message
  });

  it('should show an error for duplicate email registration', () => {
    // Fill out the registration form with an existing email
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('select[name="role"]').select('Participant');

    // Submit the registration form
    cy.get('button[type="submit"]').click();

    // Assert the error message for duplicate email
    cy.contains('This email is already registered'); // Adjust based on your error message
  });

  it('should allow a user to log in successfully after registration', () => {
    // Go to login page
    cy.visit('/login'); // Adjust the URL as per your routing

    // Fill out the login form
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('Password123!');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Assert the user is redirected to the dashboard or homepage after successful login
    cy.url().should('include', '/dashboard'); // Adjust as per your routing
    cy.contains('Welcome, John'); // Ensure personalized welcome message appears
  });

  it('should show an error for incorrect login credentials', () => {
    // Go to login page
    cy.visit('/login');

    // Fill out the login form with incorrect credentials
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('WrongPassword!');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Assert the error message for incorrect login
    cy.contains('Invalid email or password'); // Adjust based on your error message
  });

  it('should validate required fields on the registration form', () => {
    // Leave the registration form empty and submit
    cy.get('button[type="submit"]').click();

    // Assert that validation errors appear
    cy.contains('First name is required');
    cy.contains('Last name is required');
    cy.contains('Email is required');
    cy.contains('Password is required');
  });
});
