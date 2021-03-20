#FROM tiangolo/node-frontend:10 as build-stage
#
#WORKDIR /app
#
#COPY package*.json /app/
#
#
#COPY ./ /app/
#
#
#COPY ./dist/CSR-On-Premise-UI ./dist/out
## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#
#COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf


##############################
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package*.json /app/

COPY ./ /app/

COPY dist/CSR-On-Premise-UI ./dist/out

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
