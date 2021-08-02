
const express = require('express');
const AWS = require('aws-sdk');
const env = require('../data/env.json');

const { uuid } = require('uuidv4');

// AWS.config.update({region: 'us-east-1'});
AWS.config.update(env);

dynamoDBClient = new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.post('/uploadrecipe', (req, res) => {
    console.log(req.body.text);
    sleep(15000);
    res.json({ output: "The file is predicted as cake with accuracy of 0.9946331977844238" });
   });
  
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

  module.exports = router;