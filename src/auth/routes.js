'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer')
const permissions = require('./middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  console.log(req.body);
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(201).json(user);
  } catch (error) {
    // Handle JWT decoding errors here
    console.error('JWT Decoding Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;
