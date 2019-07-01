# Stage 1
FROM node:10.16.0-alpine as build-stage
LABEL author="Evgenii Romb"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build:prod

# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /usr/src/app/dist/phonebookclient /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80