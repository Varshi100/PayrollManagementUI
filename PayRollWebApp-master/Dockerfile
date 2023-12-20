FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install -g @angular/cli
RUN npm install
RUN ng build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/payroll-management-system-web /usr/share/nginx/html
EXPOSE 80
