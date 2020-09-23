# Database-driven-quiz

This documentation serves to provide informaiton on how to run the database driven code created by Siraj Brepotra.

In order to run the code the two following segments of insturcitons should be run in parallel to each other. It is advisable to have two terminals running.

### Server

1. Within the terminal type `cd server`
2. Run `npm i` command
3. Setup database settings inside `ormconfig.json` file, the following setting are what was used during development of project

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "siraj",
  "password": "123",
  "database": "quizdata",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```

4. run `npm start` command

### Client

1. Within the terminal type `cd client`
2. Run `npm i` command
3. Run `npm start` command
4. If prompted to use a different port than 3000 type `Y` in terminal to allow app to run.

NOTE: It is highly recommended to run both terminals at the same time, one for the back-end - server side- and one for the front-end -client side-.
