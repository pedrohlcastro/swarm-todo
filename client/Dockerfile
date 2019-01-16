FROM node:8-alpine

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=4200
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN npm i npm@latest -g

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force

WORKDIR /opt/app
COPY . /opt/app

CMD [ "npm", "start" ]