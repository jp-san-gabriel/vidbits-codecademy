const {assert} = require('chai');
const {buildVideoObject} = require('../test-utilities');

describe('User visits "Save Video" page', () => {
  describe('posts a new item', () => {

    it('to path "/videos"', () => {
      // Exercise
      browser.url('/videos/create.html');

      // Verify
      assert.equal(browser.getAttribute('body form', 'method'), 'post');
      assert.include(browser.getAttribute('body form', 'action'), '/videos');
    });

    it('and is rendered', () => {
      // Setup
      const videoToSave = buildVideoObject();
      
      // Exercise
      browser.url('/videos/create.html');
      browser.setValue('#title-input', videoToSave.title);
      browser.setValue('#description-input', videoToSave.description);
      browser.setValue('#videoUrl-input', videoToSave.videoUrl);
      browser.click('#submit-button');

      // Verify
      assert.include(browser.getText('body'), videoToSave.title);
      assert.include(browser.getText('body'), videoToSave.description);
    });
  });
});
