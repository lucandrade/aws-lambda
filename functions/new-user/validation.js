'use strict';

const config = require('./config');
const dynamoDB = config.dynamoDB;

var email = (email) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
}

exports.validate = function (data) {
    const errors = [];

    if (!(data && data.Email && data.Name && data.Password)) {
        errors.push('Dados inválidos. Complete os campos name, email e password');
        return [false, errors];
    }

    if (data.Name.length < 2) {
        errors.push('Nome deve conter ao menos 2 caracteres');
    }

    if (data.Password.length < 3) {
        errors.push('Senha deve conter ao menos 2 caracteres');
    }

    if (!email(data.Email)) {
        errors.push('Email inválido');
    }

    return new Promise((resolve, reject) => {
        if (errors.length > 0) {
            resolve([false, errors]);
        } else {
            const params = {
                TableName: 'User',
                KeyConditionExpression: "#email = :email",
                ExpressionAttributeNames:{
                    "#email": "Email"
                },
                ExpressionAttributeValues: {
                    ":email": data.Email
                }
            };

            dynamoDB.query(params, (err, data) => {
                if (err) {
                    reject([err, errors]);
                } else {
                    if (data.Items.length > 0) {
                        errors.push('Email já cadastrado');
                    }

                    resolve([errors.length == 0, errors]);
                }
            });
        }
    });
}
