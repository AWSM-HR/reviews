FROM node:12-alpine
WORKDIR /App
COPY . /App
RUN npm install
ENV PSQL_PWD='root'
EXPOSE 3004
CMD ["node", "server/server.js"]