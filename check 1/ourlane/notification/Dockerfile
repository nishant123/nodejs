FROM node:10.16-alpine
RUN apk update && apk add bash

# Create app directory
WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
COPY .env.example .env
RUN npm i -g yarn
RUN yarn
RUN yarn build

EXPOSE 4001
CMD [ "yarn", "start" ]
