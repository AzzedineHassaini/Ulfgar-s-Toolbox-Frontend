FROM node:alpine AS build

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm run build:prod

FROM nginx:alpine AS deploy

COPY --from=build /app/dist/dnd-app/browser /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
