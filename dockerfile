FROM node:16.18.0
WORKDIR /app
COPY [".env","./dist/*"]
