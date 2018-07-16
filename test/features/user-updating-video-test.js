const {assert} = require('chai');
const {buildVideoObject, submitVideo, login, logout} = require('../test-utilities');

describe('User visits "Update video" page', () => {
  beforeEach(login);
  afterEach(logout);
  
  it('changes the values', () => {
    // Setup
    const videoToUpdate = buildVideoObject();
    const newTitle = 'New title';

    submitVideo(videoToUpdate);

    // Exercise
    browser.click('#edit');
    browser.setValue('#title-input', newTitle);
    browser.click('#submit-button');

    // Verify
    assert.include(browser.getText('body'), newTitle);
  });

  it('does not create an additional video', () => {
    // Setup
    const videoToUpdate = buildVideoObject();
    const newTitle = 'New title';

    submitVideo(videoToUpdate);

    // Exercise
    browser.click('#edit');
    browser.setValue('#title-input', newTitle);
    browser.click('#submit-button');
    browser.url('/'); //go back to landing page

    // Verify
    assert.notInclude(browser.getText('body'), videoToUpdate.title);
  });
});
