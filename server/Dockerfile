FROM node:9.2.0-alpine

WORKDIR /usr/src/app

# Install linux packages
RUN apk add --no-cache vim curl git wget

# Copy code into image filesystem
COPY . /usr/src/app

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
