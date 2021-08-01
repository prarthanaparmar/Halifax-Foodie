const express = require('express');
const AWS = require('aws-sdk');
const env = require('../data/env.json');
AWS.config.update(env);
dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const router = express.Router();
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const storage = new Storage();
const buckettest = 'testbucketrecipe';
const bucketresult = 'resultbucketstorage'

router.post('/uploadrecipe', (req, res) => {
  console.log(req.body.text);
  
  var data = req.body.text; 
  var fileName = 'testrecipe.txt'; 

  fs.writeFileSync(fileName, data);
  const bucket = storage.bucket(buckettest);
  const filebucket = storage.bucket(bucketresult).file(fileName);

  bucket.upload(fileName, (err, data) => {
    if (err) console.log(err);
    else {
      console.log('File uploaded : ', data);
      sleepfunction(10000);
      while(filebucket.exists()){      
      bucketDownload();
      }
    }
  });
  const bucketDownload = async () => {
    await filebucket.download().then((data, err) => {
      if (err) console.log('File download error : ' + err);
      else {
        res.json({ output: data.toString() });
        filebucket.delete().then((data, err) => {
          if (err) console.log('not deleted : ', err);
          else {
            console.log('deleted' ,data);
          }
        });
      }
    });
  };
});

function sleepfunction(milliseconds) {
  const datenow = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - datenow < milliseconds);
}
module.exports = router;