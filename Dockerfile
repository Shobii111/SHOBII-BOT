FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache git ffmpeg
COPY package*.json ./
RUN npm install --production
COPY . .
RUN mkdir -p sessions tmp
CMD ["node", "index.js"]
