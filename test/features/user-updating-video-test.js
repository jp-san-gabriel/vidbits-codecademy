const {assert} = require('chai');
const {buildVideoObject} = require('../test-utilities');

const generateRandomUrl = (domain) => {
    return `http://${domain}/${Math.random()}`;
};

// This function prevents runtime error in case value is undefined
const setElementValue = (selector, value) => {
    if(value) {
      browser.setValue(selector, value);
    }
};

const submitVideo = (video) => {
  browser.url('/videos/create.html');
  setElementValue('#title-input', video.title);
  setElementValue('#description-input', video.description);
  setElementValue('#videoUrl-input', video.videoUrl);
  browser.click('#submit-button');
};

describe('User visits "Update video" page', () => {
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
