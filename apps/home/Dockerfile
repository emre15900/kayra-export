FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./
COPY apps/home/package.json ./apps/home/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy shared files
COPY shared ./shared

# Copy home app
COPY apps/home ./apps/home

# Build the application
WORKDIR /app/apps/home
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]