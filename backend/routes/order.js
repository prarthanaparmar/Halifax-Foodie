const express = require('express');
const AWS = require('aws-sdk');
const env = require('../data/env.json');

const { uuid } = require('uuidv4');

// AWS.config.update({region: 'us-east-1'});
AWS.config.update(env);

dynamoDBClient = new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.post('/placeOrder', (req, res) => {

    const request= req.body; 
    console.log("Request payload is",request);
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
        .then((data) => {
            console.log(data);
            res.status(201).json({
                "status" : true,
                "message" : 'Order is successfully placed',
                "data":orderId
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

router.get('/', (req, res) => {

    const params = {
        TableName: "Orders"
    };

    try {
        dynamoDBClient.scan(params).promise().then((results) => {
            console.log("Fetched orders are", results);

            res.status(200).json({
                "status" : true,
                "message" : "List of orders retrieved!",
                "results" : results.Items

            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                "status": false,
                "message": "Error in fetching results from Orders table"
            })
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            "status": false,
            "message": "Error in fetching news list"
        })
    }
})




module.exports = router;