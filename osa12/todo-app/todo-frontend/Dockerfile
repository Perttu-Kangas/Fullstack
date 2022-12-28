FROM node:16 AS build-stage

WORKDIR /usr/src/todo-frontend

COPY . .

ENV REACT_APP_BACKEND_URL="http://localhost:8080/api"

RUN npm ci

RUN CI=true npm run test

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/todo-frontend/build /usr/share/nginx/html