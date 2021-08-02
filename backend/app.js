
const express = require('express')
const bodyParser = require('body-parser')

const orderRoute = require('./routes/order');
const uploadRoute = require('./routes/uploadFile');

const app = express();
const rootRoute = '/api'

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")
  next();
})

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
app.use(bodyParser.json())

app.use(rootRoute+'/order', orderRoute);
app.use(rootRoute+'/upload', uploadRoute);

app.use('/',(req, res) =>{
  var response = {
    'message': "Please Check the Service URL.",
    'status': false
}
  res.status(404).json(response)
})

module.exports = app;