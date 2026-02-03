FROM node:20-alpine

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --production

# Copy all source files
COPY . .

# Compile TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Run the compiled server
CMD ["npm", "run", "start"]
