FROM node:latest AS build

WORKDIR /app

COPY ../frontend/package.json ../frontend/yarn.lock ./

RUN yarn install

COPY ../frontend .

RUN yarn build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

RUN yarn global add serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-p", "5000"]
