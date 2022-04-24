FROM node:lts-slim 

WORKDIR /app
COPY . .

RUN npm i && npm run build

CMD [ "npm", "start" ]