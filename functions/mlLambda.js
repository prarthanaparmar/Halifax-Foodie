exports.helloGCS = (event, context) => {

  const {Storage} = require('@google-cloud/storage');
  const fs = require('fs');

  const storage = new Storage();

  bucketName = event.bucket;
  fileName = event.name;
  const filebucket = storage.bucket(bucketName).file(fileName);
  var fileData
  filebucket.download(function(err, contents) {
        if(err) console.log("file err: "+err);  
        else {
            fileData = new Buffer.from(contents).toString();
        }
        functionForPredict(fileData)
        .then( (output) => {
           let tempfile = '/tmp/'+fileName
           fs.writeFileSync(tempfile, output)
           const bucket = storage.bucket('resultbucketstorage')
           bucket.upload(tempPath, (err, data) =>{
               if(err) console.log(err)
               else { 
                   console.log("File uploaded successfully to bucket 2")
                   fs.unlinkSync(tempPath)
               }
           })
        });
    }); 
};

const functionForPredict = async (fileData) => {

    const projectId = '	serverlessproject-320719';
    const location = 'us-central1';
    const modelId = 'TCN4484288354896052224';
    const content = fileData;
    console.log(fileData);

    const {PredictionServiceClient} = require('@google-cloud/automl').v1;
    console.log('predictservice client created');
    const client = new PredictionServiceClient();
    console.log('client created');
    

    async function predict() {
    const request = {
        name: client.modelPath(projectId, location, modelId),
        payload: {
        textSnippet: {
            content: content,
            mimeType: 'text/plain', 
        },
        },
    };
    console.log('after request');

    const [response] = await client.predict(request);
    console.log('response object has been initialized');
    const mapAnnotaion = new Map();
    var maximum=0;
    var classname = "";

    for (const annotationPayload of response.payload) {
        console.log(`Predicted class name: ${annotationPayload.displayName}`);
        console.log(`Predicted class score: ${annotationPayload.classification.score}`);
        mapAnnotaion.set(annotationPayload.displayName,annotationPayload.classification.score);

        if(annotationPayload.classification.score > maximum) {
            maximum = annotationPayload.classification.score;
            classname = annotationPayload.displayName;
        }
    }
    console.log("CLASS : ", classname);
    console.log('inside predict but outside for');
    const toprint = "The file is predicted as" + classname + "with accuracy score of " + maximum;
    return toprint;
}
    console.log('outside expected console');
    let content = await predict();
    console.log('predict called');
    return content;
}

process.on('unhandledRejection', err => {
    console.log('error called');
    console.error(err.message);
    process.exitCode = 1;
});
