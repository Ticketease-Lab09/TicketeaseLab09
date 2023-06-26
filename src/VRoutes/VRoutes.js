'use strict';
const express = require('express');
const dataModules = require('../auth/models/index');
const vRoutes = express.Router();
const bearer = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');

vRoutes.param('model', (req, res, next) => {
    const modelName = req.params.model;
    if (dataModules[modelName]) {
      req.model = dataModules[modelName];
      next();
    } else {
      next('Invalid Model');
    }
  });
  vRoutes.get('/api/v', bearer, v2Handler);
  vRoutes.post('/api/v', bearer, acl('create'),vCreateHandler);
  vRoutes.put('/api/v', bearer, acl('update'),vUpdateHander);
  vRoutes.delete('/api/v', bearer, acl('delete'), vDeleteHandler);
  
  
  function v2Handler(req, res) {
      res.status(200).json('you have the access');
  }
  
  function vCreateHandler(req, res) {
      res.status(201).json('you can Create');
  }
  
  function vUpdateHander(req, res) {
      res.status(200).json('you can update');
  }
  
  function vDeleteHandler(req, res) {
      res.status(200).json('you can delete');
  }
  
  
  
  module.exports = vRoutes;