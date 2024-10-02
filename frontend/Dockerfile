FROM node:16.3.0-slim
RUN npx create-react-app my-app
RUN rm -f my-app/src/*
COPY package.json my-app/
WORKDIR my-app
RUN npm install
RUN npm install react-router-dom


