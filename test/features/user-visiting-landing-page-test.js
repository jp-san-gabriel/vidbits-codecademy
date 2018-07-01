const {assert} = require('chai');

describe('User visits landing page', () => {
  describe('without existing videos', () => {
    it('starts blank', () => {
      // Exercise
      browser.url('/');

      // Verify
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
  describe('can navigate', () => {
    it('to save video page', () => {
      // Setup
      browser.url('/');

      //Exercise
      browser.click('a[href="/videos/create.html"]');

      // Verify
      assert.include(browser.getText('body'), "Save a video");
    });
  });
});
