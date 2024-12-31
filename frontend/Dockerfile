# Development stage
FROM node:20.15.0-slim AS development

# Add work directory
WORKDIR /react-app

COPY package*.json .

RUN npm install --legacy-peer-deps

# Copy app files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Build stage
FROM development AS build

# Build the app
RUN npm run build

# Production stage (for deployable image)
FROM nginx:1.24.0-alpine as production
ENV NODE_ENV production

# Copy build directory
COPY --from=builder /react-app/build /usr/share/nginx/html

# Copy nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]