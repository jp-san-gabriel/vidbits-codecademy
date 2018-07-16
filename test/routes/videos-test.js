const {assert} = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const Video = require('../../models/video');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {
  getElementFromHtml,
  buildVideoObject,
  seedVideoToDatabase,
  getValidCredentials
} = require('../test-utilities');

// Make supertest preserve sessions
const request = supertest.agent(app);

// Helper function for authenticating the request
const authenticateRequest = async () => {
  await request
    .post('/login')
    .type('form')
    .send(getValidCredentials());
};

// Helper function for logging off
const logOffRequest = async () => {
  await request.get('/logout');
}

describe('Server path: /videos', () => {
  // Setup Phase
  beforeEach(connectDatabase);

  // Teardown Phase
  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders existing videos', async () => {
      // Setup
      const existingVideo = await Video.create(buildVideoObject());

      //Exercise
      const response = await request.get('/videos');

      // Verify
      assert.include(response.text, existingVideo.title);
    });
  });

  describe('POST', () => {
    describe('when user is not logged in', () => {
      it('redirects to login page', async () => {
        // Exercise
        const response = await request
          .post('/videos')
          .type('form')
          .send(buildVideoObject());

        // Verify
        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/login');
      });
    });

    describe('when user is logged in', () => {

      beforeEach(authenticateRequest);
      afterEach(logOffRequest);

      it('saves a video', async () => {
        // Setup
        const videoToSave = buildVideoObject();

        // Exercise
        const response = await request
          .post('/videos')
          .redirects(1)
          .type('form')
          .send(videoToSave);

        // Verify
        const savedVideo = await Video.findOne({});
        assert.equal(savedVideo.title, videoToSave.title);
        assert.equal(savedVideo.description, videoToSave.description);
        assert.equal(savedVideo.videoUrl, videoToSave.videoUrl);
        //ensure response contains video details
        assert.include(response.text, videoToSave.title);
        assert.include(response.text, videoToSave.description);
      });

      it('renders the new video', async () => {
        // Setup
        const videoToSave = buildVideoObject();

        // Exercise
        const response = await request
          .post('/videos')
          .type('form')
          .send(videoToSave);

        // Verify
        const savedVideo = await Video.findOne({});
        assert.equal(response.status, 302);
        assert.equal(response.headers.location, `/videos/${savedVideo._id}`);
      });

      describe("with empty video title", () => {
        it('does not save the video', async() => {
          // Setup
          const videoToSave = buildVideoObject({title: ''});

          // Exercise
          await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          // Verify
          const videos = await Video.find({});
          assert.isEmpty(videos);
        });

        it('responds with a 400 status code', async () => {
          // setup
          const videoToSave = buildVideoObject({title: ''});
          // Exercise
          const response = await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          //Verify
          assert.equal(response.status, 400);
        });

        it('renders the video form', async () => {
          // setup
          const videoToSave = buildVideoObject({title: ''});

          // Exercise
          const response = await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          // Verify
          assert.exists(getElementFromHtml(response.text,'form input[name="title"]'),
            'could not find input with name "title"');
        });

        it('displays an error message', async () => {
          // setup
          const videoToSave = buildVideoObject({title: ''});

          // Exercise'
          const response = await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          // Verify
          assert.include(response.text, 'Title is required');
        });

        it('preserves the other field values', async () => {
          // Setup
          const videoToSave = buildVideoObject({title: ''});

          // Exercise
          const response = await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          //Verify
          assert.include(response.text, 'Title is required');
          assert.include(response.text, videoToSave.description);
          assert.include(response.text, videoToSave.videoUrl);
        });
      });

      describe('with empty URL', () => {
        it('displays an error message', async () => {
          // setup
          const videoToSave = buildVideoObject({videoUrl: ''});

          // Exercise'
          const response = await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          // Verify
          assert.include(response.text, 'a URL is required');
        });

        it('preserves the other field values', async () => {
          // Setup
          const videoToSave = buildVideoObject({videoUrl: ''});

          // Exercise
          const response = await request
            .post('/videos')
            .type('form')
            .send(videoToSave);

          //Verify
          assert.include(response.text, 'a URL is required');
          assert.include(response.text, videoToSave.title);
          assert.include(response.text, videoToSave.description);
        });
      });
    });
  });
});

describe("Server path: /videos/:id", () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe("GET", () => {
    it("renders the video", async () => {
      // Setup
      const video = await seedVideoToDatabase();

      // Exercise
      const response = await request
        .get(`/videos/${video._id}`);

      // Verify
      assert.include(response.text, video.title);
      assert.exists(getElementFromHtml(response.text, `iframe[src="${video.videoUrl}"]`));
    });
  });
});

describe("Server path: /videos/:id/edit", () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe("GET", () => {

    describe('when user is not logged in', () => {
      it('redirects to login page', async () => {
        // Setup
        const video = await seedVideoToDatabase();

        // Exercise
        const response = await request
          .get(`/videos/${video._id}/edit`);

        // Verify
        assert.equal(response.headers.location, '/login');
      });
    });

    describe('when user is logged in', () => {

      beforeEach(authenticateRequest);
      afterEach(logOffRequest);

      it("renders a form with values of existing video", async () => {
        // Setup
        const video = await seedVideoToDatabase();

        // Exercise
        const response = await request
          .get(`/videos/${video._id}/edit`);

        // Verify
        assert.equal(getElementFromHtml(response.text, 'form input[id="title-input"]').value, video.title);
        assert.equal(getElementFromHtml(response.text, 'form textarea[id="description-input"]').value, video.description);
        assert.equal(getElementFromHtml(response.text, 'form input[id="videoUrl-input"]').value, video.videoUrl);
      });
    });
  });
});


describe("Server path: /videos/:id/updates", () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('POST', () => {

    describe('when user is not logged in', () => {
      it('redirects to login page', async () => {
        // Setup
        const video = await seedVideoToDatabase();

        // Exercise
        video.title = 'New video title';
        const response = await request
          .post(`/videos/${video._id}/updates`)
          .type('form')
          .send(video.toObject());

        // Verify
        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/login');
      });
    });

    it('updates the record', async () => {
      // Setup
      const video = await seedVideoToDatabase();

      // Exercise
      video.title = 'New video title';
      const response = await request
        .post(`/videos/${video._id}/updates`)
        .type('form')
        .send(video.toObject());

      // Verify
      const updatedVideo = await Video.findById(video._id);
      assert.deepEqual(video.toObject(), updatedVideo.toObject());
    });

    it('redirects to the show page upon updating', async () => {
      // Setup
      const video =await seedVideoToDatabase();

      // Exercise
      video.title = 'New video title';
      const response = await request
        .post(`/videos/${video._id}/updates`)
        .type('form')
        .send(video.toObject());

      // Verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${video._id}`);
    });

    describe('when input is invalid', () => {
      it('does not save the record', async () => {
        // Setup - save the video to database
        const video = await seedVideoToDatabase();

        // Exercise - set the video title to blank then submit the video
        video.title = '';
        const response = await request
          .post(`/videos/${video._id}/updates`)
          .type('form')
          .send(video.toObject());

        // Verify - check that the title still is not blank to see that it was not updated
        const updatedVideo = await Video.findById(video._id);
        assert.notEqual(updatedVideo.title, video.title);

        // Verify - check that it responds with a 400
        assert.equal(response.status, 400);
      });

      it('renders the edit form', async () => {
        // Setup - save the video to database
        const video = await seedVideoToDatabase();

        // Exercise - set the video title to blank then submit the video
        video.title = '';
        const response = await request
          .post(`/videos/${video._id}/updates`)
          .type('form')
          .send(video.toObject());

        // Verify that input fields contain the values of the submitted video
        assert.equal(getElementFromHtml(response.text, 'form input[id="title-input"]').value, video.title);
        assert.equal(getElementFromHtml(response.text, 'form textarea[id="description-input"]').value, video.description);
        assert.equal(getElementFromHtml(response.text, 'form input[id="videoUrl-input"]').value, video.videoUrl);
      });

      it('displays validation error messages', async () => {
        // Setup - save the video to database
        const video = await seedVideoToDatabase();

        // Exercise - set the video url and title to blank then submit the video
        video.videoUrl = '';
        video.title = '';
        const response = await request
          .post(`/videos/${video._id}/updates`)
          .type('form')
          .send(video.toObject());

        // Verify that the response text contains the validation error messages
        assert.include(response.text, 'Title is required');
        assert.include(response.text, 'a URL is required');
      });
    });
  });
});


describe('Server path /videos/:id/deletions', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('POST', () => {
    it('removes the record', async () => {
      // Setup - save a video to database
      const video = await seedVideoToDatabase();

      // Exercise - send a post to '/videos/:id/deletions'
      const response = await request
        .post(`/videos/${video._id}/deletions`);

      // Verify - assert that database is empty
      assert.isEmpty(await Video.find({}));
    });

    it('redirects to landing page', async () => {
      // Setup - save a video to database
      const video = await seedVideoToDatabase();

      // Exercise - send a post to '/videos/:id/deletions'
      const response = await request
        .post(`/videos/${video._id}/deletions`);

      // Verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
  });
});

describe('Server path: /videos/create.html', () => {
  describe('GET', () => {
    it('redirects to login page when user is not logged in', async () => {
      // Exercise
      const response = await request.get('/videos/create.html');

      // Verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/login');
    });
  });
});
