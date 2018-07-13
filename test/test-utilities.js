const {jsdom} = require('jsdom');
const Video = require('../models/video');

function getElementFromHtml(html, selector) {
  const selectedElement= jsdom(html).querySelector(selector);
  if(selectedElement !== null) {
    return selectedElement;
  } else {
    throw new Error(`No element with selector "${selector}" found in HTML string`);
  }
};

// Builds a Video object with random values to be used as test data
// This function accepts an optional video parameter that can be
// used to override the generated value
function buildVideoObject(video = {}) {
  return {
    title: video.title === undefined ? `Video Title: (${Math.random()})` : video.title, // blank string returns false
    description:  video.description || `This is a sample description. (${Math.random()})`,
    videoUrl: video.videoUrl === undefined ? `http://example.com/${Math.random()}` : video.url // blank string returns false
  };
}

// Adds a Video to database
const seedVideoToDatabase = async (options = {}) => {
  const vid = await Video.create(buildVideoObject(options));
  return vid;
};

const submitVideo = (video) => {
  browser.url('/videos/create.html');
  browser.setValue('#title-input', video.title || '');
  browser.setValue('#description-input', video.description || '');
  browser.setValue('#videoUrl-input', video.videoUrl || '');
  browser.click('#submit-button');
};

module.exports = {
  getElementFromHtml,
  buildVideoObject,
  submitVideo,
  seedVideoToDatabase
};
