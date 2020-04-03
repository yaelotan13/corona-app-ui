# Pull from a base image
# FROM node:12-alpine

# Copy the files from the current directory to app/
# COPY . app/

# Use app/ as the working directory
# WORKDIR app/

# Install dependencies (npm ci is similar to npm i, but for automated builds)
# RUN npm ci --only-production

# Build production client side React application
# RUN npm run build

# Listen on the specified port
# EXPOSE 5000

# Set Node server
# ENTRYPOINT npm run start

FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  