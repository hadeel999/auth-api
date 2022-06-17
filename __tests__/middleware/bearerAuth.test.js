'use strict';

process.env.SECRET = "TEST_SECRET";

const middleware = require('../../auth/middleware/bearerAuth');
const { sequelize } = require('../../auth/models/index');
const jwt = require('jsonwebtoken');

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await sequelize.sync();
 // await users.create(userInfo.admin);
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
    json: jest.fn(() => res),
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

       middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).not.toHaveBeenCalledWith(200);
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

       middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalledWith("Invalid Signin");
        });

    });
  });
});