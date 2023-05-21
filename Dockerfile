FROM node:18-alpine

RUN npm i -g pnpm    
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

COPY server/package*.json ./server/
COPY client/package*.json ./client/


# Install dependencies for server and client
RUN pnpm run install
# Copy the server and client directories
COPY server/ ./server
COPY client/ ./client


# Build the client and the server
RUN pnpm run build 


ENV PORT=3333

# Expose the desired port for the server
EXPOSE 3333

# Set the command to start both server and client
CMD ["pnpm", "run", "start:prod"]