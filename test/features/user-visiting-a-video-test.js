const {assert} = require('chai');
const {buildVideoObject, submitVideo, login, logout} = require('../test-utilities');

describe('User visits a video', () => {
  it('can post a comment', () => {
    // Setup
    const videoToSave = buildVideoObject();
    login();
    submitVideo(videoToSave);
    logout();

    const comment = {
      commenter: 'JP SAN GABRIEL',
      comment: 'This is a test comment'
    };

    // Exercise
    browser.url('/');
    browser.click(`a=${videoToSave.title}`); // Click the video title on the page
    browser.setValue('form input[name="commenter"]', comment.commenter);
    browser.setValue('form textarea[name="comment"]', comment.comment);
    browser.click('#post-comment');

    // Verify
    assert.include(browser.getText('body'), comment.commenter);
    assert.include(browser.getText('body'), comment.comment);
  });
});
