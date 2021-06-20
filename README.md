# DISTANCE-LOCATOR

Distance locator is a REST API that can determine the distance between a location and some other locations.

## How to Run

* Clone this repository.
* Create [Postgres](https://www.postgresql.org/docs/9.0/tutorial-createdb.html) database.

  - run `com/nnamdi/account/data/userRoles.sql`
* Make sure npm and node is installed.
* Change the file name from example.env to .env, adding the environmental variable.
* You can run the project  by running ```yarn start```
* Once successfully built, you can run access the swagger documentation via http://localhost:{PORT}

```
 http://localhost:{PORT}/api
```

For test you can access the API's  using the link below

```bash

```

Once the application runs you should see this below

```

[Nest] 77187   - 06/20/2021, 13:18:48   [NestApplication] Nest application successfully started +2ms
[Nest] 77187   - 06/20/2021, 13:18:48   Server started on http://localhost:5000, Boostrap +2ms
```

## About the Service

The service is just a simple REST service for creating accounts. It uses a mysql database to store the data. You can also use other relational database like PostgreSQL. If your database connection properties work, you can call some REST endpoints defined in ```package com.nnamdi.account.controller``` on **port 9000**. (see below)

More interestingly, you can start calling some operational endpoints (see full list below) like ```/signup``` and ```/login``` (these are available on **port 9000**)

You can use this sample service to understand the conventions and configurations that allow you to create a DB-backend RESTful service. Once you understand and get comfortable with the sample app you can add your own services following the same patterns as the sample service.

Here are some endpoints you can call:

### Create an account

```
http://localhost:9000/api/auth/signup

https://reloadly-account-app.herokuapp.com/api/auth/signup
```

### To login to the account

```
http://localhost:9000/api/auth/login

https://reloadly-account-app.herokuapp.com/api/auth/login
```

### Get list of accounts or account info

```
http://localhost:9000/account/{id}
http://localhost:9000/api/accounts/all

https://reloadly-account-app.herokuapp.com/account/{id}
https://reloadly-account-app.herokuapp.com/api/accounts/all

```

### Create an account

```
POST /api/v1.0/notifier/notify/{channelType}
Accept: application/json
Content-Type: application/json

{
    "username":"reloadly1234",
    "email": "znwabuokei@gmail.com",
    "address": "Lagos State",
    "phoneNumber": "+234704599769959",
    "password":"12345893",
    "name": "Basky Clan"
}

RESPONSE: HTTP 201 (Created)
{
    "accountId": 13,
    "username": "reloadly1234",
    "name": "Basky Clan",
    "address": "Lagos State",
    "phoneNumber": "+234704599769959",
    "email": "znwabuokei@gmail.com",
    "password": "$2a$10$XDRjfx7JYeP4g0EkKfi.UeqEAuQWIYTM8xB4JKHKvylH/9QEqufS2",
    "roles": [
        {
            "id": 1,
            "name": "ROLE_USER"
        }
    ],
    "_links": {
        "self": {
            "href": "http://localhost:9000/api/accounts/account/13"
        },
        "accounts": {
            "href": "http://localhost:9000/api/accounts/all"
        }
    }
}
```

### Login to account

```
POST /api/auth/login
Accept: application/json
Content-Type: application/json

{
    "username":"Bolaji12344",
    "password":"12345893"
   
}

RESPONSE: HTTP 200 
{
    "id": 12,
    "username": "Bolaji12344",
    "email": "bodennamdi30@yahoo.ca",
    "roles": [
        "ROLE_USER"
    ],
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCb2xhamkxMjM0NCIsImlhdCI6MTYxNzE0MDcwMCwiZXhwIjoxNjE3MjI3MTAwfQ.DsiyDdZrgsFwA9BlqsF_xVjAiiP-GZCYX11MNUP_BvGuiPkyZAwMLoGiSkn1Eh1liS4szIK0FPMX8aPsN6jOMA",
    "tokenType": "Bearer"
}
```

### To view Swagger 2 API docs

Run the server and browse to localhost:9000/swagger-ui.html

# About Spring Boot

Spring Boot is an "opinionated" application bootstrapping framework that makes it easy to create new RESTful services (among other types of applications). It provides many of the usual Spring facilities that can be configured easily usually without any XML. In addition to easy set up of Spring Controllers, Spring Data, etc. Spring Boot comes with the Actuator module that gives the application the following endpoints helpful in monitoring and operating the service:

# Area of Improvement

**1. Setting up notification on successful payment - Partly completed**

**2. Implementing JWT Authentication**

**2. Improve Code documentation**

# Questions and Comments: nwabuokeinnamdi19@gmail.com
