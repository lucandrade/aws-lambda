'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-west-2"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handle = function (event, context, callback) {
    const params = {
        TableName: 'User',
        ProjectionExpression: "#name",
        FilterExpression: "Authentication = :token",
        ExpressionAttributeNames: {
            "#name": "Name"
        },
        ExpressionAttributeValues: {
            ":token": event.token
        }
    };
    dynamoDB.scan(params, (err, data) => {
        if (err) {
            callback(err, null);
        } else if (data.Items.length > 0) {
            callback(null, {
                user: data.Items[0]
            });
        } else {
            callback(null, {
                status: false,
                message: 'Token inválido'
            });
        }
    });
}
