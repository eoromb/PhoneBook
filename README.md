## Description

Simple Phonebook which allows to keep peoples names and phones. <br/>
Features:
* Adding, editing and removing entries
* Downloading and uploading the Phonebook as CSV file 
* Server-side pagination and filtering 
* Back button functionality  

## Tech summary

* Angular + RxJS + Material design
* Node.JS + PostgreSQL
* Mocha and Jasmine for testing
* Docker Compose for deployment

## Local host deployment

1) Install Docker (https://docs.docker.com/engine/installation/) and Docker Compose (https://docs.docker.com/compose/install/) <br/>
2) Run `docker-compose up --force-recreate --build` <br/>
3) Navigate to `http://localhost:8080`
4) Run `docker-compose down` to stop containers <br/>
