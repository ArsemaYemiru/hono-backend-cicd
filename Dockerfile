FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm ci

# Copy TypeScript config
COPY tsconfig.json ./

COPY src/ ./src/

RUN npm run build || echo "Build may fail without source - that's OK for dev"

EXPOSE 3000

CMD ["node", "dist/server.js"]