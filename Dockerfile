FROM node:12-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

RUN yarn build

CMD ["yarn", "build"]
