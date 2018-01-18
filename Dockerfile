from node:9

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

ENV PORT 7002

CMD node server.js

EXPOSE 7002
