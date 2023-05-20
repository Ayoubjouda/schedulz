FROM node:18-slim
RUN apt-get update
RUN apt-get install -y openssl

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

COPY server/package*.json ./server/
COPY client/package*.json ./client/


# Install dependencies for server and client
RUN npm run install
# Copy the server and client directories
COPY server/ ./server
COPY client/ ./client

RUN npm run prismagenerate

# Build the client
RUN npm run build --prefix client
RUN npm run build --prefix server


ENV PORT=3333

# Expose the desired port for the server
EXPOSE 3333

# Set the command to start both server and client
CMD ["npm", "run", "deployserver"]