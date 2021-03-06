const {assert} = require('chai');
const {getValidCredentials} = require('../test-utilities');

describe('User logs in', () => {
  it('and can\'t log in again', () => {
    // Setup
    const credentials = getValidCredentials();

    // Exercise
    browser.url('/login');
    browser.setValue('form input[name="user"]', credentials.user);
    browser.setValue('form input[name="password"]', credentials.password);
    browser.click('#log-in');

    // Verify - that the page does not include the 'Log in' link
    assert.notInclude(browser.getText('body'), 'Log in');
  });
});
