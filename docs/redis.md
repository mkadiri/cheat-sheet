# Redis

## What is it

- In memory data structure store
- NoSQL key/value store
- used as a database/cache
- supports strings, lists, sets and many other datatypes


## Commands

```shell
# check cli and server versions
redis-cli --version
redis-server --version

# run in the cli

# get response from server
ping

# set key/value pair (also keyspaces)
set foo 100
set bar "hello"
set server:name my-server

# multi-set
mset key1 "a" key2 "b"

# append to key value
append key1 " world"

# set with expiration 50 seconds
setex bar 50 "hello"

# rename 
rename key1 key3

# persist (cancel ttl)
persist bar

# return value of key
get foo
get server:name

# get all keys
keys "*"

# get all key/values
echo "key/value" && for key in $(redis-cli -p 6379 keys \*); do a=$(redis-cli -p 6379 GET $key); echo "$key/$a"; done

# expire key/value pair in 50 seconds
expire foo 50

# increment number by 1 (100 should become 101)
incr foo

# decrement number by 1
decr foo

# exists
exists foo

# clear all key/pair values
flushall
```

## References

https://www.youtube.com/watch?v=Hbt56gFj998