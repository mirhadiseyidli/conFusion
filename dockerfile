FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm install
EXPOSE 8080/tcp
CMD [ "npm", "start" ]
