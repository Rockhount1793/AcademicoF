
# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.14

# Set environment variables uncomment for local
# ENV PORT=8080 \
#     VITE_ENVIRONMENT=production \
#     VITE_URLSF=http://host.docker.internal:8080 \
#     VITE_URLSB=http://host.docker.internal:8000 

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g serve

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 80

# Start the server
CMD ["npm", "start"]