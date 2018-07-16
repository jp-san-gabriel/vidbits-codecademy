const {assert} = require('chai');
const {buildVideoObject, submitVideo, login, logout} = require('../test-utilities');

describe('User visits "Save Video" page', () => {
  beforeEach(login);
  afterEach(logout);

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
      submitVideo(videoToSave);

      // Verify
      assert.include(browser.getText('body'), videoToSave.title);
      assert.include(browser.getText('body'), videoToSave.description);
    });
  });
});
