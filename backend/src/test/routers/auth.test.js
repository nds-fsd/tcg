const supertest = require('supertest');
const { bootstrapApp } = require('../../bootstrap');
const app = bootstrapApp();
const fakeRequest = supertest(app);
const { disconnectDB, connectDB } = require('../../mongo/connection');

beforeAll(async () => {
  await connectDB();
});

afterAll((done) => {
  disconnectDB().then(() => {
    console.log('Disconnected from test database!');
    done();
  });
});

describe('Auth Controller TEST', () => {
  const userData = {
    userName: 'Jose Manuel',
    email: 'jose.cano@gmail.com',
    password: '123456Ab',
  };

  describe('POST /auth/regis', () => {
    it('should let the user register', async () => {
      const response = await fakeRequest.post('/auth/register').send(userData);
      expect(response.status).toBe(201);
      expect(response.body.user.password).not.toBe(userData.password);
      expect(response.body.token).toBeDefined();
    });
  });
});
