FROM node:14.18-alpine

WORKDIR /client
COPY package*.json ./

RUN apk add --no-cache git
RUN npm install
COPY . .

CMD ["npm", "run", "serve"]