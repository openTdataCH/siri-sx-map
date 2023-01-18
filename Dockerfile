# builder
FROM node:16 as builder

WORKDIR /src

# copy package.json and package.lock.json
COPY package*.json ./

RUN npm ci --no-optional

COPY . .

RUN npm run build

# runner
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /src/dist/ /usr/share/nginx/html

EXPOSE 8080

ENV PORT=8080
