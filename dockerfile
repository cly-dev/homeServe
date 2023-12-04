FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i -g pnpm && \
    pnpm install  && \
    npm run build && \
    npm i -g pm2 
COPY  .env.prod ./dist/
EXPOSE 3000
CMD ["pm2-runtime","pm2.config.js"]
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD  curl -f http://localhost:3030/ || exit 1 
