##Local host development using docker compose

1) Install Docker (https://docs.docker.com/engine/installation/) and Docker Compose (https://docs.docker.com/compose/install/) <br/>
2) Run `docker-compose up` to start postgres database for testing <br/>
3) Run `npm install` <br/>
4.a) Run `npm run test:integration` to start integration tests <br />
4.b) Run `npm run start` to start server <br />
5) Run `docker-compose down` to stop containers <br/>

##Information

The database schema file is in `./src/repositories/artifacts/`