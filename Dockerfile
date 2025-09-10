# Use official Node.js 24.3.0 slim image for consistency with local environment
FROM node:24.3.0-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Upgrade npm and install dependencies with legacy peer deps
RUN npm install -g npm@11.5.1
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Build TypeScript (if needed)
RUN npm run build

# Expose the port your server listens on
EXPOSE 3900

# Start the MCP server
CMD ["node", "./build/index.js"]
