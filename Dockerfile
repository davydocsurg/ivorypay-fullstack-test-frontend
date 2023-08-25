FROM node:18-alpine

# set work directory
RUN mkdir -p /usr/src/ivorypay-test-frontend && chown -R node:node /usr/src/ivorypay-test-frontend

WORKDIR /usr/src/ivorypay-test-frontend

# copy package.json and yarn.lock
COPY package.json yarn.lock ./

# install and cache app dependencies
RUN yarn install --pure-lockfile

# copy source code
COPY . ./

# start the development server
CMD [ "yarn", "dev" ]

EXPOSE 5173
