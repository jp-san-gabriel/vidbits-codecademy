const {assert} = require('chai');
const {buildVideoObject, submitVideo, login, logout} = require('../test-utilities');

describe('User visits landing page', () => {
  describe('without existing videos', () => {
    it('starts blank', () => {
      // Exercise
      browser.url('/');

      // Verify
      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('with existing videos', () => {
    beforeEach(login);
    afterEach(logout);

    it('renders it in the list', () => {
      // Setup - save a video
      const videoToSave = buildVideoObject();

      submitVideo(videoToSave);

      // Exercise
      browser.url('/');

      // Verify
      assert.equal(browser.getAttribute('iframe', 'src'), videoToSave.videoUrl);
    });

    it('can navigate to a video', () => {
      // Setup - save a video
      const videoToSave = buildVideoObject();

      submitVideo(videoToSave);

      // Exercise
      browser.url('/');
      browser.click(`a=${videoToSave.title}`);

      // Verify - check that we are on the video's show page: the body must contain the title
      assert.include(browser.getText('body'), videoToSave.title);
    });
  });

  describe('can navigate', () => {
    beforeEach(login);
    afterEach(logout);
    
    it('to save video page', () => {
      // Setup
      browser.url('/');

      //Exercise
      browser.click('a[href="/videos/create.html"]');

      // Verify
      assert.include(browser.getText('body'), "Save a video");
    });
  });

  describe('when user is not logged in', () => {
    it('can navigate to login page', () => {
      // Setup
      browser.url('/');

      // Exercise
      browser.click('a[href="/login"]');

      // Verify
      assert.include(browser.getText('body'), 'Log in');
    });
  });
});
