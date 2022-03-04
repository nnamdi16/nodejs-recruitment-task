# Node.js recruitment task

## Introduction

This repository contains two services. The first one is **auth** which is responsible for authentication process and the second one is **movie**
which is responsible for movie entities. Both services use ExpressJS framework:

- http://localhost:3000/auth - default api for auth service
- http://localhost:5000/api - default api for movie service

## 1. `movie` service

1. `POST /movies`

   1. Allows creating a movie object based on movie title passed in the request body
   2. Based on the title additional movie details should be fetched from
      https://omdbapi.com/ and saved to the database. Data we would like you to
      fetch from OMDb API:

   ```
     Title: string
     Released: date
     Genre: string
     Director: string
   ```

   3. Only authorized users can create a movie.
   4. `Basic` users are restricted to create 5 movies per month (calendar
      month). `Premium` users have no limits.
2. `GET /movies`

   1. Should fetch a list of all movies created by an authorized user.

### Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl -X 'GET' \
  'http://localhost:5000/movie/create/Flash' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNCwibmFtZSI6IlByZW1pdW0gSmltIiwicm9sZSI6InByZW1pdW0iLCJpYXQiOjE2NDYzOTk5NjUsImV4cCI6MTY0NjQwMTc2NSwiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIiwic3ViIjoiNDM0In0.HAHKycySCP85w7MkVbTK1t533SZndIhZRhv3kp5ftKY'
```

Response

```
{
  "status": 201,
  "message": "Movie successfully created",
  "data": {
    "userId": "434",
    "title": "Flash",
    "released": "21 Dec 1997",
    "genre": "Drama, Family",
    "director": "Simon Wincer"
  }
}
```

## 2. `auth` service

To authorize users please use our simple auth service based on JWT tokens.
Auth service code is located under `./src` directory

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
2. Run from root dir

```
JWT_SECRET=secret docker-compose up -d
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## JWT Secret

To generate tokens in auth service you need to provide env variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API you're building to verify the JWT tokens.

## Users

The auth service defines two user accounts that you should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Token payload

Decoding the auth token will give you access to basic information about the
user, including its role.

```
{
  "userId": 123,
  "name": "Basic Thomas",
  "role": "basic",
  "iat": 1606221838,
  "exp": 1606223638,
  "iss": "https://www.netguru.com/",
  "sub": "123"
}
```

### Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

```
Authorization: Bearer <token>
```

## How to run

You have to create `.env` files inside `auth` and `movies` directories. Put there necessarry environment variables that I mentioned above.

After that you can just run `docker-compose up -d --build` command

## Available scripts

- `npm run start:dev` - starts the express server with hot reload
- `npm start` - starts the express server without hot reload
- `npm run test:watch` - runs tests in watch mode
- `npm run test` - runs tests once
- `npx jest --coverage` - generates test coverage report

## Tech Stack

- ExpressJS framework
- PostgresDB
- TypeORM
- Docker and docker-compose
- JSONwebtoken
- Jest
- NEST js
- Github actions

## Environment Variables

- POSTGRES_HOST - host for postgres
- POSTGRES_PORT - port for postgres
- POSTGRES_USER - postgres username
- POSTGRES_PASSWORD - postgres password
- PORT - port for express server (default 3000 for auth service and 5000 for movies service)
- JWT_SECRET - jwt secret string (!must be the same as for auth service!)
- OMDB_BASE_URL - connection string to om
- OMDB_API_KEY - api key for omdb service.
