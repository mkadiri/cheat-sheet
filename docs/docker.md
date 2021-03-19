# Docker

## Commands

```shell
# remove images
docker image prune

# remove volume data
docker volume prune          

# remove all networks
docker network prune

# remove dangling images
docker rmi $(docker images -f "dangling=true" -q) --force                 

# prune all
docker rmi -f $(docker images -a -q)

# execute container with different user 
docker exec -ti --user ${USER} ${CONTAINER} bash

# copy file from container to your env
docker cp ${CONTAINER}:/${FILE_PATH} ${OUTPUT_PATH}

# copy file from your env to a container
docker cp ${OUTPUT_PATH} ${CONTAINER}:${FILE_PATH}

# run query on mysql container
docker exec -i ${CONTAINER} mysql <<< "CREATE DATABASE test;" 

# backup database
docker exec ${CONTAINER} /usr/bin/mysqldump -u root --password=root ${DATABASE} > ${OUTPUT_PATH}

# restore database
cat ${FILE_PATH} | docker exec -i ${CONTAINER} /usr/bin/mysql -u root --password=root ${DATABASE}

# run doctrine migrations on container
docker exec -i ${CONTAINER} /var/www/site/vendor/bin/doctrine-module m:m

# update config file and restart apache
docker exec -ti ${CONTAINER} bash -c "echo 'xdebug.remote_host = 172.17.0.1' >> /etc/php/7.1/mods-available/xdebug.ini && service apache2 reload"

# override entrypoint on docker run
docker run -ti --entrypoint "" alpine/helm:3.2.1  sh


```