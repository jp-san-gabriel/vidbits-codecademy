const {assert} = require('chai');
const {buildVideoObject} = require('../test-utilities');

describe('User deleting video', () => {

  it('removes the Video from the list', () => {
    // Setup - submit a video
    const videoToSave = buildVideoObject();
    
    browser.url('/videos/create.html');
    browser.setValue('#title-input', videoToSave.title);
    browser.setValue('#description-input', videoToSave.description);
    browser.setValue('#videoUrl-input', videoToSave.videoUrl);
    browser.click('#submit-button');

    // Exercise - click the delete button from the video's show page
    browser.click('#delete');

    // Verify - go back to landing page and assert that video is not in the list
    browser.url('/');
    assert.notInclude(browser.getText('body'), videoToSave.title, 'Video is still in the list');
  });
});
