#FROM node:20-alpine
#
#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
#
#WORKDIR /home/node/app
#
#COPY package*.json ./
#
##USER node
#
#RUN npm install
#
#COPY --chown=node:node . .
#
#RUN chmod 644 /home/node/app/package-lock.json
#
##ENV PORT 5959 
#
#ENV HOST 0.0.0.0
#
#EXPOSE 8080
#
##CMD [ "node", "app.js" ]
#CMD exec sh run_inside_docker.sh


# Stage 1: Build the React app
FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Stage 2: Create the production image
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
ENV HOST 0.0.0.0
EXPOSE 8080
# make sure to run nginx on port 8080
#CMD exec sed -ie 's@80@8080@g' /etc/nginx/conf.d/default.conf
#CMD exec cat /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
