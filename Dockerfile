#hum alpine version use kar rahe hai taaki size kam rahe
FROM node:18-alpine AS builder

WORKDIR /app

#pahle shirf package.json copy karte hai (caching ke liye best practice)
COPY package*.json ./

# npm install ki jagah npm ci use kare (ye fast aur clean install hota hai)
RUN npm ci

#poora code copy kare
COPY . .

#code ko build karein (dist folder banega)
RUN npm run build

#ab hum node.js ko chhorr denge aur nginx use kareg (lightweight web server)
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

#Production standard port 80 hota hai (na ki 5173)
EXPOSE 80

#nginx ko foreground mein chalana
CMD [ "nginx", "-g", "daemon off;" ]
