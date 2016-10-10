# AWS Lambda Stack

## Desenvolvimento

Aplicação foi desenvolvida usando serviços AWS: Lambda Function, DynamoDB, API Gateway e IAM

## Deploy

Deploy da aplicação foi feito usando [Apex](http://apex.run/)

## API

[Endereço](https://d67fl7msok.execute-api.us-west-2.amazonaws.com/prod/)

### Métodos

> Todos os métodos POST podem ser chamados usando ContentType application/json e application/x-www-form-urlencoded

* POST /user

Cria usuário

Exemplo:

```
{
    "name": "{Name}",
    "email": "{Email}",
    "password": "{Password}",
}
```

* POST /login

Login de usuário
> Esse método retorna um token usado para consulta do usuário

Exemplo:

```
{
    "email": "{Email}",
    "password": "{Password}",
}
```

* GET /user
Consulta usuário
> Use o token retornado no método POST /login

Exemplo:

```
/user?token={token}
```
