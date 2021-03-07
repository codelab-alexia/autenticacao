FROM node:alpine

ENV PORT=3000 \
    DOCS_PORT=8080 \
    HOST=0.0.0.0 \
    APP_PATH=/usr/src/app

WORKDIR ${APP_PATH}

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE ${PORT} ${DOCS_PORT}

CMD yarn dev
