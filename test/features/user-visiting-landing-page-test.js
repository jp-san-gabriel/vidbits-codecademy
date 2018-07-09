const {assert} = require('chai');

const generateRandomUrl = (domain) => {
    return `http://${domain}/${Math.random()}`;
};

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
    it('renders it in the list', () => {
      // Setup - save a video
      const videoToSave = {
        title: 'Shampoo Prank',
        description: 'cold water edition',
        videoUrl: generateRandomUrl('youtube.com')
      }

      browser.url('/videos/create.html');
      browser.setValue('#title-input', videoToSave.title);
      browser.setValue('#videoUrl-input', videoToSave.videoUrl);
      browser.click('#submit-button');

      // Exercise
      browser.url('/');

      // Verify
      assert.equal(browser.getAttribute('iframe', 'src'), videoToSave.videoUrl);
    });

    it('can navigate to a video', () => {
      // Setup - save a video
      const videoToSave = {
        title: 'Shampoo Prank',
        description: 'cold water edition',
        videoUrl: generateRandomUrl('youtube.com')
      }

      browser.url('/videos/create.html');
      browser.setValue('#title-input', videoToSave.title);
      browser.setValue('#description-input', videoToSave.description);
      browser.setValue('#videoUrl-input', videoToSave.videoUrl);
      browser.click('#submit-button');

      // Exercise
      browser.url('/');
      browser.click(`a=${videoToSave.title}`);

      // Verify - check that we are on the video's show page: the body must contain the title
      assert.include(browser.getText('body'), videoToSave.title);
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
