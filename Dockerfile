
# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.14 as builder

# Set environment variables uncomment for local
# ENV PORT=8080 \
#     VITE_ENVIRONMENT=production \
#     VITE_URLSF=http://host.docker.internal:8080 \
#     VITE_URLSB=http://host.docker.internal:8000 


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]