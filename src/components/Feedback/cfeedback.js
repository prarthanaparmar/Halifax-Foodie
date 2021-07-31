export default function feedback(props){
    var aws = require('aws-sdk');
    aws.config.update({region: 'us-east-1'});
    const fs = require('fs')
    const { type } = require('os')
     
    var s3 = new aws.S3({
        accessKeyId:props.ACCESS_KEY_ID,
        secretAccessKey:props.SECRET_ACCESS_KEY,
        sessionToken:props.SESSION_TOKEN
    })
    var getparams = {
        Key: props.BUCKET_KEY,
        Bucket: props.BUCKET_NAME
    }
    s3.getObject(getparams, function(error, data) {
        if (error) {
            console.log("Unexpected Error : ", error);
        }
        
        let customerfeedback = new Buffer.from(data.Body).toString();
        
        let newFeedback = props.feedback;
        customerfeedback = customerfeedback + " " + newFeedback
     
        var getparams2 = {
            Key: props.BUCKET_KEY,
            Bucket: props.BUCKET_NAME,
            Body: customerfeedback
        }
        
        s3.upload (getparams2, function (error, data) {
            if (error) {
              console.log("Unexpected Error : ", error);
            } if (data) {
              console.log("File has been uploaded successfully");
            }
          });
    })
     
    }