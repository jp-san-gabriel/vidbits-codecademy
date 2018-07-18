const {jsdom} = require('jsdom');
const Video = require('../models/video');
const { administrators } = require('../authenticate');

function getElementFromHtml(html, selector) {
  return jsdom(html).querySelector(selector);
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

const login = () => {
  const credentials = getValidCredentials();
  browser.url('/login');
  browser.setValue('form input[name="user"]', credentials.user);
  browser.setValue('form input[name="password"]', credentials.password);
  browser.click('#log-in');
}

const logout = () => {
  browser.click('a[href="/logout"]');
}

const submitVideo = (video) => {
  browser.url('/videos/create.html');
  browser.setValue('#title-input', video.title || '');
  browser.setValue('#description-input', video.description || '');
  browser.setValue('#videoUrl-input', video.videoUrl || '');
  browser.click('#submit-button');
};

// helper function to generate a valid credential randomly
const getValidCredentials = () => {
  const usernames = Object.keys(administrators);
  const user = usernames[Math.round(Math.random() * (usernames.length - 1))];
  return {
    user,
    password: administrators[user]
  };
};

module.exports = {
  getElementFromHtml,
  buildVideoObject,
  submitVideo,
  seedVideoToDatabase,
  getValidCredentials,
  login,
  logout
};
