APP >> Redis
{user/pass, backend: [{endpoint, api_key, api_secret},{endpoint, api_key, api_secret}]}

### TODO

# registration >> portal >> enter endpoint/api credentials for whmcs/ubersmith

get '/' do
if login do
erb: portal page
else
erb: login page
end

get '/register' do
If email = registered do
redirect '/login'
else
erb: registration
end
end

#### redis

`docker run -d -v /myredis/conf:/usr/local/etc/redis --name redis redis redis-server /usr/local/etc/redis/redis.conf`

```
docker run \
-p 6379:6379 \
-v /home/db/redis/data:/data:rw \
-v $PWD/conf/redis.conf:/etc/redis/redis.conf:ro \
--privileged=true \
--name redis \
-d redis redis-server /etc/redis/redis.conf
```

```
docker run \
-p 6379:6379 \
-v /home/db/redis/data:/data:rw \
-v /home/db/redis/conf/redis.conf:/etc/redis/redis.conf:ro \
--privileged=true \
--name redis \
-d redis redis-server /etc/redis/redis.conf
```
