FROM node:21-alpine3.18

WORKDIR /digitomize

COPY backend .

RUN npm install

ENV NODE_ENV=production

ENTRYPOINT [ "npm", "start" ]