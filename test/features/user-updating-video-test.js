const {assert} = require('chai');

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
    const videoToUpdate = {
      title: 'Sample Video',
      description: 'description',
      videoUrl: generateRandomUrl('youtube.com/embed')
    };
    const newTitle = 'New title';

    submitVideo(videoToUpdate);

    // Exercise
    browser.click('#edit');
    browser.setValue('#title-input', newTitle);
    browser.click('#submit-button');

    // Verify
    assert.include(browser.getText('body'), newTitle);
  });
});
