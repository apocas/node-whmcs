#!/bin/bash

REDIS_CONFIG='
bind 0.0.0.0
port 6379
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
requirepass E8OPi07dPfY!
appendonly yes'

network=redis-net

docker network create --driver overlay --attachable $network
# docker #1
sleep 2
docker service create --name redis \
  --network $network \
  --replicas=6 \
  --constraint node.labels.type==bare-metal \
  -e REDIS_CONFIG="$REDIS_CONFIG" \
  -e REDIS_CONFIG_FILE="/usr/local/etc/redis/redis.conf" \
  redis:latest sh -c 'mkdir -p $(dirname $REDIS_CONFIG_FILE) && echo "$REDIS_CONFIG" > $REDIS_CONFIG_FILE && cat $REDIS_CONFIG_FILE && redis-server $REDIS_CONFIG_FILE'


sleep 2
docker service ps redis --no-trunc

# run the redis-trib.rb script  (the docker inspect runs on the host and the echo output is passed the along to the ruby container)
# docker run -it --rm --net redis-net ruby sh -c "\
#   gem install redis --version 3.2 \
#   && wget http://download.redis.io/redis-stable/src/redis-trib.rb \
#   && ruby redis-trib.rb create --replicas 1 \
#   \$(getent hosts tasks.redis | awk '{print \$1 \":6379\"}') "

# this is WORKING:
#
# get the IP address of each redis container
#
# docker network inspect redis-net | grep -i -E "name|ipv4address"
# enter any of redis container
#
# docker exec -it redis.1.ftk1dswtspr68vn5okz7psiwb bash
# redis-cli -a E8OPi07dPfY! --cluster create 10.0.7.19:6379 10.0.7.14:6379 10.0.7.15:6379 10.0.7.16:6379 10.0.7.17:6379 10.0.7.18:6379 --cluster-replicas 1


# test the redis cluster
# docker exec -it redis.1 /bin/sh
# redis-cli -a E8OPi07dPfY! --cluster info
# docker run -it --rm --net redis_network redis redis-cli -c -h redis -p 6379