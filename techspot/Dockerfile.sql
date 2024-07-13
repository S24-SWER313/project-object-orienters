FROM mysql:8.0
ENV MYSQL_DATABASE=oop \
    MYSQL_ROOT_PASSWORD=

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306