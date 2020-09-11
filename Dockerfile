FROM node:12-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

EXPOSE 3333

COPY . .

RUN yarn build

CMD ["yarn", "start"]
