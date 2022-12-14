FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
RUN npm install pm2@latest -g
COPY . .
CMD ["pm2-runtime", "ecosystem.config.js"]