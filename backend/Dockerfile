FROM node:16
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]