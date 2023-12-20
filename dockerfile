
# Base image
FROM node:18

# Create app directory
RUN mkdir -p /opt/app

# Set working directory
WORKDIR /opt/app

# Copy package.json
COPY . .
RUN npm install --quiet

# Expose port
EXPOSE 3000

# Start app
CMD ["npm","run", "dev"]

