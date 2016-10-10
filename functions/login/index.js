'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');
AWS.config.update({
  region: "us-west-2"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handle = (event, context, callback) => {
    let params = {
        TableName: 'User',
        Key: {
            Email: decodeURIComponent(event.email),
            Password: event.password
        }
    }
    dynamoDB.get(params, (err, data) => {
        if (err) {
            callback(err, null);
        } else if (data.Item) {
            const token = uuid.v1();
            params.UpdateExpression = 'set Authentication = :token';
            params.ExpressionAttributeValues = {
                ':token': token
            }
            dynamoDB.update(params, (err, data) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, {
                        token: token
                    });
                }
            });
        } else {
            callback(null, {
                status: false,
                message: 'Usuário não encontrado'
            });
        }
    });
}
