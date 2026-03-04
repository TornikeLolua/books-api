A REST API built with Node.js, Express and SQLite.

## Technologies
- Node.js
- Express
- SQLite

## How to run
1. npm install
2. sqlite3 longlist-advance.db < db-setup.sql
3. node app.js

## Endpoints
- GET /api/v1/authors
- GET /api/v1/authors/:id
- GET /api/v1/books
- GET /api/v1/books/:id
- POST /api/v1/reviews
- GET /api/v1/reviews/:id
