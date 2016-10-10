'use strict';

const validation = require('./validation');
const config = require('./config');

const dynamoDB = config.dynamoDB;

exports.handle = function (event, context, callback) {
    const params = {
        Item: {
            Name: event.name,
            Email: decodeURIComponent(event.email),
            Password: event.password
        },
        TableName: 'User'
    };

    validation.validate(params.Item).then((valid) => {
        if (valid[0]) {
            dynamoDB.put(params, (err, data) => {
                callback(err, {
                    status: true
                });
            });
        } else {
            callback(null, valid[1]);
        }
    }).catch((err) => {
        callback(err, null);
    });
}
