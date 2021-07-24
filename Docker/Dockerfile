FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install express body-parser config mysql2 sequelize swagger-ui-express swagger-autogen
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
