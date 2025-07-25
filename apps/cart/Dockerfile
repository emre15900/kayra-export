FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./
COPY apps/cart/package.json ./apps/cart/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy shared files
COPY shared ./shared

# Copy cart app
COPY apps/cart ./apps/cart

# Build the application
WORKDIR /app/apps/cart
RUN yarn build

# Expose port
EXPOSE 3001

# Start the application
CMD ["yarn", "start"]