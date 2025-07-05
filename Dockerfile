# Use the official Node.js image as the base image
FROM node:23-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# ARG NEXT_PUBLIC_ENDPOINT
# ENV NEXT_PUBLIC_ENDPOINT=$NEXT_PUBLIC_ENDPOINT
RUN npm run build

# Use a lightweight image for serving the built application
FROM node:23-slim AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
#COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port the app runs on
EXPOSE 3000


CMD ["npm", "start"]