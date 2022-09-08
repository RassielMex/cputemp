# Extending image
FROM node:16-buster

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y autoconf automake libtool nasm make pkg-config git apt-utils

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# install node_modules
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Port to listener
EXPOSE 3000

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"

#run production build
RUN npm run build 
# install serve for deploy
RUN npm install -g serve 
# Main command
CMD [ "serve", "-s", "build" ]