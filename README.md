# DISTANCE-LOCATOR

Distance locator is a REST API that can determine the distance between a location and some other locations.

## How to Run

* Clone this repository.
* Create [Postgres](https://www.postgresql.org/docs/9.0/tutorial-createdb.html) database.
* Make sure npm and node is installed.
* Change the file name from example.env to .env, adding the environmental variable.
* You can run the project  by running ```yarn start```
* Once successfully built, you can run access the swagger documentation via http://localhost:{PORT}/api or for a direct test  on https://distance-locator.herokuapp.com/api/

```bash
https://distance-locator.herokuapp.com/api/
http://localhost:{PORT}/api
```




Once the application runs you should see this below

```

[Nest] 77187   - 06/20/2021, 13:18:48   [NestApplication] Nest application successfully started +2ms
[Nest] 77187   - 06/20/2021, 13:18:48   Server started on http://localhost:5000, Boostrap +2ms
```

## Services

Here are some endpoints you can call:

### Create new Location and Calculate Distance

**Request**

```bash
curl -X 'POST' \
  'https://distance-locator.herokuapp.com/api/location' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "description": "A place in lagos Island",
  "website": "www.distancelocation.com",
  "phoneNumber": "08057683127",
  "contactPerson": "Shelly Kelby",
  "sourceName": "Lagos Island",
  "destinationName": "Badagry",
  "sourceLocation": {"latitude":6.4549, "longitude":3.4246},
  "destinationLocation": {"latitude":6.438963, "longitude":3.35122}
}'

```

**Response**

```json
{
  "description": "A place in lagos Island",
  "website": "www.distancelocation.com",
  "phoneNumber": "08057683127",
  "contactPerson": "Shelly Kelby",
  "sourceName": "Lagos Island",
  "destinationName": "Badagry",
  "distance": "8.30",
  "sourceCoordinates": {
    "type": "Point",
    "coordinates": [
      3.4246,
      6.4549
    ]
  },
  "destinationCoordinates": {
    "type": "Point",
    "coordinates": [
      3.35122,
      6.438963
    ]
  },
  "createdBy": null,
  "updatedBy": null,
  "Comment": null,
  "id": 2,
  "isActive": true,
  "isArchived": false,
  "createdDate": "2021-06-20T13:36:22.178Z",
  "updatedDate": "2021-06-20T13:36:22.178Z",
  "isDeleted": false
}
```

### Fetch all locations

**Request**

```bash
curl -X 'GET' \
  'https://distance-locator.herokuapp.com/api/location' \
  -H 'accept: */*'
```

**Response**

```json
[
  {
    "id": 1,
    "isActive": true,
    "isArchived": false,
    "createdDate": "2021-06-20T13:31:53.670Z",
    "createdBy": null,
    "updatedDate": "2021-06-20T13:31:53.670Z",
    "updatedBy": null,
    "Comment": null,
    "isDeleted": false,
    "description": "A place in lagos Island",
    "website": "www.distancelocation.com",
    "phoneNumber": "08057683127",
    "contactPerson": "Shelly Kelby",
    "sourceName": "Lagos Island",
    "destinationName": "Festac",
    "distance": "15.64",
    "sourceCoordinates": {
      "type": "Point",
      "coordinates": [
        3.4246,
        6.4549
      ]
    },
    "destinationCoordinates": {
      "type": "Point",
      "coordinates": [
        3.283514,
        6.466445
      ]
    }
  },
  {
    "id": 2,
    "isActive": true,
    "isArchived": false,
    "createdDate": "2021-06-20T13:36:22.178Z",
    "createdBy": null,
    "updatedDate": "2021-06-20T13:36:22.178Z",
    "updatedBy": null,
    "Comment": null,
    "isDeleted": false,
    "description": "A place in lagos Island",
    "website": "www.distancelocation.com",
    "phoneNumber": "08057683127",
    "contactPerson": "Shelly Kelby",
    "sourceName": "Lagos Island",
    "destinationName": "Badagry",
    "distance": "8.30",
    "sourceCoordinates": {
      "type": "Point",
      "coordinates": [
        3.4246,
        6.4549
      ]
    },
    "destinationCoordinates": {
      "type": "Point",
      "coordinates": [
        3.35122,
        6.438963
      ]
    }
  }
]
```

### Fetch Specific Location

**Request**

```bash
curl -X 'GET' \
  'https://distance-locator.herokuapp.com/api/location/1' \
  -H 'accept: */*'
```

**Response**

```json
{
  "id": 1,
  "isActive": true,
  "isArchived": false,
  "createdDate": "2021-06-20T13:31:53.670Z",
  "createdBy": null,
  "updatedDate": "2021-06-20T13:31:53.670Z",
  "updatedBy": null,
  "Comment": null,
  "isDeleted": false,
  "description": "A place in lagos Island",
  "website": "www.distancelocation.com",
  "phoneNumber": "08057683127",
  "contactPerson": "Shelly Kelby",
  "sourceName": "Lagos Island",
  "destinationName": "Festac",
  "distance": "15.64",
  "sourceCoordinates": {
    "type": "Point",
    "coordinates": [
      3.4246,
      6.4549
    ]
  },
  "destinationCoordinates": {
    "type": "Point",
    "coordinates": [
      3.283514,
      6.466445
    ]
  }
}
```

### Edit Location

**Request**

```bash
curl -X 'PATCH' \
  'https://distance-locator.herokuapp.com/api/location/1' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "description": "A place in Ikorodu",
  "sourceName": "Ikorodu",
  "destinationName": "Badagry",
  "sourceLocation": {"latitude":6.619413, "longitude":3.4246},
  "destinationLocation": {"latitude":6.438963, "longitude":3.510454}
}'
```

### Delete Location

```bash
curl -X 'DELETE' \
  'https://distance-locator.herokuapp.com/api/location/2' \
  -H 'accept: */*'
```

```json
{
  "message": "Location details deleted successfully"
}
```

### To view Swagger 2 API docs

Run the server and browse to localhost:9000/swagger-ui.html

# Tools/Languages Used

* [X] Visual Studio Code
* [X] Nestjs
* [X] TypeORM
* [X] Postgresql
* [X] Heroku



**Areas to Pay attention to**

* Service class implementation -**location.service.ts**

**Areas Undone**

* Defining the model using Grpc - The model can also be implemented using Grpc.
* Writing test - I would have written unit and Integration test if I had more time.



**Area of Improvement**

* Refactor the update method in the service class - **location.service.ts**

# Questions and Comments: nwabuokeinnamdi19@gmail.com
