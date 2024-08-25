describe('Rewards System', () => {
  beforeEach(() => {
    // Seed the database with events and rewards
    cy.request('POST', '/api/events', {
      id: 1,
      name: 'Tree Planting Event',
      date: '2024-09-15',
      time: '10:00',
      location: 'Central Park',
      description: 'A tree planting event!',
      maxParticipants: 100,
      currentParticipants: 50,
      rewardPoints: 10, // Event gives 10 points
    });

    cy.request('POST', '/api/rewards', {
      id: 1,
      name: 'T-shirt',
      pointsRequired: 50,
      available: true,
    });

    cy.request('POST', '/api/rewards', {
      id: 2,
      name: 'Water Bottle',
      pointsRequired: 30,
      available: true,
    });

    // Log in as a participant before each test
    cy.visit('/login');
    cy.get('input[name="email"]').type('participant@example.com');
    cy.get('input[name="password"]').type('ParticipantPassword123!');
    cy.get('button[type="submit"]').click();

    cy.visit('/rewards');

    // Redirect to the rewards page
    cy.url().should('include', '/rewards');
  });

  it('should display available rewards to the participant', () => {
    // Check if the rewards are visible on the page
    cy.contains('T-shirt').should('be.visible');
    cy.contains('Water Bottle').should('be.visible');
  });

  it('should allow a participant to earn reward points after attending an event', () => {
    // Register and attend an event to earn points
    cy.visit('/events');
    cy.contains('Tree Planting Event').click();
    cy.get('button').contains('Register').click();

    // Simulate the completion of the event and point earning
    cy.request('PATCH', '/api/events/1/complete', { userId: 1 });

    // Check if the points have been updated
    cy.request('GET', '/api/users/1').then((response) => {
      expect(response.body.rewardPoints).to.equal(10); // User earns 10 points
    });
  });

  it('should allow a participant to redeem a reward if they have enough points', () => {
    // Manually update user points for the test
    cy.request('PATCH', '/api/users/1', { rewardPoints: 50 });

    // Visit the rewards page and redeem a reward
    cy.visit('/rewards');
    cy.contains('T-shirt').click();
    cy.get('button').contains('Redeem').click();

    // Assert that the reward was successfully redeemed
    cy.contains('You have successfully redeemed the T-shirt').should(
      'be.visible'
    );

    // Verify that points have been deducted
    cy.request('GET', '/api/users/1').then((response) => {
      expect(response.body.rewardPoints).to.equal(0); // Points deducted after redemption
    });
  });

  it('should prevent a participant from redeeming a reward if they don’t have enough points', () => {
    // Visit the rewards page with insufficient points
    cy.request('PATCH', '/api/users/1', { rewardPoints: 20 });
    cy.visit('/rewards');

    // Try to redeem a reward that requires more points than available
    cy.contains('T-shirt').click();
    cy.get('button').contains('Redeem').click();

    // Assert that an error message is displayed
    cy.contains('You do not have enough points to redeem this reward').should(
      'be.visible'
    );
  });

  it('should display a message when no rewards are available', () => {
    // Simulate no rewards being available
    cy.request('PATCH', '/api/rewards/1', { available: false });
    cy.request('PATCH', '/api/rewards/2', { available: false });

    // Visit the rewards page
    cy.visit('/rewards');

    // Assert that a no rewards message is displayed
    cy.contains('No rewards available at the moment').should('be.visible');
  });
});
