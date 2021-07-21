const express = require('express');
const AWS = require('aws-sdk');

const { uuid } = require('uuidv4');

AWS.config.update({region: 'us-east-1'});

dynamoDBClient = new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.post('/placeOrder', (req, res) => {

    const request= req.body; 
    console.log(request);
    const orderId = uuid();

    const orderDetails={
        OrderID: orderId,
        Items :  request.items,
        CustomerID : request.customerID,
        CreatedOn : request.createdOn,
        Amount : request.amount,
        OrderStatus : request.orderStatus
    }

    const params = {
        TableName: "Orders",
        Item : orderDetails
    };

    try{

        dynamoDBClient.put(params).promise()
        .then(data => {
            console.log(data);
            res.status(201).json({
                "status" : true,
                "message" : 'Order is successfully placed',
            });
            }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                            "status" : false,
                            "message" : "Issue with the order"
                        })
                    });
        } catch (error) {
                console.log("caught error")
                res.status(500).json({
                "message": "Something went wrong",
                "status": false
                })
            }
});


module.exports = router;