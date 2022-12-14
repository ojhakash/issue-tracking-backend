FROM nginx
WORKDIR '/app'
EXPOSE 5000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./ /usr/share/nginx/html