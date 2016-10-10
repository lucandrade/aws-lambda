# AWS Lambda Stack

## Desenvolvimento

Aplicação foi desenvolvida usando serviços AWS: Lambda Function, DynamoDB, API Gateway e IAM

## Deploy

Deploy da aplicação foi feito usando [Apex](http://apex.run/)

## API

[Endereço da API](https://d67fl7msok.execute-api.us-west-2.amazonaws.com/prod/)

> Todos os métodos POST podem ser chamados usando ContentType application/json e application/x-www-form-urlencoded

### Criar usuário

* POST /user

Exemplo:

```
{
    "name": "{Name}",
    "email": "{Email}",
    "password": "{Password}",
}
```

### Logar usuário

* POST /login

> Esse método retorna um token usado para consulta do usuário

Exemplo:

```
{
    "email": "{Email}",
    "password": "{Password}",
}
```

### Consultar usuário

* GET /user

> Use o token retornado no método POST /login

Exemplo:

```
/user?token={token}
```
