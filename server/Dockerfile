FROM node:10.16.0
LABEL author="Evgenii Romb"
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ /usr/src/app/

RUN cd /usr/src/app && npm install
ENTRYPOINT ["npm", "run", "start"]
EXPOSE 3000
