'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-west-2"
});

exports.api = AWS;
exports.dynamoDB = new AWS.DynamoDB.DocumentClient();
